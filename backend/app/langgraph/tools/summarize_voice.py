# backend/app/langgraph/tools/summarize_voice.py
from ...utils.llm import GroqClient
from typing import Dict, Any
import json, re

VOICE_PROMPT = """
You are an assistant that converts meeting transcripts into a short structured JSON with keys:
summary, topics (list), sentiment (positive|neutral|negative|null), followups (list), materialsShared (list).

Transcript:
\"\"\"{transcript}\"\"\"

Return JSON only.
"""

async def summarize_voice_tool(payload: Dict[str, Any], groq: GroqClient) -> Dict[str, Any]:
    transcript = payload.get("transcript", "")
    if not transcript:
        return {"status":"error", "message":"No transcript provided"}
    out = await groq.generate(VOICE_PROMPT.format(transcript=transcript), max_tokens=400)
    try:
        json_text = re.search(r"\{.*\}", out, re.S).group(0)
        parsed = json.loads(json_text)
        return {"status":"ok", "data": parsed}
    except Exception:
        return {"status":"ok", "data": {"summary": out}}
