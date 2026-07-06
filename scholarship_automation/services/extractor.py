import requests
from bs4 import BeautifulSoup

class ExtractorService:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        # Enforce a strict 15-second timeout so a dead link can't freeze our machine
        self.timeout = 15

    def extract_with_jina(self, url: str) -> str:
        jina_url = f"https://r.jina.ai/{url}"

        response = requests.get(jina_url, headers= self.headers, timeout= self.timeout)

        response.raise_for_status()

        return response.text
    
    def extract_with_fallback(self, url: str) -> str:
        response = requests.get(url, headers= self.headers, timeout= self.timeout)

        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        for element in soup(["script", "style", "nav", "footer", "header"]):
            element.extract()

        raw_text = soup.get_text(separator='\n')
        clean_lines = [line.strip() for line in raw_text.splitlines() if line.strip()]

        return "\n".join(clean_lines)
    
    def extract_markdown(self, url: str) -> str:
        try:
            return self.extract_with_jina(url)

        except Exception as e:
            return self.extract_with_fallback(url)

    
