import asyncio
import logging
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["contact"])


# ---------- Schema ----------

class ContactPayload(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: str = ""
    volume: str = ""
    message: str


# ---------- Email builder ----------

def _build_lead_html(data: ContactPayload) -> str:
    role_line = f"<tr><td style='padding:8px 12px;color:#64748b;'>Cargo</td><td style='padding:8px 12px;'>{data.role}</td></tr>" if data.role else ""
    volume_line = f"<tr><td style='padding:8px 12px;color:#64748b;'>Volume mensal</td><td style='padding:8px 12px;'>{data.volume}</td></tr>" if data.volume else ""

    return f"""\
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #0F172A, #1E293B); padding: 32px 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #28CCCC; font-size: 20px; margin: 0;">Novo Lead — Ouv.ai</h1>
    <p style="color: #94A3B8; font-size: 14px; margin: 8px 0 0;">Formulário de contato do site</p>
  </div>

  <div style="background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #0F172A;">
      <tr style="background: #f8fafc;">
        <td style="padding:8px 12px; color:#64748b; width: 160px;">Nome</td>
        <td style="padding:8px 12px; font-weight: 600;">{data.name}</td>
      </tr>
      <tr>
        <td style="padding:8px 12px; color:#64748b;">E-mail</td>
        <td style="padding:8px 12px;"><a href="mailto:{data.email}" style="color:#28CCCC;">{data.email}</a></td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding:8px 12px; color:#64748b;">Empresa</td>
        <td style="padding:8px 12px; font-weight: 600;">{data.company}</td>
      </tr>
      {role_line}
      {volume_line}
    </table>

    <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 3px solid #28CCCC;">
      <p style="font-size: 12px; color: #64748b; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Mensagem</p>
      <p style="font-size: 14px; color: #0F172A; margin: 0; line-height: 1.6; white-space: pre-wrap;">{data.message}</p>
    </div>
  </div>

  <div style="background: #f8fafc; padding: 16px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
    <p style="font-size: 12px; color: #94A3B8; margin: 0;">
      Clique em <strong>Responder</strong> para contactar diretamente o lead.
    </p>
  </div>
</div>"""


# ---------- SMTP sender ----------

def _send_smtp(to_email: str, subject: str, html_body: str, reply_to: str = "") -> None:
    host = settings.SMTP_HOST
    port = settings.SMTP_PORT
    user = settings.SMTP_USER
    password = settings.SMTP_PASSWORD.replace(" ", "")  # Gmail app passwords may have spaces
    use_tls = settings.SMTP_USE_TLS
    sender_name = settings.SENDER_NAME
    sender_email = settings.SENDER_EMAIL or user

    if not host or not user or not password:
        raise RuntimeError("SMTP not configured — check .env (SMTP_HOST, SMTP_USER, SMTP_PASSWORD)")

    msg = MIMEMultipart("mixed")
    msg["From"] = f"{sender_name} <{sender_email}>"
    msg["To"] = to_email
    msg["Subject"] = subject
    if reply_to:
        msg["Reply-To"] = reply_to

    full_html = f'<html><head><meta charset="UTF-8"></head><body>{html_body}</body></html>'
    msg.attach(MIMEText(full_html, "html", "utf-8"))

    if port == 465:
        server = smtplib.SMTP_SSL(host, port, timeout=30)
        server.ehlo()
    elif use_tls:
        server = smtplib.SMTP(host, port, timeout=30)
        server.ehlo()
        server.starttls()
        server.ehlo()
    else:
        server = smtplib.SMTP(host, port, timeout=30)
        server.ehlo()

    try:
        server.login(user, password)
        server.sendmail(user, [to_email], msg.as_string())
    finally:
        try:
            server.quit()
        except (smtplib.SMTPServerDisconnected, OSError):
            pass


# ---------- Endpoint ----------

@router.post("/contact", status_code=200)
async def submit_contact(payload: ContactPayload):
    subject = f"[Lead] {payload.company} — {payload.name}"
    html = _build_lead_html(payload)
    to = settings.CONTACT_TO_EMAIL

    try:
        await asyncio.to_thread(_send_smtp, to, subject, html, payload.email)
    except Exception as e:
        logger.exception("Failed to send contact email: %s", str(e))
        raise HTTPException(status_code=500, detail="Falha ao enviar e-mail. Tente novamente.")

    logger.info("Contact lead sent: %s (%s) from %s", payload.name, payload.email, payload.company)
    return {"success": True, "message": "Mensagem enviada com sucesso."}
