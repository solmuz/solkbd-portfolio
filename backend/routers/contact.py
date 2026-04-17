import logging

from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from core.config import get_settings
from schemas.contact import ContactForm, ContactResponse
from services.email_service import send_contact_email

log = logging.getLogger("solkbd.contact")

settings = get_settings()
limiter = Limiter(key_func=get_remote_address)

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
@limiter.limit(settings.CONTACT_RATE_LIMIT)
async def submit_contact(request: Request, form: ContactForm) -> ContactResponse:
    if form.website:
        log.warning("Honeypot tripped from %s — silently accepting", get_remote_address(request))
        return ContactResponse(ok=True, message="Mensaje recibido. Te responderé pronto.")

    try:
        send_contact_email(form)
    except Exception as exc:
        log.exception("Failed to send contact email")
        raise HTTPException(status_code=502, detail="No se pudo enviar el mensaje. Intenta de nuevo más tarde.") from exc

    return ContactResponse(ok=True, message="Mensaje recibido. Te responderé pronto.")
