import logging

from fastapi import APIRouter, HTTPException

from services.github_service import fetch_github_repos

log = logging.getLogger("solkbd.github_proxy")

router = APIRouter(tags=["github"])


@router.get("/github-repos")
async def github_repos() -> list[dict]:
    try:
        return await fetch_github_repos()
    except Exception as exc:
        log.exception("GitHub API proxy failed")
        raise HTTPException(status_code=502, detail="No se pudo contactar GitHub en este momento.") from exc
