from pydantic import BaseModel
from datetime import date

class HealthEntryCreate(BaseModel):
    date:date
    water_l:float
    sleep_hr:float
    steps:int


class HealthEntryRead(HealthEntryCreate):
    id:int

    class Config:
        orm_mode:True