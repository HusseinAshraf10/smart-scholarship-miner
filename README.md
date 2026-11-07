# Smart Scholarship Miner

An automated scholarship discovery and eligibility analysis engine built with **React**, **Flask**, and **Google Gemini 2.5 Flash**.

I built this project to solve a personal challenge: I graduated with a Bachelor of Commerce (Accounting) in Egypt with a 66% grade and wanted to pivot into Computer Science through a UK MSc conversion degree. Finding scholarships that actually accept non-STEM applicants, evaluate borderline 2:1 grades fairly, and provide substantial funding is usually a manual nightmare. 

This tool automates that research. You can browse an interactive catalog, paste any university link for live AI evaluation, or let the background pipeline process pending links from a Google Sheet and ping you on Telegram.

---

## What It Does

The project operates in two complementary ways:

### 1. Interactive Web Application
* **Curated Catalog:** Search and filter through 150+ postgraduate scholarships by country, degree level, field, funding type, and deadlines.
* **Live AI Evaluator:** Paste any university scholarship link or enter a query. The backend scrapes the live page, runs candidate-specific evaluation logic with Gemini 2.5 Flash, and returns structured criteria within seconds.
* **Conversion Fit Detection:** Flags whether a program accepts non-CS graduates or strictly demands a computer science background.
* **Grade & Priority Scoring:** Automatically grades the opportunity into **P1** (High match / Fully funded), **P2** (Medium / Partial), or **P3** (Low fit / Highly competitive).

### 2. Autonomous Ledger Pipeline (`main.py`)
* Reads unanalyzed scholarship URLs directly from row items in a **Google Sheet**.
* Scrapes the page using **Jina AI Reader** with an automated **BeautifulSoup4** fallback.
* Formats 16 standardized fields (deadlines, conditional offer status, competition rate, admissions email, fees, eligibility notes).
* Commits the structured row back to Google Sheets and dispatches an instant alert via a **Telegram Bot**.

---

## Architecture

```text
[ React + Vite Frontend ]
        │
        ├── Instant filtering on curated 150-scholarship catalog
        └── POST /analyze-url & POST /analyze
                    │
                    ▼
          [ Flask REST API ]
                    │
       ┌────────────┴────────────┐
       ▼                         ▼
[ DuckDuckGo / Bing ]   [ Web Text Extractor ]
(Portal Discovery)      (Direct BS4 + Jina Fallback)
                                 │
                                 ▼
                     [ Gemini 2.5 Flash API ]
                     (Candidate Fit & 16-Field JSON)
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [ Google Sheets Sync ]          [ Telegram Bot Alerts ]
          (Cloud Ledger)                  (Mobile Push)
```

---

## Tech Stack

* **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React, React Router v7
* **Backend:** Python 3.10+, Flask, Flask-CORS
* **AI & Inference:** Google Gemini 2.5 Flash API (with local Ollama fallback support)
* **Web Scraping:** BeautifulSoup4, Jina AI Markdown Gateway, Requests
* **Automation & Cloud:** Google Sheets API (`gspread`), Telegram Bot API

---

## Project Structure

```text
├── Backend/
│   ├── services/
│   │   ├── extractor.py    # Dual-layer scraper (Direct BS4 + Jina AI)
│   │   ├── gemini.py       # Gemini 2.5 Flash prompt & schema parser
│   │   ├── search.py       # Query resolver & web search
│   │   ├── sheets.py       # Google Sheets read/write ledger
│   │   └── telegram.py     # Mobile alert dispatcher
│   ├── app.py              # Flask REST API for the web frontend
│   ├── main.py             # CLI batch pipeline for Google Sheets
│   ├── config.py           # Environment validation & loading
│   └── requirements.txt    # Python dependencies
│
└── Frontend/
    ├── src/
    │   ├── components/     # Layout, Navbar, Footer
    │   ├── pages/public/   # Home, Search, About, Features, HowItWorks
    │   ├── data/           # scholarships.json (150 curated programs)
    │   ├── App.jsx         # App router
    │   └── main.jsx        # Entry point
    ├── vite.config.js      # Vite config with API proxy
    └── package.json
```

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **Python** (3.10 or higher)
* A **Google Gemini API Key** ([Get one free from Google AI Studio](https://aistudio.google.com/))

---

### 1. Backend Setup

1. Open your terminal and navigate to `Backend`:
   ```bash
   cd Backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   # Windows
   python -m venv .venv
   .\.venv\Scripts\activate

   # macOS / Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   *(Telegram and Google Sheets keys are only required if you run the batch pipeline via `main.py`)*

5. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will start on `http://localhost:5000`.

---

### 2. Frontend Setup

1. In a new terminal, navigate to `Frontend`:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open **http://localhost:5173** in your browser.

---

## Evaluation Logic & Heuristics

The evaluation prompt in `gemini.py` applies specific decision rules based on my candidate profile:

* **Conversion Program Verification:** Specifically looks for programs that accept graduates from any academic discipline (such as B.Com / Business). Rejects or flags standard CS programs requiring STEM undergraduate degrees.
* **Grade Translation:** Egyptian 66% (Good) is evaluated against UK standards as a borderline 2:1 / comfortable 2:2.
* **Priority Classification:**
  * **P1 (High):** Fully funded (or easily stackable), no application fee, accepts a 2:2 / 66% grade, reasonable competition.
  * **P2 (Medium):** Significant partial funding, moderate competition, or requires strong personal statement/portfolio to offset borderline grades.
  * **P3 (Low):** Demands a 1st Class degree, heavy application fees, or minimal financial relief.

---

## Author

**Hussein Ashraf**
* Background: B.Com Accounting $\rightarrow$ Aspiring Computer Science MSc Candidate
* Stack: Python, OOP, Flask, Automation, React, LLM Integration
