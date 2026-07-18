import React from "react";
import scholarships from "../../../../data/scholarships.json";

function Sidebar({ filters, handleFilter, handleReset }) {
    const countries = [...new Set(scholarships.map((item) => item.country))].sort();
    const degrees = [...new Set(scholarships.map((item) => item.degree))].sort();
    const fields = [...new Set(scholarships.map((item) => item.field))].sort();
    const fundings = [...new Set(scholarships.map((item) => item.funding))];
    const languages = [...new Set(scholarships.map((item) => item.language))].sort();
    const deadlines = [...new Set(scholarships.map((item) => item.deadline))].sort((a, b) => new Date(a) - new Date(b));
  return (
    <section className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:w-80">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Search Filters</h3>
        <button className="cursor-pointer text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
        onClick={handleReset}>
          Reset All</button>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-700">Country</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.country} onChange={handleFilter} name="country">
          <option>Any Country</option>
          {countries.map((country) => (
              <option key={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-700">
          Degree Level</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.degree} onChange={handleFilter} name="degree">
          <option>Any Degree</option>
          {degrees.map((degree) => (
              <option key={degree}>{degree}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-700">
          Field of Study</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.field} onChange={handleFilter} name="field">
          <option>Any Field</option>
          {fields.map((field) => (
              <option key={field}>{field}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-700">
          Funding Type</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.funding} onChange={handleFilter} name="funding">
          <option>Any Funding</option>
          {fundings.map((funding) => (
              <option key={funding}>{funding}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-700">language</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.language} onChange={handleFilter} name="language">
          <option>Any Language</option>
          {languages.map((language) => (
              <option key={language}>{language}</option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <label className="mb-2 block font-medium text-gray-700">Deadline</label>
        <select className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-blue-600"
        value={filters.deadline} onChange={handleFilter} name="deadline">
          <option>Any Deadline</option>
          {deadlines.map((deadline) => (
              <option key={deadline}>{deadline}</option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="mb-4 font-semibold text-gray-900">Additional Filters</h4>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" />
            <span className="text-gray-700">Fully Funded Only</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" />
            <span className="text-gray-700">
              Open for International Students
            </span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" />
            <span className="text-gray-700">No Application Fee</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" />
            <span className="text-gray-700">Easy to Apply</span>
          </label>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
