import gspread
from config import GOOGLE_CREDS_PATH, GOOGLE_SHEET_ID
from typing import List, Dict, Any

# Define strict OAuth authorization boundaries
SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

class SheetsService:
    def __init__(self):
        try:
            # Authenticate using the absolute path validated by config.py
            self.client = gspread.service_account(filename=str(GOOGLE_CREDS_PATH))
            self.spreadsheet = self.client.open_by_key(GOOGLE_SHEET_ID)
            self.sheet = self.spreadsheet.get_worksheet(0)

        except gspread.exceptions.SpreadsheetNotFound:
            raise RuntimeError(f"Sheets Core Failure: Spreadsheet ID '{GOOGLE_SHEET_ID}' not found or inaccessible.")
        
        except Exception as e:
            raise RuntimeError(f"Sheets Core Failure: Authentication failed. Internals: {str(e)}")

    def get_worksheet(self):
        return self.sheet


    def get_pending_scholarships(self):
        try:
            all_records = self.sheet.get_all_records()
        except Exception as e:
            raise RuntimeError(f"Sheets Pipeline Failure: Unable to fetch rows. Internals: {str(e)}")
        
        pending_queue = []
        
        for index, record in enumerate(all_records, start= 2):
            status = str(record.get("Status", "")).strip()
            url = (record.get("Official Portal", "").strip() or record.get("Application Link", "")).strip()

            if status == "🔲 Not Started" and url:
                record["__row_index"] = index
                record["__target_link"] = url
                pending_queue.append(record)

        return pending_queue
    
    def prepare_row_matrix(self, sanitized_data: dict) -> list:
        """
        Converts the data dictionary into a flat, index-ordered list 
        matching the exact 16-column sequence layout of the Google Sheet.
        """
        column_sequence = [
            "university", "scholarship_name", "funding_type", "opening_date", 
            "closing_date", "requirements", "university_requirements_grade", 
            "official_portal", "application_link", "accepts_conditional_offer", 
            "admissions_email", "competition_level", "priority", "status", 
            "application_fees", "notes"
        ]
        return [sanitized_data.get(column, "") for column in column_sequence]
    
    
    def update_scholarship_row(self, row_index: int, row_matrix: list):
        """
        Overwrites a specific horizontal row block (Columns A to P) 
        in a single, high-efficiency network request.
        """
        try:
            range_name = f"A{row_index}:P{row_index}"

            self.sheet.update(range_name, [row_matrix])
            
        except Exception as e:
            raise RuntimeError(
                f"Sheets Pipeline Failure: In-place mutation failed on row {row_index}. "
                f"Internals: {str(e)}"
            )
