import os 
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HAS_GEMINI_ACCESS = bool(GEMINI_API_KEY and GEMINI_API_KEY.strip())

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID", "")
_raw_creds_path = os.getenv("GOOGLE_CREDS_PATH", "credentials.json")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "Qwen3:8B")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

GOOGLE_CREDS_PATH = None
if _raw_creds_path:
    resolved_path = Path(_raw_creds_path)
    if not resolved_path.is_absolute():
        resolved_path = BASE_DIR / resolved_path
    GOOGLE_CREDS_PATH = resolved_path


def validate_pipeline_config():
    """Validates configuration required for the automated Google Sheets / Telegram pipeline."""
    required = {
        "TELEGRAM_BOT_TOKEN": TELEGRAM_BOT_TOKEN,
        "TELEGRAM_CHAT_ID": TELEGRAM_CHAT_ID,
        "GOOGLE_SHEET_ID": GOOGLE_SHEET_ID,
        "GOOGLE_CREDS_PATH": _raw_creds_path,
    }
    missing = [k for k, v in required.items() if not v]
    if missing:
        missing_str = ", ".join(missing)
        raise ValueError(f"Runtime Panic: Missing required environment variables: {missing_str}")

    if not GOOGLE_CREDS_PATH or not GOOGLE_CREDS_PATH.exists():
        raise FileNotFoundError(f"Runtime Panic: Credentials file unresolvable at {GOOGLE_CREDS_PATH}")
