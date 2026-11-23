import React, { useState, useEffect, useRef } from "react";
import { Search, Sparkles, Building2, MapPin, GraduationCap } from "lucide-react";
import scholarships from "../../../../data/scholarships.json";

function HeroSearch({ handleSearch, handleText, searchText, setSearchText }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  // Popular search tags for one-click discovery
  const popularTags = [
    "Computer Science",
    "Oxford",
    "Cambridge",
    "Fully Funded",
    "United Kingdom",
    "Germany",
    "Norway",
  ];

  // Compute live auto-suggestions based on typing
  useEffect(() => {
    const query = searchText ? searchText.trim().toLowerCase() : "";
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const matches = [];
    const seen = new Set();

    for (const s of scholarships) {
      // 1. Check university
      if (s.university && s.university.toLowerCase().includes(query) && !seen.has(s.university)) {
        seen.add(s.university);
        matches.push({ type: "university", label: s.university, icon: Building2 });
      }
      // 2. Check field
      if (s.field && s.field.toLowerCase().includes(query) && !seen.has(s.field)) {
        seen.add(s.field);
        matches.push({ type: "field", label: s.field, icon: GraduationCap });
      }
      // 3. Check country
      if (s.country && s.country.toLowerCase().includes(query) && !seen.has(s.country)) {
        seen.add(s.country);
        matches.push({ type: "country", label: s.country, icon: MapPin });
      }
      if (matches.length >= 6) break;
    }

    setSuggestions(matches);
  }, [searchText]);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (label) => {
    if (setSearchText) {
      setSearchText(label);
    }
    setShowSuggestions(false);
    // Trigger search with the selected text
    if (handleSearch) {
      setTimeout(() => {
        handleSearch(label);
      }, 50);
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="mx-auto max-w-4xl px-6" ref={wrapperRef}>
        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
            <Sparkles size={14} className="text-blue-600 animate-pulse" />
            <span>Smart Scholarship Database Explorer</span>
          </div>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
            Find Your Perfect Scholarship
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-base text-gray-600">
            Search hundreds of verified global university scholarships with smart keyword matching.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mt-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <div className="relative">
            <input
              type="text"
              onChange={(e) => {
                handleText(e);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowSuggestions(false);
                  handleSearch();
                }
              }}
              value={searchText}
              placeholder="Search by university, field, or country (e.g., Computer Science, Oxford, UK, Fully Funded)..."
              className="w-full rounded-2xl border border-gray-200 py-4 pl-5 pr-36 text-gray-800 outline-none transition-colors duration-200 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <button
              className="absolute right-2 top-2 bottom-2 flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow"
              onClick={() => {
                setShowSuggestions(false);
                handleSearch();
              }}
            >
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
              <div className="bg-gray-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Matching Suggestions
              </div>
              <div className="divide-y divide-gray-50">
                {suggestions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectSuggestion(item.label)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-blue-50/70 hover:text-blue-700"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                        <Icon size={15} />
                      </span>
                      <span className="font-medium">{item.label}</span>
                      <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-400 capitalize">
                        {item.type}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Popular Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
            <span className="font-medium text-gray-400">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSelectSuggestion(tag)}
                className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
