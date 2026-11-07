import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from services.gemini import GeminiService
from services.search import SearchService
from services.extractor import ExtractorService

app = Flask(__name__)
# Enable CORS for frontend requests from any origin or localhost:5173
CORS(app, resources={r"/*": {"origins": "*"}})

scholarship_engine = GeminiService()
search_engine = SearchService()
extractor = ExtractorService()


@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "status": "active",
        "engine": "Gemini/Ollama Hybrid",
        "endpoints": [
            "POST /analyze (body: { 'query': string })",
            "POST /analyze-url (body: { 'url': string })"
        ]
    })


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json(silent=True)

    if not data or "query" not in data or not str(data["query"]).strip():
        return jsonify({"error": "No query provided"}), 400

    query_text = str(data["query"]).strip()

    try:
        links = search_engine.search_scholarships(query_text)
    except Exception as e:
        return jsonify({"error": f"Search failed: {str(e)}"}), 500

    if not links:
        return jsonify({"error": "No scholarship links found for that query"}), 404

    results = []
    last_error = None
    # Process up to top 3 links
    for link in links[:3]:
        try:
            webpage_text = extractor.extract_markdown(link)
            if not webpage_text or len(webpage_text.strip()) < 100:
                continue

            analysis = scholarship_engine.analyze_scholarship_text(webpage_text)
            sanitized = scholarship_engine.sanitize_extracted_data(analysis)
            sanitized["source_url"] = link
            results.append(sanitized)
        except Exception as e:
            last_error = str(e)
            print(f"[SKIP] Failed to analyze {link}: {last_error}")
            continue

    if not results:
        err_msg = last_error or "Could not extract scholarship data from found links"
        return jsonify({"error": err_msg}), 500

    return jsonify(results)


@app.route("/analyze-url", methods=["POST"])
def analyze_url():
    """Analyze a single scholarship URL provided by the user."""
    data = request.get_json(silent=True)

    if not data or "url" not in data or not str(data["url"]).strip():
        return jsonify({"error": "No URL provided"}), 400

    url = str(data["url"]).strip()

    try:
        webpage_text = extractor.extract_markdown(url)
        if not webpage_text or len(webpage_text.strip()) < 100:
            return jsonify({"error": "Could not extract sufficient text from that page"}), 422

        analysis = scholarship_engine.analyze_scholarship_text(webpage_text)
        sanitized = scholarship_engine.sanitize_extracted_data(analysis)
        sanitized["source_url"] = url
        return jsonify(sanitized)

    except Exception as e:
        return jsonify({"error": f"Failed to analyze URL: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting Smart Scholarship Miner API server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
