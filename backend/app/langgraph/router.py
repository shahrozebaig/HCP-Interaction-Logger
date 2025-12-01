# backend/app/langgraph/router.py

"""
Simple intent router that maps a minimal LangGraph-like incoming request
to the tool functions defined above.

In a real LangGraph integration you'd register these tools with the agent graph.
This module provides a plain Python fallback and also shows where to call LangGraph SDK.
"""

from app.langgraph.tools.log_interaction import log_interaction_tool
from app.langgraph.tools.edit_interaction import edit_interaction_tool
from app.langgraph.tools.get_hcp_details import get_hcp_details_tool
from app.langgraph.tools.suggest_followups import suggest_followups_tool
from app.langgraph.tools.summarize_voice import summarize_voice_tool

from app.utils.llm import GroqClient

from typing import Dict, Any


# Minimal router: expects payload { "intent": "<intent>", "data": {...} }
async def route_intent(request: Dict[str, Any], groq: GroqClient) -> Dict[str, Any]:
    intent = request.get("intent")
    data = request.get("data", {})

    if intent == "log_interaction":
        return await log_interaction_tool(data, groq)

    if intent == "edit_interaction":
        interaction_id = data.get("interaction_id")
        updates = data.get("updates", {})
        return await edit_interaction_tool(interaction_id, updates, groq)

    if intent == "get_hcp_details":
        return await get_hcp_details_tool(data)

    if intent == "suggest_followups":
        return await suggest_followups_tool(data, groq)

    if intent == "summarize_voice":
        return await summarize_voice_tool(data, groq)

    return {"status": "error", "message": f"Unknown intent: {intent}"}
