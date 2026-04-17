import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

from core.config import get_settings
from routers import contact as contact_router
from routers import github_proxy as github_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(name)s  %(message)s",
)

settings = get_settings()

app = FastAPI(
    title="SolKBD Portfolio API",
    version="1.0.0",
    description="Backend mínimo: formulario de contacto + proxy GitHub API.",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Rate limiter state must be attached to the app
app.state.limiter = contact_router.limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(_: Request, exc: RateLimitExceeded) -> JSONResponse:
    return JSONResponse(
        status_code=429,
        content={"detail": f"Demasiadas solicitudes. Intenta de nuevo en un momento ({exc.detail})."},
    )


app.include_router(contact_router.router, prefix="/api")
app.include_router(github_router.router, prefix="/api")


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "solkbd-portfolio"}
