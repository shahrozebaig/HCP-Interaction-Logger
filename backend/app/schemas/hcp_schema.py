from pydantic import BaseModel, Field
from typing import Optional

class HCPBase(BaseModel):
    name: str = Field(...)
    speciality: Optional[str] = None
    location: Optional[str] = None

class HCPCreate(HCPBase):
    pass

class HCPInDB(HCPBase):
    id: str
