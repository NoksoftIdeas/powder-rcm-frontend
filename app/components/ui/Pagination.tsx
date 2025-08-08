"use client";

import { ArrowLeft, ArrowRight, } from "lucide-react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();
  const showStartEllipsis = pageNumbers[0] > 1;
  const showEndEllipsis = pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 ">
      {/* Left-aligned text */}
      <div className="text-sm text-gray-500">
        Showing {startItem}–{endItem} of {totalItems.toLocaleString()}
      </div>

      {/* Center pagination */}
      <div className="flex items-center space-x-2">
        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {showStartEllipsis && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                  1 === currentPage
                    ? "bg-white border border-gray-300 font-semibold text-gray-900"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                1
              </button>
              {pageNumbers[0] > 2 && (
                <span className="px-2 text-gray-400">...</span>
              )}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                page === currentPage
                  ? "bg-white border border-gray-300 font-semibold text-gray-900"
                  : "text-gray-400 hover:text-black"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          {showEndEllipsis && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                  totalPages === currentPage
                    ? "bg-white border border-gray-300 font-semibold text-gray-900"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      </div>
        <div className="flex gap-2">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md border ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            aria-label="Previous page"
          >
            < ArrowLeft className="w-4 h-4" />
          </button>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md border ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            aria-label="Next page"
          >
            < ArrowRight className="w-4 h-4" />
          </button>
        </div>
    </div>
  );
}

export default Pagination;
