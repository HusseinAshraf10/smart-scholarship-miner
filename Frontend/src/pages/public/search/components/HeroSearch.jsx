import React from "react";
import { Search } from "lucide-react";

function HeroSearch({ handleSearch, handleText, searchText }) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
            Find Your Perfect Scholarship
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-gray-600">
            Describe your goals and let AI find the best scholarship
            opportunities for you.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <textarea
              onChange={handleText}
              value={searchText}
              rows={4}
              placeholder="Example: I'm looking for a fully funded Master's scholarship in Computer Science in Germany..."
              className="w-full resize-none rounded-2xl border border-gray-200 p-5 pr-36 text-gray-700 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-600"
            />

            <button
              className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
              onClick={handleSearch}
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
