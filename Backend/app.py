import requests
from flask import Flask, request, jsonify
from services.gemini import GeminiService
from services.search import SearchService


app = Flask(__name__)

scholarship_engine = GeminiService()
search_engin = SearchService()


@app.route("/", methods= ["GET"])
def index():
    return jsonify({"status": "active", "engine": "Gemini/Ollama Hybrid"})


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    if not data or "query" not in data:
        return jsonify({"error": "NO query provided"}), 400
    
    query_text = data["query"]

    links = search_engin.search_scholarships(query_text)

    if not links:
        return jsonify({"error: NO links found"}), 404
    
    first_link = links[0]

    try:

        webpage_text = requests.get(first_link, timeout= 10).text
    except requests.RequestException:
        return jsonify({"error: Failed to read the website"}), 500
        
    result = scholarship_engine.analyze_scholarship_text(webpage_text)

    return jsonify(result)
