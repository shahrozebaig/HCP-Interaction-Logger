from ...models.interaction_model import create_interaction
from ...models.hcp_model import find_hcp_by_name, create_hcp
from ...utils.llm import GroqClient
from typing import Dict, Any
from datetime import datetime
import json, re

STRICT_PROMPT = """
You are an expert CRM assistant. Read the user text and output ONLY a JSON object with keys:
hcpName (string or null), date (ISO date or null), interactionType (string), topics (list of strings),
materialsShared (list), samplesDistributed (list), sentiment (positive|neutral|negative|null),
followups (list), summary (string).

Return valid JSON only.

Text:
\"\"\"{text}\"\"\"
"""

async def parse_groq_json(groq_client: GroqClient, text: str) -> Dict[str, Any]:
    prompt = STRICT_PROMPT.format(text=text)
    out = await groq_client.generate(prompt, max_tokens=400)
    try:
        json_text = re.search(r"\{.*\}", out, re.S).group(0)
        parsed = json.loads(json_text)
        return parsed
    except Exception:
        return {"hcpName": None, "date": datetime.utcnow().isoformat(), "interactionType": "meeting",
                "topics": [], "materialsShared": [], "samplesDistributed": [], "sentiment": None,
                "followups": [], "summary": out.strip()}

async def log_interaction_tool(payload: Dict[str, Any], groq: GroqClient) -> Dict[str, Any]:
    """
    payload may contain:
      - text: raw user note
      - explicit fields to override
    """
    text = payload.get("text", "")
    structured = {}
    if text:
        structured = await parse_groq_json(groq, text)

    merged = {**structured, **{k:v for k,v in payload.items() if k != "text"}}

    hcp_name = merged.get("hcpName")
    hcp_doc = None
    if hcp_name:
        hcp_doc = await find_hcp_by_name(hcp_name)
        if not hcp_doc:
            hcp_doc = await create_hcp({"name": hcp_name})
    hcp_id = hcp_doc["id"] if hcp_doc else merged.get("hcpId", "unknown")

    date_val = merged.get("date")
    try:
        if date_val:
            pass
        else:
            date_val = datetime.utcnow().isoformat()
    except Exception:
        date_val = datetime.utcnow().isoformat()

    doc = {
        "hcpId": hcp_id,
        "interactionType": merged.get("interactionType", "meeting"),
        "date": date_val,
        "topics": merged.get("topics") or [],
        "materialsShared": merged.get("materialsShared") or [],
        "samplesDistributed": merged.get("samplesDistributed") or [],
        "sentiment": merged.get("sentiment"),
        "followups": merged.get("followups") or [],
        "summary": merged.get("summary") or ""
    }
    saved = await create_interaction(doc)
    return {"status":"ok", "tool":"log_interaction", "fields": doc, "record": saved}
