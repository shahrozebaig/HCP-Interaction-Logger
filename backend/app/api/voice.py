from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
import httpx
import os
import json
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/voice", tags=["Voice Note"])
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_BASE_URL = os.getenv("GROQ_BASE_URL", "https://api.groq.com")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

class VoiceResponse(BaseModel):
    transcript: str
    fields: dict

@router.post("/summarize", response_model=VoiceResponse)
async def summarize_voice(audio: UploadFile = File(...)):
    """
    1. Convert audio → text using Groq Whisper
    2. Send transcript to Groq LLM to extract fields
    3. Return { transcript, fields }
    """

    whisper_url = f"{GROQ_BASE_URL}/v1/audio/transcriptions"

    audio_bytes = await audio.read()

    async with httpx.AsyncClient(timeout=60) as client:
        whisper_res = await client.post(
            whisper_url,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}"
            },
            files={
                "file": (audio.filename, audio_bytes, audio.content_type)
            },
            data={
                "model": "whisper-large-v3"
            }
        )

    whisper_json = whisper_res.json()
    transcript_text = whisper_json.get("text", "")

    extract_prompt = f"""
    Extract the following fields from this interaction transcript:

    - hcpName
    - date
    - time
    - attendees
    - topics
    - materialsShared
    - samplesDistributed
    - sentiment
    - summary
    - followups

    Transcript:
    {transcript_text}

    Return ONLY a valid JSON object (no explanations).
    """

    llm_url = f"{GROQ_BASE_URL}/openai/v1/chat/completions"

    async with httpx.AsyncClient(timeout=60) as client:
        llm_res = await client.post(
            llm_url,
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": GROQ_MODEL,
                "messages": [
                    {"role": "system", "content": "Extract structured CRM interaction fields."},
                    {"role": "user", "content": extract_prompt}
                ],
                "temperature": 0.2
            }
        )

    llm_json = llm_res.json()
    raw = llm_json["choices"][0]["message"]["content"].strip()

    raw = raw.replace("```json", "").replace("```", "")

    try:
        fields = json.loads(raw)
    except Exception:
        fields = {}

    return {
        "transcript": transcript_text,
        "fields": fields
    }
