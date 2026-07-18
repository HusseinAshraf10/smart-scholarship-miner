import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {/* Previous */}
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border
       border-gray-300 bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}>
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index} onClick={() => setCurrentPage(index + 1)}
          className={`h-10 w-10 rounded-xl font-medium transition ${ currentPage === index + 1 ? "bg-blue-600 text-white": "border border-gray-300 bg-white hover:bg-gray-100"}`}>
          {index + 1}
        </button>
      ))}

      {/* Next */}
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300
       bg-white transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;
