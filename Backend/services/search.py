from duckduckgo_search import DDGS

class SearchService:
    def search_scholarships(self, query: str):

        results = []

        with DDGS as ddgs:
            ddgs_gen = ddgs.text(query, max_results = 5)

            for r in ddgs_gen:
                results.append(r["href"])
                
        return results 

