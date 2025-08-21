from domain.health import HealthEntryCreate, HealthEntryRead
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from repo.datasource import get_db
from services.auth_service import get_current_user
from services import health_service

router = APIRouter(tags=["health"])

# CREATE entry
@router.post("/", status_code=201, response_model=HealthEntryRead)
def create_entry(entry_data: HealthEntryCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    return health_service.create_health_entry(db, user.id, entry_data)

# GET all entries
@router.get("/", response_model=List[HealthEntryRead])
def get_entries(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return health_service.get_user_entries(db, user.id)

# UPDATE entry
@router.put("/{entry_id}", response_model=HealthEntryRead)
def update_entry(entry_id: int, entry_data: HealthEntryCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    updated = health_service.update_health_entry(db, user.id, entry_id, entry_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Entry not found")
    return updated

# DELETE entry
@router.delete("/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    deleted = health_service.delete_health_entry(db, user.id, entry_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Entry not found")
    return {"detail": "Deleted"}
