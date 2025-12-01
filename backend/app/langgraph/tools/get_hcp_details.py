# backend/app/langgraph/tools/get_hcp_details.py
from ...models.hcp_model import find_hcp_by_name, get_hcp_by_id
from ...models.interaction_model import list_interactions_for_hcp
from typing import Dict, Any

async def get_hcp_details_tool(query: Dict[str, Any]) -> Dict[str, Any]:
    hcp_id = query.get("hcpId")
    name = query.get("name")
    if hcp_id:
        doc = await get_hcp_by_id(hcp_id)
    elif name:
        doc = await find_hcp_by_name(name)
    else:
        doc = None

    if not doc:
        return {"status":"error", "message":"HCP not found"}

    interactions = await list_interactions_for_hcp(doc["id"], limit=10)
    return {"status":"ok", "data": {"hcp": doc, "recentInteractions": interactions}}
