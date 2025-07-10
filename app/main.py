from fastapi import FastAPI
from routes import auth, health

app = FastAPI()

app.include_router(auth.router)
app.include_router(health.router)


@app.get("/")
async def root():
    return {"message": "HealthTrack API is running"}
