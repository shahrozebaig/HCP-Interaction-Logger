from typing import Optional
from bson import ObjectId
from app.core import database   

async def create_hcp(payload: dict) -> dict:
    res = await database.db.hcp.insert_one(payload)       
    doc = await database.db.hcp.find_one({"_id": res.inserted_id})
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

async def get_hcp_by_id(hcp_id: str) -> Optional[dict]:
    doc = await database.db.hcp.find_one({"_id": ObjectId(hcp_id)})  
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc

async def find_hcp_by_name(name: str) -> Optional[dict]:
    doc = await database.db.hcp.find_one({                 
        "name": {"$regex": f"^{name}$", "$options": "i"}
    })
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    doc.pop("_id", None)
    return doc
