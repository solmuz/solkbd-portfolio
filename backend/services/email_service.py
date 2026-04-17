import logging
import smtplib
from email.message import EmailMessage

from core.config import get_settings
from schemas.contact import ContactForm

log = logging.getLogger("solkbd.email")


def send_contact_email(form: ContactForm) -> None:
    settings = get_settings()

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        log.warning("SMTP credentials not configured — skipping email send")
        log.info("Contact payload: %s", form.model_dump(exclude={"website"}))
        return

    msg = EmailMessage()
    msg["From"] = settings.SMTP_USER
    msg["To"] = settings.CONTACT_EMAIL_TO
    msg["Reply-To"] = form.email
    msg["Subject"] = f"[solkbd.com] {form.asunto}"

    body = (
        f"Nuevo contacto desde solkbd.com\n"
        f"─────────────────────────────────\n"
        f"Nombre:   {form.nombre}\n"
        f"Empresa:  {form.empresa or '—'}\n"
        f"Email:    {form.email}\n"
        f"Asunto:   {form.asunto}\n"
        f"─────────────────────────────────\n\n"
        f"{form.mensaje}\n"
    )
    msg.set_content(body)

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15) as smtp:
        smtp.starttls()
        smtp.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        smtp.send_message(msg)

    log.info("Contact email sent to %s from %s", settings.CONTACT_EMAIL_TO, form.email)
