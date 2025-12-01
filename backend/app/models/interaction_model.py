from typing import Optional, List
from bson import ObjectId
from datetime import datetime
from app.core import database   

async def create_interaction(payload: dict) -> dict:
    payload = payload.copy()
    
    if "date" not in payload or payload.get("date") is None:
        payload["date"] = datetime.utcnow()
    res = await database.db.interactions.insert_one(payload)   
    doc = await database.db.interactions.find_one({"_id": res.inserted_id})
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

async def update_interaction(interaction_id: str, updates: dict) -> Optional[dict]:
    await database.db.interactions.update_one(                       
        {"_id": ObjectId(interaction_id)}, {"$set": updates}
    )
    doc = await database.db.interactions.find_one(
        {"_id": ObjectId(interaction_id)}                            
    )
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

async def get_interaction(interaction_id: str) -> Optional[dict]:
    doc = await database.db.interactions.find_one(                   
        {"_id": ObjectId(interaction_id)}
    )
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

async def list_interactions_for_hcp(hcp_id: str, limit: int = 20) -> List[dict]:
    cursor = (
        database.db.interactions                                    
        .find({"hcpId": hcp_id})
        .sort("date", -1)
        .limit(limit)
    )
    out = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        out.append(doc)
    return out
