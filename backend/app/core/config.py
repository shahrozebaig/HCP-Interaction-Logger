# backend/app/core/config.py

from pydantic_settings import BaseSettings
from pydantic import Field, AnyHttpUrl


class Settings(BaseSettings):
    MONGODB_URI: str = Field(..., env="MONGODB_URI")
    MONGODB_DB: str = Field("ai_crm", env="MONGODB_DB")

    # Groq LLM API
    GROQ_API_KEY: str = Field(..., env="GROQ_API_KEY")
    GROQ_BASE_URL: AnyHttpUrl = Field("https://api.groq.com", env="GROQ_BASE_URL")
    GROQ_MODEL: str = Field("gemma2-9b-it", env="GROQ_MODEL")

    # Optional
    STT_API_KEY: str | None = Field(None, env="STT_API_KEY")

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8"
    }


settings = Settings()
