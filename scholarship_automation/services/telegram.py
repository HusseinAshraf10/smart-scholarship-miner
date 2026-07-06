import requests
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

class TelegramNotifierService:
    def __init__(self):
        self.bot_token = str(TELEGRAM_BOT_TOKEN).strip()
        self.chat_id = str(TELEGRAM_CHAT_ID).strip()
        self.base_url = f"https://api.telegram.org/bot{self.bot_token}/sendMessage"

    
    def send_notification(self, message: str) -> bool:

        payload = {
            "chat_id": self.chat_id,
            "text": message,
            "parse_mode": "Markdown" 
        }

        try:
            response = requests.post(self.base_url, json=payload, timeout=10)

            response.raise_for_status()

            return True
        except Exception as ec:
            print(f"⚠️ Telegram Gateway Network Drop Alert: {str(ec)}")
            return False
        
        