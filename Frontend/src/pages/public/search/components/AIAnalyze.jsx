import React, { useState } from "react";
import {
  Brain,
  Search,
  Link2,
  Loader2,
  AlertCircle,
  ExternalLink,
  GraduationCap,
  Calendar,
  DollarSign,
  Mail,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

function AIAnalyze() {
  const [activeTab, setActiveTab] = useState("url"); // 'url' | 'query'
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    const val = inputVal.trim();
    if (!val) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const endpoint =
      activeTab === "url"
        ? "http://localhost:5000/analyze-url"
        : "http://localhost:5000/analyze";

    const payload =
      activeTab === "url" ? { url: val } : { query: val };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg =
          data && data.error
            ? data.error
            : `Backend responded with error code ${response.status}`;
        throw new Error(errorMsg);
      }

      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) {
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        setError(
          "Cannot connect to Backend API. Please start the Flask server by running 'python app.py' in the Backend folder (listening on port 5000)."
        );
      } else {
        setError(err.message || "An unexpected error occurred during AI analysis.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getPriorityStyle = (p) => {
    if (p === "P1") return "bg-green-100 text-green-700 border-green-200";
    if (p === "P2") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getFundingBadge = (funding) => {
    if (!funding) return null;
    if (funding.includes("Fully Funded")) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          <CheckCircle2 size={13} /> {funding}
        </span>
      );
    }
    if (funding.includes("Partial")) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
          <HelpCircle size={13} /> {funding}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
        <XCircle size={13} /> {funding}
      </span>
    );
  };

  return (
    <div className="mx-auto mb-12 max-w-7xl px-6">
      <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-blue-50/30 p-8 shadow-sm">
        {/* Title & Tabs */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <Brain size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  Live AI Scholarship Miner & Evaluator
                </h2>
                <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                  <Sparkles size={11} /> Gemini 2.0
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Connects directly to the Python backend for live extraction & conversion profile matching
              </p>
            </div>
          </div>

          {/* Toggle buttons */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1">
            <button
              onClick={() => {
                setActiveTab("url");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                activeTab === "url"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Link2 size={14} /> Analyze URL
            </button>
            <button
              onClick={() => {
                setActiveTab("query");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                activeTab === "query"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Search size={14} /> AI Web Search
            </button>
          </div>
        </div>

        {/* Input box */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            {activeTab === "url" ? (
              <Link2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            ) : (
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            )}
            <input
              type={activeTab === "url" ? "url" : "text"}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              placeholder={
                activeTab === "url"
                  ? "Paste university scholarship URL (e.g., https://www.essex.ac.uk/scholarships/...)"
                  : "Type query to search & scrape (e.g., fully funded MSc Computer Science UK 2025)"
              }
              className="w-full rounded-2xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !inputVal.trim()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Brain size={18} />
                <span>{activeTab === "url" ? "Analyze Page" : "Mine Scholarships"}</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
            <AlertCircle size={20} className="mt-0.5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Analysis Failed</p>
              <p className="mt-0.5 text-xs text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Results output */}
        {results && results.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-bold text-gray-900">
                AI Extracted Intelligence ({results.length} Opportunity{results.length > 1 ? "ies" : ""})
              </h3>
              <button
                onClick={() => setResults(null)}
                className="text-xs font-medium text-gray-500 hover:text-gray-700"
              >
                Clear Results
              </button>
            </div>

            {results.map((res, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <GraduationCap size={22} className="text-blue-600" />
                      <h4 className="text-xl font-bold text-gray-900">
                        {res.university || "University Profile"}
                      </h4>
                      {res.priority && (
                        <span
                          className={`rounded-lg border px-2.5 py-0.5 text-xs font-bold ${getPriorityStyle(
                            res.priority
                          )}`}
                        >
                          {res.priority}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-base font-semibold text-blue-600">
                      {res.scholarship_name || "Scholarship Program"}
                    </p>
                  </div>

                  <div>{getFundingBadge(res.funding_type)}</div>
                </div>

                {/* Key Metrics Grid */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={15} className="text-gray-400" />
                    <span className="text-gray-500">Deadline:</span>
                    <span className="font-semibold text-gray-900">
                      {res.closing_date || "Not Specified"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={15} className="text-gray-400" />
                    <span className="text-gray-500">App Fee:</span>
                    <span className="font-semibold text-gray-900">
                      {res.application_fees || "Free"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400 font-bold text-xs">🎓</span>
                    <span className="text-gray-500">Grade Req:</span>
                    <span className="font-semibold text-gray-900">
                      {res.university_requirements_grade || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400 font-bold text-xs">📝</span>
                    <span className="text-gray-500">Conditional Offer:</span>
                    <span className="font-semibold text-gray-900">
                      {res.accepts_conditional_offer || "Uncertain"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400 font-bold text-xs">⚡</span>
                    <span className="text-gray-500">Competition:</span>
                    <span className="font-semibold text-gray-900">
                      {res.competition_level || "Medium"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={15} className="text-gray-400" />
                    <span className="text-gray-500">Admissions Email:</span>
                    <span className="font-semibold text-gray-900 truncate">
                      {res.admissions_email || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                {res.requirements && (
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Eligibility & Requirements
                    </p>
                    <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                      {res.requirements}
                    </p>
                  </div>
                )}

                {/* Candidate Matching Notes */}
                {res.notes && (
                  <div className="mt-3 rounded-2xl border border-yellow-200 bg-yellow-50/70 p-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-yellow-800">
                      <Sparkles size={14} /> Candidate Profile Evaluation (Hussein Ashraf — 66% B.Com)
                    </div>
                    <p className="mt-1 text-sm text-yellow-900 leading-relaxed font-medium">
                      {res.notes}
                    </p>
                  </div>
                )}

                {/* Footer Links */}
                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4">
                  {res.application_link && (
                    <a
                      href={
                        res.application_link.startsWith("http")
                          ? res.application_link
                          : `https://${res.application_link}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      <ExternalLink size={14} /> Apply via Official Portal
                    </a>
                  )}

                  {res.official_portal && (
                    <a
                      href={
                        res.official_portal.startsWith("http")
                          ? res.official_portal
                          : `https://${res.official_portal}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                    >
                      <ExternalLink size={14} /> University Website
                    </a>
                  )}

                  {res.source_url && (
                    <a
                      href={res.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700"
                    >
                      <Link2 size={13} /> Scraped Source Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIAnalyze;
