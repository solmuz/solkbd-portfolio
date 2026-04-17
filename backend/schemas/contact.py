from pydantic import BaseModel, EmailStr, Field


class ContactForm(BaseModel):
    nombre: str = Field(min_length=2, max_length=120)
    empresa: str = Field(default="", max_length=120)
    email: EmailStr
    asunto: str = Field(min_length=3, max_length=200)
    mensaje: str = Field(min_length=10, max_length=4000)
    # Honeypot — any client that fills this is a bot
    website: str = Field(default="", max_length=200)


class ContactResponse(BaseModel):
    ok: bool
    message: str
