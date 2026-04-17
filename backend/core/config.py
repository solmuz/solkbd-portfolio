from functools import lru_cache

from pydantic import EmailStr, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # Contact
    CONTACT_EMAIL_TO: EmailStr = "DanielMunoz@solkbd.com"

    # SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""

    # GitHub proxy
    GITHUB_TOKEN: str = ""
    GITHUB_USERNAME: str = "solmuz"
    GITHUB_EXCLUDE_REPOS: str = "SIGRH"
    GITHUB_CACHE_TTL_SECONDS: int = 3600  # 1 hour

    # CORS
    ALLOWED_ORIGINS: str = "https://www.solkbd.com,http://localhost:5173"

    # Rate limiting
    CONTACT_RATE_LIMIT: str = "5/minute"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]

    @property
    def excluded_repos(self) -> set[str]:
        return {r.strip() for r in self.GITHUB_EXCLUDE_REPOS.split(",") if r.strip()}


@lru_cache
def get_settings() -> Settings:
    return Settings()
