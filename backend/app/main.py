import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.contact import router as contact_router

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Ouv.ai Website API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
