# backend/app/utils/llm.py

import httpx
from app.core.config import settings
from typing import Any, Dict


class GroqClient:
    def __init__(self, api_key: str | None = None, base_url: str | None = None, model: str | None = None):
        self.api_key = api_key or settings.GROQ_API_KEY
        # Remove any trailing slash to avoid double-slash in constructed URL
        self.base_url = (base_url or str(settings.GROQ_BASE_URL)).rstrip("/")
        self.model = model or settings.GROQ_MODEL

        self._client = httpx.AsyncClient(timeout=30.0)

    async def generate(self, prompt: str, max_tokens: int = 512) -> str:
        """
        Sends a Chat Completions request to Groq (OpenAI-compatible endpoint).
        Includes temperature and ensures max_tokens is an integer.
        Prints Groq error text when status >= 400 to help debugging.
        """
        url = f"{self.base_url}/openai/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        body: Dict[str, Any] = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": prompt}
            ],
            # Groq/OpenAI-compatible fields
            "temperature": 0,
            "max_tokens": int(max_tokens)
        }

        resp = await self._client.post(url, json=body, headers=headers)

        # Debug logging: print Groq's raw error body so you can see exact reason for 4xx/5xx
        if resp.status_code >= 400:
            try:
                print("❌ GROQ ERROR:", resp.text)
            except Exception:
                print("❌ GROQ ERROR: (unable to read response text)")

        resp.raise_for_status()

        data = resp.json()

        # Try to extract the assistant reply (OpenAI-style response)
        try:
            return data["choices"][0]["message"]["content"]
        except Exception:
            # Fallback: return the whole response as string for debugging
            return str(data)

    async def close(self):
        await self._client.aclose()
