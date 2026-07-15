import sys
from services.sheets import SheetsService
from services.extractor import ExtractorService
from services.gemini import GeminiService
from services.telegram import TelegramNotifierService

class ScholarshipPipelineOrchestrator:
    def __init__(self):
        print("Booting Intelligent Scholarship Automation Pipeline Engine...")

        try:
            self.sheets = SheetsService()
            print("[CONNECTED] Google Cloud Ledger Service Account Verified.")
            self.extractor = ExtractorService()
            print("[INITIALIZED] Web Text Extraction Gateway (Jina AI + BS4 Fallback).")
            self.gemini = GeminiService()
            print("[BONDED] Gemini 2.0 Flash Core Cognitive Inference Engine.")

            self.telegram = TelegramNotifierService()
            print("[READY] Telegram Outbound Notification Gateway Connection Stable.")
        except Exception as ec:
            print(f"\nCritical Core Initialization Failure! Halting Pipeline System.")
            print(f"Details: {str(ec)}")
            sys.exit(1)

        print("\nAll subsystems online. Control Loop structure standing by for execution.")

    
    def run_pipeline(self)-> None:

        print("Starting pipeline execution pass... Found (1) unprocessed scholarship entry.")

        shcolar_url = self.sheets.get_pending_scholarships()[:3]
        total_targets = len(shcolar_url)
        print(f"Found {total_targets} unprocessed scholarship entries waiting in line.\n")

        if total_targets == 0:
            print("🛑 No work found. Pipeline shutting down cleanly.")
            return None
        
        for target in shcolar_url:
            row_index = target["__row_index"]
            url = target["__target_link"]

            print(f"\n[Processing Row {row_index}] Target Link: {url}")


            try:
                print(f"Step 1/4: Launching text scraper...")

                raw_web_text = self.extractor.extract_markdown(url)
                if not raw_web_text or len(raw_web_text.strip()) < 100:
                    print("Scraped text payload is empty or dangerously insufficient.")
                    continue

                print(f"Step 2/4: Invoking Gemini 2.0 Flash AI Analysis...")
                ai_json_response = self.gemini.analyze_scholarship_text(raw_web_text)

                print(f"Step 3/4: Flattening data dictionary into row layout...")
                sanitized = self.gemini.sanitize_extracted_data(ai_json_response)
                row_matrix = self.sheets.prepare_row_matrix(sanitized)

                print(f"Step 4/4: Committing row to Google Sheet and sending alert...")
                self.sheets.update_scholarship_row(row_index, row_matrix)

                alert_message = (
                    f"🚨 *Scholarship Match Evaluated!*\n\n"
                    f"🏢 *University:* {ai_json_response.get('university', 'Unknown')}\n"
                    f"🎓 *Program:* {ai_json_response.get('scholarship_name', 'N/A')}\n"
                    f"💰 *Funding:* {ai_json_response.get('funding_type', 'N/A')}\n"
                    f"🎯 *Priority:* {ai_json_response.get('priority', 'P3')}\n"
                    f"📝 *Notes:* {ai_json_response.get('notes', 'None')}"
                )
                self.telegram.send_notification(alert_message)


            except Exception as row_error:
                print(f"[ROW REJECTION] Error processing row {row_index}: {str(row_error)}")
                continue

if __name__ == "__main__":
    try:
        orchestrator = ScholarshipPipelineOrchestrator()
        orchestrator.run_pipeline()
        
    except KeyboardInterrupt:
        print("\nPipeline execution paused manually by user. Shutting down system engines safely.")
        sys.exit(0)