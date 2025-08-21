from sqlalchemy.orm import Session
from app.schemas import HealthEntryCreate, HealthEntryUpdate
from repo import health_repo


def create_health_entry(db: Session, user_id: int, entry_data: HealthEntryCreate):
    return health_repo.create_entry(db, user_id, entry_data)


def get_user_entries(db: Session, user_id: int):
    return health_repo.get_entries_by_user(db, user_id)


def update_health_entry(db: Session, user_id: int, entry_id: int, entry_data: HealthEntryUpdate):
    return health_repo.update_entry(db, user_id, entry_id, entry_data)


def delete_health_entry(db: Session, user_id: int, entry_id: int):
    return health_repo.delete_entry(db, user_id, entry_id)
