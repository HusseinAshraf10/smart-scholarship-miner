import requests
from flask import Flask, request, jsonify
from services.gemini import GeminiService
from services.search import SearchService
from flask_cors import CORS
from services.sheets import SheetsService
from services.telegram import TelegramNotifierService


app = Flask(__name__)
CORS(app)

scholarship_engine = GeminiService()
search_engin = SearchService()
sheet_service = SheetsService()
telegram_service = TelegramNotifierService()



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
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    for candidate_url in links[:4]:
        try:
            response = requests.get(candidate_url, headers=headers, timeout=10)
            if response.status_code == 200 and len(response.text.strip()) > 300:
                webpage_text = response.text
                successful_url = candidate_url
                break 
        except requests.RequestException:
            continue
        
    if not webpage_text:
        return jsonify({"error": "All candidate websites were unreachable or blocked"}), 502

    try:
        result = scholarship_engine.analyze_scholarship_text(webpage_text)
        if isinstance(result, list) and len(result) > 0:
            result = result[0]
        if isinstance(result, dict):
            result['source_url'] = successful_url
            return jsonify(result)
        return jsonify({"error": "AI returned invalid response format"}), 502
    except Exception as e:
        print(f"[Analyze Error]: {type(e).__name__}: {e}")
        return jsonify({"error": f"AI extraction error: {str(e)}"}), 502


# Search By ULR
@app.route("/analyze-url", methods=["POST"])
def analyze_url():
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "No URL provided"}), 400
    
    url = data["url"].strip()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        webpage_text = response.text
    except requests.RequestException:
        return jsonify({"error": "Failed to read the website"}), 502
        
    try:
        result = scholarship_engine.analyze_scholarship_text(webpage_text)
        if isinstance(result, list) and len(result) > 0:
            result = result[0]
        if isinstance(result, dict):
            result["source_url"] = url
            return jsonify(result)
        return jsonify({"error": "AI returned invalid response format"}), 502
    except Exception as e:
        print(f"[Analyze URL Error]: {type(e).__name__}: {e}")
        return jsonify({"error": f"AI extraction error: {str(e)}"}), 502


@app.route("/sync-scholarship", methods= ["POST"])
def sync_scholarship():
    data = request.get_json()
    if not data:
        return jsonify({"error":"No data provided"}), 400

    try:
        row_matrix = sheet_service.prepare_row_matrix(data)

        sheet_service.sheet.append_row(row_matrix)

        alert_msg = (
            f"🎓 *Scholarship Saved!*\n\n"
            f"🏛 *University:* {data.get('university', 'N/A')}\n"
            f"📜 *Program:* {data.get('scholarship_name', 'N/A')}\n"
            f"💰 *Funding:* {data.get('funding_type', 'N/A')}\n"
            f"🎯 *Priority:* {data.get('priority', 'N/A')}"
        )

        telegram_sent = telegram_service.send_notification(alert_msg)

        return jsonify({
            "status":"success",
            "message":"Saved to Google Sheet",
            "telegram_sent":telegram_sent,
        }), 200
    except Exception as ec:
        print(f"[Sync Error]: {ec}")
        return jsonify({"error": f"Faild to sync scholarship: {str(ec)}"}), 500

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)
    