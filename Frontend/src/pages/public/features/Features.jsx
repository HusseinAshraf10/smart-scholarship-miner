import React from "react";
import {
  Search,
  Brain,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Bell,
  FileText,
  Database,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

function Features() {
  const coreFeatures = [
    {
      icon: Search,
      title: "Targeted Search & Discovery",
      desc: "Integrates with DuckDuckGo Search API to automatically surface active postgraduate scholarship opportunities.",
      tag: "Discovery",
    },
    {
      icon: Brain,
      title: "Gemini 2.0 Flash Cognition",
      desc: "Analyzes raw university pages with zero hallucinations, evaluating eligibility against conversion MSc CS parameters.",
      tag: "AI Inference",
    },
    {
      icon: Globe,
      title: "Dual-Engine Web Extraction",
      desc: "Jina AI Markdown Reader cleans complex university portals, with automated BeautifulSoup4 fallback resilience.",
      tag: "Web Scraping",
    },
    {
      icon: Database,
      title: "Google Sheets Cloud Ledger",
      desc: "Instant programmatic synchronization to your Google Spreadsheet tracking status, dates, and deadlines.",
      tag: "Cloud Sync",
    },
    {
      icon: Bell,
      title: "Telegram Bot Notifications",
      desc: "Real-time alerts sent straight to your phone when candidate matches are discovered and evaluated.",
      tag: "Alerts",
    },
    {
      icon: BarChart3,
      title: "P1/P2/P3 Priority Scoring",
      desc: "Automated heuristic classification sorting opportunities by funding depth, academic thresholds, and acceptance rate.",
      tag: "Scoring",
    },
    {
      icon: Shield,
      title: "Conversion Background Check",
      desc: "Filters out programs requiring traditional CS degrees, highlighting programs open to non-CS / Commerce graduates.",
      tag: "Eligibility",
    },
    {
      icon: FileText,
      title: "16-Field Standardized Schema",
      desc: "Converts noisy HTML into structured JSON with portal links, deadlines, conditional offer acceptance, and email contacts.",
      tag: "Structure",
    },
    {
      icon: Zap,
      title: "Gemini / Ollama Hybrid Engine",
      desc: "Seamless failover between Google Cloud Gemini Flash API and local offline Ollama models.",
      tag: "Resilience",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            <Sparkles size={16} />
            System Capabilities
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Powered by Intelligent <span className="text-blue-600">Automation</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Every component is engineered to eliminate manual scholarship searching,
            evaluate real eligibility, and keep you notified in real-time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <feature.icon size={26} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-gray-500">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-16 rounded-3xl bg-blue-600 p-10 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold">Ready to find scholarships?</h2>
          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Explore our curated directory of 150+ scholarships or paste a direct university link for live AI evaluation.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Launch Search <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
