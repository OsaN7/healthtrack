from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class HealthEntryCreate(BaseModel):
    date: datetime
    steps: int
    calories: int
    notes: Optional[str] = None

class HealthEntryUpdate(BaseModel):
    steps: Optional[int] = None
    calories: Optional[int] = None
    notes: Optional[str] = None
