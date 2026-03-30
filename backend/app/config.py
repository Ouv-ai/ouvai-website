from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # SMTP
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_USE_TLS: bool = True
    SENDER_NAME: str = "Ouv.ai"
    SENDER_EMAIL: str = ""

    # Contact form destination
    CONTACT_TO_EMAIL: str = "contato@ouvai.com.br"

    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5500",
        "https://www.ouvai.com.br",
        "https://ouvai.com.br",
    ]

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
