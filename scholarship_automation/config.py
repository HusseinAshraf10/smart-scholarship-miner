import os 
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HAS_GEMINI_ACCESS = bool(GEMINI_API_KEY and GEMINI_API_KEY.strip())

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")
GOOGLE_SHEET_ID = os.getenv("GOOGLE_SHEET_ID")
_raw_creds_path = os.getenv("GOOGLE_CREDS_PATH")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "Qwen3:8B")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

REQUIRED_VARS = {
    "TELEGRAM_BOT_TOKEN": TELEGRAM_BOT_TOKEN,
    "TELEGRAM_CHAT_ID": TELEGRAM_CHAT_ID,
    "GOOGLE_SHEET_ID": GOOGLE_SHEET_ID,
    "GOOGLE_CREDS_PATH": _raw_creds_path,
}

missing = [key for key, val in REQUIRED_VARS.items() if not val]

if missing:
    raise ValueError(f"Runtime Panic: Missing required environment variables: {", ".join(missing)}")


# Resolve and validate Google credentials path layout
GOOGLE_CREDS_PATH = Path(_raw_creds_path)
if not GOOGLE_CREDS_PATH.is_absolute():
    GOOGLE_CREDS_PATH = BASE_DIR / GOOGLE_CREDS_PATH

if not GOOGLE_CREDS_PATH.exists():
    raise FileNotFoundError(f"Runtime Panic: Credentials file unresolvable at {GOOGLE_CREDS_PATH}")


    