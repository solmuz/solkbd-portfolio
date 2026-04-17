import logging
import time
from typing import Any

import httpx

from core.config import get_settings

log = logging.getLogger("solkbd.github")

_cache: dict[str, Any] = {"data": None, "fetched_at": 0.0}


async def fetch_github_repos() -> list[dict[str, Any]]:
    settings = get_settings()
    now = time.time()

    if _cache["data"] is not None and now - _cache["fetched_at"] < settings.GITHUB_CACHE_TTL_SECONDS:
        return _cache["data"]

    url = f"https://api.github.com/users/{settings.GITHUB_USERNAME}/repos"
    params = {"sort": "updated", "per_page": 30, "type": "owner"}
    headers = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

    async with httpx.AsyncClient(timeout=10.0) as client:
        r = await client.get(url, params=params, headers=headers)
        r.raise_for_status()
        raw = r.json()

    excluded = settings.excluded_repos
    cleaned = [
        {
            "name":              repo["name"],
            "description":       repo.get("description"),
            "html_url":          repo["html_url"],
            "language":          repo.get("language"),
            "updated_at":        repo.get("updated_at"),
            "topics":            repo.get("topics", []),
        }
        for repo in raw
        if not repo.get("fork")
        and not repo.get("private")
        and repo["name"] not in excluded
    ]

    _cache["data"] = cleaned
    _cache["fetched_at"] = now
    log.info("Fetched %d GitHub repos (excluded %d, cached %ds)",
             len(cleaned), len(excluded), settings.GITHUB_CACHE_TTL_SECONDS)
    return cleaned
