from fastapi import FastAPI
from routes import auth, health
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Allow requests from React dev server
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(auth.router,prefix="/auth")
app.include_router(health.router,prefix="/health")


@app.get("/")
async def root():
    return {"message": "HealthTrack API is running"}


