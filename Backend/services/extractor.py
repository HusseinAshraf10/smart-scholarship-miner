import requests
import urllib3
from bs4 import BeautifulSoup

# Suppress insecure SSL warnings when fallback connects with verify=False
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class ExtractorService:
    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        self.timeout = 10

    def extract_with_direct_bs4(self, url: str) -> str:
        try:
            response = requests.get(url, headers=self.headers, timeout=self.timeout)
        except requests.exceptions.SSLError:
            response = requests.get(url, headers=self.headers, timeout=self.timeout, verify=False)

        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")

        for element in soup(["script", "style", "nav", "footer", "header", "noscript"]):
            element.extract()

        raw_text = soup.get_text(separator="\n")
        clean_lines = [line.strip() for line in raw_text.splitlines() if line.strip()]

        return "\n".join(clean_lines)

    def extract_with_jina(self, url: str) -> str:
        jina_url = f"https://r.jina.ai/{url}"
        response = requests.get(jina_url, headers=self.headers, timeout=12)
        response.raise_for_status()
        return response.text

    def extract_markdown(self, url: str) -> str:
        # 1. Try fast direct fetch with BS4 first (typically ~500ms)
        try:
            direct_text = self.extract_with_direct_bs4(url)
            if direct_text and len(direct_text.strip()) > 150:
                return direct_text
        except Exception as e:
            print(f"[Extractor] Direct fetch failed for {url} ({e}), trying Jina reader...")

        # 2. Try Jina AI reader for JS-heavy pages
        try:
            jina_text = self.extract_with_jina(url)
            if jina_text and len(jina_text.strip()) > 100:
                return jina_text
        except Exception as e:
            print(f"[Extractor] Jina reader failed for {url}: {e}")

        return ""
