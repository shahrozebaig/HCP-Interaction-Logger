# backend/app/langgraph/tools/edit_interaction.py
from ...models.interaction_model import update_interaction, get_interaction
from ...utils.llm import GroqClient
from typing import Dict, Any
import json, re

EDIT_PROMPT = """
You are a CRM assistant. Given this instruction, return ONLY a JSON object containing ONLY
the fields that should be changed on the existing interaction. Possible fields:
hcpName, date, interactionType, topics, materialsShared, samplesDistributed, sentiment, followups, summary.

Instruction:
\"\"\"{instruction}\"\"\"
Return JSON only.
"""

async def parse_edit_json(groq: GroqClient, instruction: str) -> Dict[str, Any]:
    out = await groq.generate(EDIT_PROMPT.format(instruction=instruction), max_tokens=300)
    try:
        json_text = re.search(r"\{.*\}", out, re.S).group(0)
        return json.loads(json_text)
    except Exception:
        # fallback: place entire instruction into summary change
        return {"summary": instruction}

async def edit_interaction_tool(interaction_id: str, updates: Dict[str, Any], groq: GroqClient) -> Dict[str, Any]:
    existing = await get_interaction(interaction_id)
    if not existing:
        return {"status":"error", "message":"Interaction not found"}

    # If 'text' in updates, use the LLM to parse changes
    if updates and updates.get("text"):
        parsed = await parse_edit_json(groq, updates["text"])
        updates = {k:v for k,v in parsed.items()}

    # Apply only provided fields
    updated = await update_interaction(interaction_id, updates)
    return {"status":"ok", "tool":"edit_interaction", "updates": updates, "record": updated}
