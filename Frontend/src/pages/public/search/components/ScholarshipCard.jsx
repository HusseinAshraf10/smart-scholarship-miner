import React from "react";
import { CalendarDays, GraduationCap, Globe, ArrowRight } from "lucide-react";

function ScholarshipCard({ scholarship }) {
  return (
    <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg">
      {/* Featured */}
      {scholarship.featured && (
        <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
          Featured
        </span>
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">{scholarship.title}</h2>

      {/* University */}
      <p className="mt-2 text-gray-600">{scholarship.university}</p>

      {/* Info */}
      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-gray-700">
          <Globe size={16} />
          {scholarship.country}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-gray-700">
          <GraduationCap size={16} />
          {scholarship.degree}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
          {scholarship.funding}
        </div>
      </div>

      {/* Description */}
      <p className="mt-5 leading-7 text-gray-600">{scholarship.description.slice(0, 120)}</p>

      {/* Deadline */}
      <div className="font-bold mt-4 flex items-center gap-2 text-sm text-red-600">
        <CalendarDays size={16} />
        <span>Deadline: {scholarship.deadline}</span>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="mt-5 flex flex-wrap gap-2">
          {scholarship.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >{tag}
            </span>
          ))}
        </div>

        <button className="group flex cursor-pointer items-center gap-2 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700">
          View Details
          <ArrowRight size={18}  className="transition-transform duration-200 group-hover:translate-x-1"/>
        </button>
      </div>
    </article>
  );
}

export default ScholarshipCard;
