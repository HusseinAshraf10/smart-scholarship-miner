import json
import requests
from pydantic import BaseModel, Field
from config import OLLAMA_MODEL, OLLAMA_URL, HAS_GEMINI_ACCESS, GEMINI_API_KEY



class ScholarshipSchema(BaseModel):
    university: str = Field(description="Name of the university awarding the scholarship.")
    scholarship_name: str = Field(description="Full name of the scholarship including financial specifics.")
    funding_type: str = Field(description="Must evaluate to one of these symbols exactly: '✅ Fully Funded', '⚠️ Partial/Uncertain', or '❌ No Funding'")
    opening_date: str = Field(description="Opening window date or estimated cycle timeline.")
    closing_date: str = Field(description="The formal submission deadline.")
    requirements: str = Field(description="Core applicant eligibility criteria, restrictions, and nationality metrics.")
    university_requirements_grade: str = Field(description="Specific academic boundaries or minimum grade requirements converted to UK equivalents.")
    official_portal: str = Field(description="Name or URL reference of the master university landing page.")
    application_link: str = Field(description="Direct web link to the online submission platform.")
    accepts_conditional_offer: str = Field(description="Evaluates to '✅ Yes', '❌ No', or '⚠️ Uncertain' regarding conditional offer statuses.")
    admissions_email: str = Field(description="The primary inbox address for admissions inquiries.")
    competition_level: str = Field(description="Ranking evaluation string tracking global selection rates.")
    priority: str = Field(description="Heuristic logic assignment: 'P1' (Must be fully funded (✅) or there is a tip way to be fully funded maybe combining two scholarships or something, no app fee, 66% grade OK, low/med competition), 'P2' (Medium/high competition, tight fit), or 'P3' (Partial funding, expensive fees, or 1st class required).")
    status: str = Field(default="🔲 Not Started", description="Pipeline status placeholder.")
    application_fees: str = Field(description="Financial application overhead tracking fee cost.")
    notes: str = Field(description="Critical evaluation notes tracking eligibility for a Commerce graduate with 66% and specific Python portfolio tips.")


class GeminiService:
    def __init__(self):
        self.model_name = OLLAMA_MODEL
        self.ollama_url = OLLAMA_URL.rstrip("/") + "/api/chat"
        self.extraction_schema = ScholarshipSchema
        self.use_cloud = HAS_GEMINI_ACCESS
        self.gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        self.headers = {"Content-Type": "application/json"}


    def analyze_scholarship_text(self, webpage_content: str) -> dict:
        webpage_content = webpage_content[:4000]
        system_prompt = """You are an expert academic automation system evaluating university scholarship web pages.
Your sole task is to extract structural metrics about this scholarship for the following candidate:

[CANDIDATE SPECIFICATION PROFILE]
- Name: Hussein Ashraf Hussein
- Background: Bachelor of Commerce (Accounting, Egypt), Final Grade: 66% (Good)
- Target: MSc Computer Science Conversion programs ONLY (Programs that explicitly accept non-CS/any discipline backgrounds).
- Programming Skills: Intermediate Python (OOP, Automation via Selenium, APIs, Pandas, Tkinter, Data Structures).
- Language Proficiency: English B2 (Targeting IELTS Band 7.0).
- Financial Priority: Critical. Requires Fully Funded or heavy tuition discounts.

[CRITICAL EVALUATION LOGIC RULES]
1. CONVERSION FILTER: If the webpage indicates this is a standard Advanced MSc CS that requires a STEM or CS bachelor's degree, immediately abort extraction or set notes to "INELIGIBLE: Requires CS background". If it accepts any discipline (BCom), mark it as highly compatible.
2. GRADE EVALUATION: If the university requires a UK 2:1 honours degree, evaluate 66% from Egypt as 'Borderline 2:1' and flag it. If they accept a 2:2, mark as 'Comfortable Pass'.
3. PRIORITY RULE:
   (P1) High Priority: Good/medium university, fully funded (✅) or stackable to full, no application fee, 66% grade is accepted, and competition level is low/medium.
   (P2) Medium Priority: Good/medium university, fully funded or partial funding (⚠️), medium/high competition, or requirements are a slightly tight fit.
   (P3) Low Priority: Partial funding, high competition (e.g., Russell Group), expensive application fees, or requires a 1st class degree.

Respond with ONLY valid JSON matching this schema:
{
  "university": "",
  "scholarship_name": "",
  "funding_type": "Choose ONLY ONE: ✅ Fully Funded  or  ⚠️ Partial/Uncertain  or  ❌ No Funding",
  "opening_date": "",
  "closing_date": "",
  "requirements": "",
  "university_requirements_grade": "",
  "official_portal": "",
  "application_link": "",
  "accepts_conditional_offer": "✅ Yes | ❌ No | ⚠️ Uncertain",
  "admissions_email": "",
  "competition_level": "",
  "priority": "P1 | P2 | P3",
  "status": "🔲 Not Started",
  "application_fees": "",   
  "notes": ""
}"""

        user_message = f"Analyze this scholarship webpage content:\n\n{webpage_content}"
        if self.use_cloud:
            payload = {
                "contents": [{"parts": [{"text": f"{system_prompt}\n\n{user_message}"}]}]
            }

            response = requests.post(self.gemini_url, json=payload, headers=self.headers, timeout= 120)
            response.raise_for_status()
            content = response.json()["candidates"][0]["content"]["parts"][0]["text"]
        else:
            
            payload = {
                "model": self.model_name,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_message},
                ],
                "stream": False,
                "options": {"temperature": 0.1},
            }

            response = requests.post(self.ollama_url, json=payload, timeout=120)
            response.raise_for_status()

        raw = response.json()
        content = raw["message"]["content"]

        cleaned = content.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("\n", 1)[-1]
            cleaned = cleaned.rsplit("```", 1)[0]

        return json.loads(cleaned.strip())
    
    def sanitize_extracted_data(self, data: dict) -> dict:
        sanitized = {}

        fields = [
            "university", "scholarship_name", "funding_type", "opening_date", 
            "closing_date", "requirements", "university_requirements_grade", 
            "official_portal", "application_link", "accepts_conditional_offer", 
            "admissions_email", "competition_level", "priority", "status", 
            "application_fees", "notes"
        ]
                
        for field in fields:
            val = data.get(field, "")

            if isinstance(val, str):
                val = val.strip()

            if field == "status":
                val = "🔲 Not Started"
                
            sanitized[field] = val

        return sanitized
        