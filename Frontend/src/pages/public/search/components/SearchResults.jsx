import React from "react";
import ScholarshipCard from "./ScholarshipCard";

function SearchResults({ results, searched, totalResults, selectedSort, setSelectedSort }) {
  return (
    <section className="flex-1">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scholarships</h2>

          <p className="mt-1 text-sm text-gray-500">
            {totalResults} scholarships found
          </p>
        </div>

        <select className="rounded-xl border border-gray-300 px-4 py-2 outline-none transition-colors duration-200 focus:border-blue-600"
        onChange={(event) => setSelectedSort(event.target.value)} value={selectedSort}>
          <option>Newest</option>
          <option>Deadline (Soonest)</option>
        </select>
      </div>

      {/* Cards */}
      <div className="space-y-6">
        {!searched ? (
          <div className="flex h-80 flex-col items-center justify-center text-center">
            <span className="text-6xl">🎓</span>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Start Your Scholarship Search
            </h3>
            <p className="mt-3 max-w-md leading-7 text-gray-600">
              Choose your filters and click Search to discover scholarships
              tailored for you.</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center text-center">
            <span className="text-6xl">🔍</span>
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              No Scholarships Found</h3>
            <p className="mt-3 max-w-md leading-7 text-gray-600">
              Try changing your filters or search keywords.</p>
          </div>
        ) : (
          results.map((scholarship) => (
            <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
          ))
        )}
      </div>
    </section>
  );
}

export default SearchResults;
