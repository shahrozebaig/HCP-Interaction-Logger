from typing import Dict, Any
from ..utils.llm import GroqClient
from .tools.log_interaction import log_interaction_tool
from .tools.edit_interaction import edit_interaction_tool
from .tools.get_hcp_details import get_hcp_details_tool
from .tools.suggest_followups import suggest_followups_tool
from .tools.summarize_voice import summarize_voice_tool

async def handle_agent_request(request: Dict[str, Any]) -> Dict[str, Any]:
    groq = GroqClient()
    try:
        intent = request.get("intent")
        data = request.get("data", {}) or {}
        text = request.get("text") or data.get("text")

        payload = dict(data)
        if text:
            payload["text"] = text

        if intent == "log_interaction":
            return await log_interaction_tool(payload, groq)
        if intent == "edit_interaction":
            interaction_id = payload.get("interaction_id") or payload.get("id")
            updates = payload.get("updates", {})
            # If natural text edit provided, pass it in updates as 'text'
            if text and not updates:
                updates = {"text": text}
            return await edit_interaction_tool(interaction_id, updates, groq)
        if intent == "get_hcp_details":
            return await get_hcp_details_tool(payload)
        if intent == "suggest_followups":
            return await suggest_followups_tool(payload, groq)
        if intent == "summarize_voice":
            return await summarize_voice_tool(payload, groq)

        return {"status": "error", "message": f"Unknown intent: {intent}"}
    finally:
        await groq.close()

