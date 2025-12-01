from fastapi import APIRouter, HTTPException
from ..langgraph.graph import handle_agent_request

router = APIRouter(prefix="/agent", tags=["Agent"])

@router.post("/run", summary="Run agent (LangGraph adapter)")
async def agent_run(payload: dict):
    """
    Payload Example:
    {
      "intent": "log_interaction" | "edit_interaction" | "get_hcp_details" |
                "suggest_followups" | "summarize_voice",
      "text": "Some natural language",
      "data": { ...optional structured input... }
    }
    """

    if "intent" not in payload:
        raise HTTPException(400, "Missing 'intent' field")

    if "text" not in payload:
        raise HTTPException(400, "Missing 'text' field")

    try:
        result = await handle_agent_request(payload)
        return result

    except Exception as e:
        print("❌ AGENT ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

