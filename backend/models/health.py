from sqlalchemy import Column, Integer, Float, Date, ForeignKey, String
from models.base import Base

class HealthEntry(Base):
    __tablename__ = "health_entries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, nullable=False)
    water_l = Column(Float, nullable=False)
    sleep_hr = Column(Float, nullable=False)
    steps = Column(Integer, nullable=False)
    calories = Column(Integer, default=0)
    notes = Column(String, default="")