from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.settings import DATABASE_URL

from models.base import Base
from models.user import User      
from models.health import HealthEntry  

# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables (IMPORTANT)
Base.metadata.create_all(bind=engine)  

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
