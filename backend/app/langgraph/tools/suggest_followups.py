from ...utils.llm import GroqClient
from typing import Dict, Any
import json, re

FOLLOWUP_PROMPT = """
You are a medical sales assistant. Given this summary, suggest up to 5 concise follow-up actions
as a JSON array of strings.

Summary:
\"\"\"{summary}\"\"\"
"""

async def suggest_followups_tool(context: Dict[str, Any], groq: GroqClient) -> Dict[str, Any]:
    summary = context.get("summary") or context.get("text") or ""
    out = await groq.generate(FOLLOWUP_PROMPT.format(summary=summary), max_tokens=200)
    try:
        arr_text = re.search(r"\[.*\]", out, re.S).group(0)
        arr = json.loads(arr_text)
        return {"status":"ok", "suggestions": arr}
    except Exception:
        lines = [l.strip() for l in out.splitlines() if l.strip()]
        return {"status":"ok", "suggestions": lines[:5]}
