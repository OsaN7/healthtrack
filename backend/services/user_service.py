from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.schemas import UserCreate
from repo import user_repo
from services.auth_service import get_password_hash


def register_user(db: Session, user_data: UserCreate):
    existing_user = user_repo.get_user_by_username(db, user_data.username)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")

    hashed_pw = get_password_hash(user_data.password)
    new_user = user_repo.create_user(db, user_data.username, user_data.email, hashed_pw)
    return new_user
