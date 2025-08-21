from sqlalchemy.orm import Session
from models.health import HealthEntry

def create_health_entry(db: Session, user_id: int, entry_data):
    entry = HealthEntry(user_id=user_id, **entry_data.dict())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def get_entries_by_user(db: Session, user_id: int):
    return db.query(HealthEntry).filter(HealthEntry.user_id == user_id).all()
