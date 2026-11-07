import React from "react";
import {
  User,
  Code,
  GraduationCap,
  Mail,
  MapPin,
  Languages,
  Terminal,
  Database,
  Globe,
  Bot,
  Brain,
  Target,
} from "lucide-react";

function About() {
  const skills = [
    { icon: Terminal, name: "Python & OOP" },
    { icon: Database, name: "SQL & Data Modeling" },
    { icon: Globe, name: "Web Scraping (Jina + BS4)" },
    { icon: Bot, name: "Process Automation" },
    { icon: Brain, name: "LLM Orchestration (Gemini / Ollama)" },
    { icon: Code, name: "React, APIs & Cloud Integration" },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.Com Accounting — 66% (Good)",
      detail: "Graduated with strong analytical and financial background",
    },
    {
      icon: Target,
      label: "Target",
      value: "MSc Computer Science (Conversion)",
      detail: "Specialized conversion programs accepting non-CS bachelor backgrounds",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Egypt → UK / Global",
      detail: "Seeking international postgraduate study opportunities",
    },
    {
      icon: Languages,
      label: "Languages",
      value: "Arabic (Native) · English (B2, IELTS 7.0 Target)",
      detail: "Academic and professional communication proficiency",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
            <User size={16} />
            About The Developer
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Hussein <span className="text-blue-600">Ashraf</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Commerce graduate pivoting to Computer Science through self-taught
            software engineering, intelligent automation, and AI-driven tools.
          </p>
        </div>

        {/* Info Cards */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <item.icon size={22} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {item.label}
                </p>
                <p className="mt-1 text-base font-bold text-gray-900">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Skills */}
        <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Code size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
              <p className="text-sm text-gray-500">Key competencies powering this platform</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <skill.icon size={16} className="text-blue-600" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* About This Project */}
        <div className="mb-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Brain size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">About Smart Scholarship Miner</h2>
              <p className="text-sm text-gray-500">Autonomous academic matching & extraction engine</p>
            </div>
          </div>
          <div className="space-y-4 text-base leading-7 text-gray-600">
            <p>
              Finding the right postgraduate scholarship is challenging — especially when transitioning from
              a non-traditional background. Most university pages are buried under complex eligibility jargon,
              stringent grade conversions, and unclear funding statuses.
            </p>
            <p>
              <strong>Smart Scholarship Miner</strong> solves this by combining automated web scraping
              (via Jina AI reader and BeautifulSoup4) with Google Gemini 2.0 Flash cognitive inference.
              It parses live university portals, extracts 16 standardized criteria fields, evaluates compatibility
              against the candidate profile, and keeps a structured ledger updated in real time with instant notifications.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Mail size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Get In Touch</h2>
              <p className="text-sm text-gray-500">Open to collaboration, academic advice, and technical roles</p>
            </div>
          </div>
          <p className="mb-6 text-sm text-gray-600">
            Have questions about the miner architecture or want to connect? Reach out through any of these channels:
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:hussein@example.com"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Mail size={16} />
              Send Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              <Code size={16} />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              <Globe size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
