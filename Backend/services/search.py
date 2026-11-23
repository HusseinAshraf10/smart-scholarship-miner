import os
import requests
from duckduckgo_search import DDGS
from config import GEMINI_API_KEY

class SearchService:
    def __init__(self):
        self.api_key = GEMINI_API_KEY
        self.refine_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key={self.api_key}"
        # قائمة موثوقة لصفحات برامج تحويل علوم الحاسب والمنح في بريطانيا
        self.fallback_scholarships = [
            "https://www.bristol.ac.uk/study/postgraduate/taught/msc-computer-science-conversion/",
            "https://www.birmingham.ac.uk/postgraduate/courses/taught/computer-science/computer-science-msc",
            "https://www.qub.ac.uk/courses/postgraduate-taught/software-development-msc/",
            "https://www.cardiff.ac.uk/study/postgraduate/taught/courses/course/computing-msc",
            "https://www.nottingham.ac.uk/pgstudy/course/taught/computer-science-(conversion)-msc"
        ]

    def _refine_query(self, user_text: str) -> str:
        if len(user_text.split()) <= 6:
            return user_text
        
        prompt = (
            "You are a search query optimizer. "
            "Convert this user scholarship request into a single concise search query (maximum 6 words) "
            "that will find official UK university scholarship pages on Google. "
            "Output ONLY the query string, no quotes.\n\n"
            f"User Request: {user_text}"
        )

        try:
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(self.refine_url, json=payload, headers={"Content-Type": "application/json"}, timeout=8)
            if res.status_code == 200:
                refined = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip().replace('"', '')
                print(f"[SearchService] Refined Query: '{refined}'")
                return refined
        except Exception as e:
            print(f"[SearchService] Refine error, using fallback: {e}")

        return "UK university MSc computer science conversion scholarship"

    def search_scholarships(self, query: str):
        results = []
        target_query = self._refine_query(query)
        
        try:
            with DDGS(timeout=10) as ddgs:
                ddgs_gen = ddgs.text(target_query, max_results=5)
                for r in ddgs_gen:
                    href = r.get("href", "")
                    # نتأكد إن الرابط لجامعة أو موقع أكاديمي ومش شركة شحن أو ترفيه
                    if any(domain in href for domain in [".ac.uk", "university", "scholarship", "study", "education"]):
                        results.append(href)
        except Exception as ec:
            print(f"[SearchService] DuckDuckGo error: {ec}")

        # لو دكداك جو فشل أو جاب روابط خارج السياق، بنرجع فوراً القائمة الأكاديمية الموثوقة
        if not results:
            print("[SearchService] Using verified academic scholarship targets...")
            return self.fallback_scholarships[:4]
            
        return results
