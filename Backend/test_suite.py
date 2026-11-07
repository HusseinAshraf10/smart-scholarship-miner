import unittest
import json
from app import app
from services.extractor import ExtractorService
from services.gemini import GeminiService, ScholarshipSchema
from services.search import SearchService
import config


class TestSmartScholarshipMiner(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = app.test_client()
        cls.extractor = ExtractorService()
        cls.gemini = GeminiService()
        cls.search = SearchService()

    # 1. Config Tests
    def test_01_config_loaded(self):
        self.assertIsNotNone(config.BASE_DIR)
        self.assertTrue(hasattr(config, "HAS_GEMINI_ACCESS"))
        self.assertTrue(callable(config.validate_pipeline_config))

    # 2. SearchService Tests
    def test_02_search_direct_url(self):
        test_url = "https://www.cambridge.ac.uk/study"
        results = self.search.search_scholarships(test_url)
        self.assertIn(test_url, results)

    def test_03_search_known_portal(self):
        results = self.search.search_scholarships("University of York postgraduate funding")
        self.assertTrue(len(results) > 0)
        self.assertTrue(any("york.ac.uk" in r for r in results))

    def test_04_search_catalog_match(self):
        results = self.search.search_scholarships("Technical University of Munich")
        self.assertTrue(len(results) > 0)

    # 3. ExtractorService Tests
    def test_05_extractor_basic(self):
        text = self.extractor.extract_markdown("https://example.com")
        self.assertTrue(len(text) > 50)
        self.assertIn("Example Domain", text)

    # 4. GeminiService Sanitization & Schema Tests
    def test_06_gemini_sanitizer(self):
        raw_mock = {
            "university": "  University of Test  ",
            "scholarship_name": "Test Award",
            "funding_type": "✅ Fully Funded",
            "priority": "P1"
        }
        sanitized = self.gemini.sanitize_extracted_data(raw_mock)
        self.assertEqual(sanitized["university"], "University of Test")
        self.assertEqual(sanitized["status"], "🔲 Not Started")
        self.assertIn("admissions_email", sanitized)
        self.assertIn("notes", sanitized)
        self.assertEqual(len(sanitized), 16)

    # 5. Flask Endpoints - GET /
    def test_07_api_root(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["status"], "active")
        self.assertEqual(res.headers.get("Access-Control-Allow-Origin"), "*")

    # 6. Flask Endpoints - Validation Errors
    def test_08_api_analyze_empty_payload(self):
        res = self.client.post("/analyze", json={})
        self.assertEqual(res.status_code, 400)
        self.assertIn("error", res.get_json())

    def test_09_api_analyze_url_empty_payload(self):
        res = self.client.post("/analyze-url", json={})
        self.assertEqual(res.status_code, 400)
        self.assertIn("error", res.get_json())

    # 7. End-to-End Live Extraction & AI Inference
    def test_10_api_live_analyze_url(self):
        # Test with a real, accessible scholarship page
        test_url = "https://www.york.ac.uk/study/postgraduate-taught/funding/"
        res = self.client.post("/analyze-url", json={"url": test_url})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertEqual(data["source_url"], test_url)
        self.assertIn("university", data)
        self.assertIn("funding_type", data)
        self.assertIn("priority", data)
        self.assertIn("notes", data)
        print("\n[E2E Live Analyze-URL Success]:", data["university"], "-> Priority:", data["priority"])

    def test_11_api_live_analyze_query(self):
        # Test search + extraction + evaluation flow
        query = "University of York scholarship"
        res = self.client.post("/analyze", json={"query": query})
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertIsInstance(data, list)
        self.assertTrue(len(data) > 0)
        first = data[0]
        self.assertIn("university", first)
        self.assertIn("priority", first)
        print("\n[E2E Live Analyze-Query Success]:", first["university"], "-> Found", len(data), "items")


if __name__ == "__main__":
    unittest.main()
