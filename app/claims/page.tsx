"use client";

import React, { useState } from "react";
import ClaimsFilters, { ClaimsFilterState } from "./ClaimsFilters";
import ClaimsTable, { Claim, mockClaims } from "./ClaimsTable";
import ClaimInvoiceModal from "./ClaimInvoiceModal";
import { withAuth } from "../components/auth/withAuth";

const PAGE_SIZE = 6;

const initialFilters: ClaimsFilterState = {
  search: "",
  hmo: "",
  minAmount: "",
  maxAmount: "",
  status: "",
  date: "",
};

function ClaimsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [filters, setFilters] = useState<ClaimsFilterState>(initialFilters);
  const [page, setPage] = useState(1);

  // Filtering logic
  const filteredClaims = mockClaims.filter((claim) => {
    const searchMatch =
      filters.search === "" ||
      claim.patientId.toLowerCase().includes(filters.search.toLowerCase()) ||
      claim.patientName.toLowerCase().includes(filters.search.toLowerCase());
    const hmoMatch = filters.hmo === "" || claim.hmo === filters.hmo;
    const minAmountMatch =
      filters.minAmount === "" ||
      parseInt(claim.totalCost.replace(/[^\d]/g, ""), 10) >=
        parseInt(filters.minAmount || "0", 10);
    const maxAmountMatch =
      filters.maxAmount === "" ||
      parseInt(claim.totalCost.replace(/[^\d]/g, ""), 10) <=
        parseInt(filters.maxAmount || "99999999", 10);
    const statusMatch =
      filters.status === "" || claim.status === filters.status;
    // Date filter is placeholder; implement if claim.date is ISO
    return (
      searchMatch && hmoMatch && minAmountMatch && maxAmountMatch && statusMatch
    );
  });

  // Pagination logic
  const totalClaims = filteredClaims.length;
  const totalPages = Math.max(1, Math.ceil(totalClaims / PAGE_SIZE));
  const paginatedClaims = filteredClaims.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleViewClaim(claim: Claim) {
    setSelectedClaim(claim);
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setSelectedClaim(null);
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  }

  function handleFiltersChange(newFilters: ClaimsFilterState) {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
  }

  return (
    <div className="flex  py-2 border-[1px] border-gray-300 rounded-xl">
      <main className="flex-1 min-h-screen bg-gray-50 px-1 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-1xl font-bold mb-4 text-gray-800 ">
            {totalClaims.toLocaleString()} Claims
          </div>
          <div className="mb-6">
            <ClaimsFilters filters={filters} onChange={handleFiltersChange} />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-0 overflow-x-auto">
            <ClaimsTable onView={handleViewClaim} claims={paginatedClaims} />
          </div>

          <div className="mt-6 flex item-center bottom-2 justify-center">
            <nav
              className="inline-flex rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                className="px-3 py-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous Page"
              >
                &lt;Previous
              </button>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-2 border-t border-b border-gray-200 bg-white text-gray-700 hover:bg-blue-50 ${
                    page === idx + 1 ? "font-bold text-blue-700 bg-blue-50" : ""
                  }`}
                  onClick={() => handlePageChange(idx + 1)}
                  aria-current={page === idx + 1 ? "page" : undefined}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className="px-3 py-2 border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 rounded-r-md disabled:opacity-50"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next Page"
              >
                Next &gt;
              </button>
            </nav>
          </div>
        </div>
        <ClaimInvoiceModal
          open={modalOpen}
          onClose={handleCloseModal}
          claim={selectedClaim}
        />
      </main>
    </div>
  );
}

export default withAuth(ClaimsPage);
