import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv
load_dotenv()   
from .core.database import connect_to_mongo, close_mongo_connection
from .api import interactions, hcp, agent
from .api.voice import router as voice_router  

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    print("🚀 Startup complete")
    yield
    await close_mongo_connection()
    print("🛑 Shutdown complete")

app = FastAPI(
    title="AI-First CRM (Backend) - HCP Module",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hcp.router)
app.include_router(interactions.router)
app.include_router(agent.router)
app.include_router(voice_router)   

@app.get("/")
async def root():
    return {"message": "AI-First CRM Backend is running 🚀"}
if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
