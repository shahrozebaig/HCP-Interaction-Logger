from fastapi import APIRouter, HTTPException
from ..schemas.interaction_schema import InteractionCreate, InteractionUpdate
from ..models.interaction_model import (
    create_interaction,
    update_interaction,
    get_interaction,
    list_interactions_for_hcp,
)

router = APIRouter(prefix="/interactions", tags=["interactions"])


@router.post("/", summary="Log a new interaction")
async def log_interaction(payload: InteractionCreate):
    doc = await create_interaction(payload.dict())
    return {"status": "ok", "data": doc}


@router.put("/{interaction_id}", summary="Edit an interaction")
async def edit_interaction(interaction_id: str, payload: InteractionUpdate):
    existing = await get_interaction(interaction_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Interaction not found")
    data = {k: v for k, v in payload.dict().items() if v is not None}
    updated = await update_interaction(interaction_id, data)
    return {"status": "ok", "data": updated}


@router.get("/{interaction_id}", summary="Get interaction by id")
async def get_interaction_endpoint(interaction_id: str):
    doc = await get_interaction(interaction_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Interaction not found")
    return {"status": "ok", "data": doc}


@router.get("/hcp/{hcp_id}", summary="List interactions for an HCP")
async def list_for_hcp(hcp_id: str, limit: int = 20):
    docs = await list_interactions_for_hcp(hcp_id, limit)
    return {"status": "ok", "data": docs}


