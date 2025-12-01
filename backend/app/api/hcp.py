# backend/app/api/hcp.py
from fastapi import APIRouter, HTTPException
from ..schemas.hcp_schema import HCPCreate
from ..models.hcp_model import create_hcp, get_hcp_by_id, find_hcp_by_name

router = APIRouter(prefix="/hcp", tags=["hcp"])


@router.post("/", summary="Create HCP")
async def create_hcp_endpoint(payload: HCPCreate):
    doc = await create_hcp(payload.dict())
    return {"status": "ok", "data": doc}


@router.get("/{hcp_id}", summary="Get HCP by id")
async def get_hcp(hcp_id: str):
    doc = await get_hcp_by_id(hcp_id)
    if not doc:
        raise HTTPException(status_code=404, detail="HCP not found")
    return {"status": "ok", "data": doc}


@router.get("/search/", summary="Find HCP by name")
async def search_hcp(name: str):
    doc = await find_hcp_by_name(name)
    if not doc:
        raise HTTPException(status_code=404, detail="HCP not found")
    return {"status": "ok", "data": doc}
