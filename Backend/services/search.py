import json
import re
from pathlib import Path
from duckduckgo_search import DDGS

KNOWN_PORTALS = {
    "east london": "https://www.uel.ac.uk",
    "uel": "https://www.uel.ac.uk",
    "essex": "https://www.essex.ac.uk",
    "york": "https://www.york.ac.uk/study/postgraduate-taught/funding/",
    "oxford": "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarships",
    "cambridge": "https://www.postgraduate.study.cam.ac.uk/funding",
    "edinburgh": "https://www.ed.ac.uk/student-funding/postgraduate",
    "manchester": "https://www.manchester.ac.uk/study/masters/fees-and-funding/",
    "birmingham": "https://www.birmingham.ac.uk/postgraduate/funding",
    "leeds": "https://www.leeds.ac.uk/masters-fees-funding",
    "bristol": "https://www.bristol.ac.uk/fees-funding/postgraduate/",
    "glasgow": "https://www.gla.ac.uk/scholarships/",
    "sheffield": "https://www.sheffield.ac.uk/postgraduate/taught/fees-funding",
    "nottingham": "https://www.nottingham.ac.uk/pgstudy/funding/funding.aspx",
    "southampton": "https://www.southampton.ac.uk/courses/funding/postgraduate.page",
    "tum": "https://www.tum.de/en/studies/fees-and-financial-aid/scholarships",
    "munich": "https://www.tum.de/en/studies/fees-and-financial-aid/scholarships",
    "toronto": "https://www.sgs.utoronto.ca/awards/",
}


class SearchService:
    def __init__(self):
        self.catalog_path = Path(__file__).resolve().parent.parent.parent / "Frontend" / "src" / "data" / "scholarships.json"

    def search_scholarships(self, query: str) -> list:
        results = []
        q_lower = query.strip().lower()

        # 1. Direct URL in search query
        direct_urls = re.findall(r"https?://[^\s]+", query)
        for u in direct_urls:
            if u not in results:
                results.append(u)

        # 2. Known university portal dictionary lookup
        for name, portal in KNOWN_PORTALS.items():
            if name in q_lower and portal not in results:
                results.append(portal)

        # 3. Match against local scholarship directory
        if self.catalog_path.exists():
            try:
                with open(self.catalog_path, encoding="utf-8") as f:
                    catalog = json.load(f)
                    for item in catalog:
                        u_name = item.get("university", "").lower()
                        title = item.get("title", "").lower()
                        field = item.get("field", "").lower()
                        country = item.get("country", "").lower()

                        if any(term in q_lower for term in [u_name, title, field, country] if term and len(term) > 3):
                            app_url = item.get("applicationUrl")
                            if app_url and app_url.startswith("http") and app_url not in results:
                                results.append(app_url)

                        if len(results) >= 5:
                            break
            except Exception as e:
                print(f"[SearchService] Catalog match warning: {e}")

        # 4. DuckDuckGo Search Fallback
        if len(results) < 3:
            try:
                with DDGS() as ddgs:
                    # Try text search
                    ddgs_results = ddgs.text(query, max_results=5)
                    for r in ddgs_results:
                        link = r.get("href") or r.get("link")
                        if link and link.startswith("http") and link not in results:
                            results.append(link)

                    # Try news search if text search didn't yield links
                    if len(results) < 2:
                        news_results = ddgs.news(query, max_results=3)
                        for r in news_results:
                            link = r.get("url")
                            if link and link.startswith("http") and link not in results:
                                results.append(link)
            except Exception as e:
                print(f"[SearchService] Web search exception: {str(e)}")

        return results[:5]
