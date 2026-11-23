import React, { useState } from "react";
import HeroSearch from "./components/HeroSearch";
import AIAnalyze from "./components/AIAnalyze";
import Sidebar from "./components/Sidebar";
import SearchResults from "./components/SearchResults";
import scholarships from "../../../data/scholarships.json";
import Pagination from "./components/Pagination";

function Search() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Newest");

  const cardsPerPage = 3;
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentResults = results.slice(startIndex, endIndex);
  const totalPages = Math.ceil(results.length / cardsPerPage);

  // Search Filters
  const [filters, setFilters] = useState({
    country: "Any Country",
    degree: "Any Degree",
    field: "Any Field",
    funding: "Any Funding",
    language: "Any Language",
    deadline: "Any Deadline",
  });

  // Filter Function
  function HandleFilter(event) {
    let filterName = event.target.name;
    let filterValue = event.target.value;
    setFilters({ ...filters, [filterName]: filterValue });
  }

  // Smart Search Function
  function handleSearch(overrideText) {
    setCurrentPage(1);

    const query = (typeof overrideText === "string" ? overrideText : searchText)
      .toLowerCase()
      .trim();

    // Common English stop words to ignore in multi-word sentences
    const stopWords = new Set([
      "a", "an", "the", "in", "on", "at", "for", "to", "of", "with", "and", "or",
      "by", "from", "is", "are", "was", "were", "be", "it", "this", "that", "i",
      "im", "looking", "want", "need", "find", "scholarships", "scholarship",
      "public", "universities", "intake", "equivalent", "accepting"
    ]);

    // Split sentence into meaningful keyword tokens
    const tokens = query
      .split(/[\s,.-]+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

    const filtered = scholarships.filter((item) => {
      let matchesSearch = query === "";

      if (!matchesSearch) {
        // 1. Direct Substring Match
        if (
          item.title.toLowerCase().includes(query) ||
          item.university.toLowerCase().includes(query) ||
          item.country.toLowerCase().includes(query) ||
          item.field.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          matchesSearch = true;
        } else if (tokens.length > 0) {
          // 2. Smart Token Match (matches if item matches key concepts like "Computer", "Science", "UK")
          matchesSearch = tokens.some(
            (token) =>
              item.title.toLowerCase().includes(token) ||
              item.university.toLowerCase().includes(token) ||
              item.country.toLowerCase().includes(token) ||
              item.field.toLowerCase().includes(token) ||
              item.tags.some((tag) => tag.toLowerCase().includes(token))
          );
        }
      }

      return (
        (filters.country === "Any Country" || item.country === filters.country) &&
        (filters.degree === "Any Degree" || item.degree === filters.degree) &&
        (filters.field === "Any Field" || item.field === filters.field) &&
        (filters.funding === "Any Funding" || item.funding === filters.funding) &&
        (filters.language === "Any Language" || item.language === filters.language) &&
        (filters.deadline === "Any Deadline" || item.deadline === filters.deadline) &&
        matchesSearch
      );
    });

    if (selectedSort === "Deadline (Soonest)") {
      filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (selectedSort === "Newest") {
      filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
    }

    setResults(filtered);
    setSearched(true);

    // Smoothly scroll down to results so the user immediately sees the change!
    setTimeout(() => {
      const el = document.getElementById("search-results-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  // Reset Function
  function handleReset() {
    setResults([]);
    setSearched(false);
    setFilters({
      country: "Any Country",
      degree: "Any Degree",
      field: "Any Field",
      funding: "Any Funding",
      language: "Any Language",
      deadline: "Any Deadline",
    });
  }

  // Text Search Function
  function handleText(event) {
    let text = event.target.value;
    setSearchText(text);
  }

  return (
    <div>
      <HeroSearch
        handleSearch={handleSearch}
        handleText={handleText}
        searchText={searchText}
        setSearchText={setSearchText}
        selectedSort={selectedSort}
      />

      <div className="mt-8">
        <AIAnalyze />
      </div>

      <div
        id="search-results-section"
        className="mx-auto mt-6 flex max-w-7xl gap-8 px-6 pt-4"
      >
        <Sidebar
          handleFilter={HandleFilter}
          filters={filters}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />

        <div className="flex-1">
          <SearchResults
            results={currentResults}
            searched={searched}
            totalResults={results.length}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
