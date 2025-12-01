from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class InteractionBase(BaseModel):
    hcpId: str
    interactionType: Optional[str] = Field("meeting")
    date: Optional[datetime] = None
    topics: Optional[List[str]] = []
    materialsShared: Optional[List[str]] = []
    samplesDistributed: Optional[List[str]] = []
    sentiment: Optional[str] = None
    followups: Optional[List[str]] = []
    summary: Optional[str] = None

class InteractionCreate(InteractionBase):
    pass

class InteractionUpdate(BaseModel):
    topics: Optional[List[str]] = None
    materialsShared: Optional[List[str]] = None
    samplesDistributed: Optional[List[str]] = None
    sentiment: Optional[str] = None
    followups: Optional[List[str]] = None
    summary: Optional[str] = None

class InteractionInDB(InteractionBase):
    id: str
