from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(str(settings.MONGODB_URI))
    db = client[settings.MONGODB_DB]

    await db.hcp.create_index("name")
    await db.interactions.create_index("hcpId")
    print("Connected to MongoDB")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("MongoDB connection closed")
        
