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
        return jsonify({"error": 'NO links found'}), 404

    webpage_text = None
    successful_url = None
    
    for candidate_url in links[:3]:
        try:
            response = requests.get(candidate_url, timeout= 10)
            if response.status_code == 200 and len(response.text.strip()) > 200:
                webpage_text = response.text
                successful_url = candidate_url
                break 
        except requests.RequestException:
            continue
        
    if not webpage_text:
        return jsonify({"error": "All candidate websites were unreachable or blocked"}), 502

    
        
    result = scholarship_engine.analyze_scholarship_text(webpage_text)
    result['source_url'] = successful_url
    return jsonify(result)
