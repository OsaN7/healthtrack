from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from models.base import Base

class HealthEntry(Base):
    __tablename__ = "health_entries"  

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))  
    date = Column(Date)
    water_l = Column(Float)
    sleep_hr = Column(Float)
    steps = Column(Integer)
