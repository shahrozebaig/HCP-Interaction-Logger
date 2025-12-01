# backend/app/models/interaction_model.py
from typing import Optional, List
from ..core.database import db
from bson import ObjectId
from datetime import datetime


async def create_interaction(payload: dict) -> dict:
    payload = payload.copy()
    if "date" not in payload or payload.get("date") is None:
        payload["date"] = datetime.utcnow()
    res = await db.interactions.insert_one(payload)
    doc = await db.interactions.find_one({"_id": res.inserted_id})
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc


async def update_interaction(interaction_id: str, updates: dict) -> Optional[dict]:
    await db.interactions.update_one({"_id": ObjectId(interaction_id)}, {"$set": updates})
    doc = await db.interactions.find_one({"_id": ObjectId(interaction_id)})
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc


async def get_interaction(interaction_id: str) -> Optional[dict]:
    doc = await db.interactions.find_one({"_id": ObjectId(interaction_id)})
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc


async def list_interactions_for_hcp(hcp_id: str, limit: int = 20) -> List[dict]:
    cursor = db.interactions.find({"hcpId": hcp_id}).sort("date", -1).limit(limit)
    out = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        out.append(doc)
    return out
