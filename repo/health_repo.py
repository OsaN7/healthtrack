from sqlalchemy.orm import Session
from models.health import HealthEntry
from domain.health import HealthEntryCreate


def create_health_entry(db: Session, entry_data):
    entry = HealthEntry(**entry_data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def get_entries_by_user(db:Session,user_id:int):
    return db.query(HealthEntry).filter(HealthEntry.user_id==user_id).all()
