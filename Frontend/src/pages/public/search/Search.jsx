import React from "react";
import HeroSearch from "./components/HeroSearch";
import Sidebar from "./components/Sidebar";
import SearchResults from "./components/SearchResults";
import { useState } from "react";
import scholarships from "../../../data/scholarships.json";
import Pagination from "./components/Pagination";

function Search() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Newest")

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

  // Search Function
  function handleSearch() {
    setCurrentPage(1);
    const search = searchText.toLowerCase().trim();
    const filtered = scholarships.filter((item) => {
      const matchesSearch = search === "" ||
        item.title.toLowerCase().includes(search) ||
        item.university.toLowerCase().includes(search) ||
        item.country.toLowerCase().includes(search) ||
        item.field.toLowerCase().includes(search) ||
        item.tags.some((tag) => tag.toLowerCase().includes(search));
      return (
        (filters.country === "Any Country" ||
          item.country === filters.country) &&
        (filters.degree === "Any Degree" || item.degree === filters.degree) &&
        (filters.field === "Any Field" || item.field === filters.field) &&
        (filters.funding === "Any Funding" ||
          item.funding === filters.funding) &&
        (filters.language === "Any Language" ||
          item.language === filters.language) &&
        (filters.deadline === "Any Deadline" ||
          item.deadline === filters.deadline) &&
        matchesSearch
      );

    });
    if (selectedSort === "Deadline (Soonest)") {
    filtered.sort((a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    });
    } else if (selectedSort === "Newest") {
    filtered.sort((a, b) => {
      return new Date(b.deadline) - new Date(a.deadline);
    });
  }
    setResults(filtered);
    setSearched(true);
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
        selectedSort={selectedSort}
      />

      <div className="mx-auto mt-10 flex max-w-7xl gap-8 px-6">
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
