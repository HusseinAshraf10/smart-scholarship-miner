import React from "react";
import {
  Globe,
  Brain,
  Database,
  Bell,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Globe,
      title: "Web Text Extraction & Scraping",
      desc: "The pipeline receives a target university scholarship URL. It first queries the Jina AI Markdown Gateway (https://r.jina.ai/) to convert chaotic HTML into clean, semantic markdown. If blocked or unreachable, it falls back to an internal BeautifulSoup4 DOM parser stripping noise, scripts, and styling.",
      tech: "Jina AI + BeautifulSoup4",
      highlights: ["Handles dynamic & JavaScript pages", "Removes ads, navbars & boilerplate", "Strict 15s network timeout"],
    },
    {
      num: "02",
      icon: Brain,
      title: "Gemini 2.0 Flash Cognitive Inference",
      desc: "The cleaned markdown is fed into Google Gemini 2.0 Flash (or local Ollama Qwen3:8B). The AI evaluates the page against candidate Hussein's profile (B.Com Accounting 66%, non-CS background targeting MSc CS Conversion, B2 English). It extracts 16 standardized attributes and determines eligibility.",
      tech: "Gemini 2.0 Flash / Ollama Hybrid",
      highlights: ["Conversion MSc validation (rejects STEM-only MSc)", "Grade conversion (66% Egypt evaluated vs UK 2:1)", "Strict JSON schema enforcement"],
    },
    {
      num: "03",
      icon: Database,
      title: "Sanitization & Google Sheets Ledger",
      desc: "Extracted data is sanitized to guarantee clean strings, default statuses, and normalized priority metrics (P1 / P2 / P3). It is formatted into an exact 16-column matrix and committed to the user's Google Spreadsheet via Google Service Account OAuth API in a single network request.",
      tech: "gspread + Google Cloud Service Account",
      highlights: ["In-place atomic row updates", "16-column layout alignment", "Persistent cloud tracking"],
    },
    {
      num: "04",
      icon: Bell,
      title: "Real-Time Telegram Notification",
      desc: "Once an entry is processed and committed, an alert payload is dispatched via Telegram Bot API to your personal chat ID. The message highlights university name, scholarship title, funding status, priority tag, and AI evaluation notes.",
      tech: "Telegram Bot API (Markdown v1)",
      highlights: ["Immediate mobile push notification", "Quick summary of funding and priority", "Zero latency alerting"],
    },
  ];

  const priorityCriteria = [
    {
      tier: "P1",
      color: "bg-green-100 text-green-800 border-green-200",
      label: "High Priority",
      description: "Fully funded (✅) or stackable to full, no application fee, 66% grade accepted, conversion program friendly, low-to-medium competition.",
    },
    {
      tier: "P2",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Medium Priority",
      description: "Significant partial funding (⚠️), reasonable application fees, moderate Russell Group competition, or borderline 2:1 fit.",
    },
    {
      tier: "P3",
      color: "bg-red-100 text-red-800 border-red-200",
      label: "Low Priority",
      description: "Requires 1st class honors, highly competitive, expensive non-refundable fee, or minor funding discounts only.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            <Cpu size={16} />
            System Architecture & Logic
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            How The <span className="text-blue-600">Pipeline</span> Operates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            From raw web links to actionable academic intelligence — a four-stage automated loop
            designed for reliability and zero hallucination.
          </p>
        </div>

        {/* 4 Stages */}
        <div className="relative mb-20 space-y-8">
          {/* Vertical Connecting Line (desktop) */}
          <div className="absolute left-8 top-8 bottom-8 hidden w-1 bg-blue-100 md:block" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-md md:flex-row md:items-start"
            >
              {/* Step Badge */}
              <div className="z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-md">
                {step.num}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <step.icon size={22} className="text-blue-600" />
                    <h2 className="text-xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {step.tech}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-gray-600">
                  {step.desc}
                </p>

                {/* Sub features */}
                <div className="grid gap-2 sm:grid-cols-3">
                  {step.highlights.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2 text-xs font-medium text-gray-700"
                    >
                      <CheckCircle2 size={14} className="text-blue-600 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Priority Evaluation Logic */}
        <div className="mb-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Priority Ranking Heuristics
              </h2>
              <p className="text-sm text-gray-500">
                How our AI categorizes opportunities for candidate Hussein Ashraf
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {priorityCriteria.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-2xl border p-5 ${tier.color}`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xl font-extrabold">{tier.tier}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {tier.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-gray-800">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            Try It Now in Search <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
