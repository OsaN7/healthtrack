from pydantic import BaseModel
from datetime import datetime

class HealthEntryCreate(BaseModel):
    date: datetime
    steps: int = 0
    calories: int = 0
    notes: str = ""
    water_l: float = 0
    sleep_hr: float = 0

class HealthEntryRead(BaseModel):
    id: int
    date: datetime
    steps: int
    calories: int
    notes: str
    water_l: float
    sleep_hr: float

    class Config:
        from_attributes = True  # Pydantic v2 replacement for orm_mode
