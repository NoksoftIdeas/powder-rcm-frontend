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
      <main className="flex-1  bg-gray-50 my-3 ">
        <div className="max-w-7xl mx-auto ">
          <div className="text-1xl font-bold mb-4 ml-4 text-[#344054] flex items-center-safe  ">
            {totalClaims.toLocaleString()} Claims
            <div className=" ml-4">
              <ClaimsFilters filters={filters} onChange={handleFiltersChange} />
            </div>
          </div>

          <ClaimsTable onView={handleViewClaim} claims={paginatedClaims} />

          <div className="mt-6">
            <nav
              className=" flex flex-row item-center justify-between "
              aria-label="Pagination"
            >
              <div>
                <button
                  className="px-3 py-2 disabled:opacity-50"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous Page"
                >
                  <img src="/icons/Button.png" alt="previous" />
                </button>
              </div>
              <div>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-2  text-gray-700  ${
                      page === idx + 1
                        ? "font-bold border-[1px] border-gray-300 rounded text-[#182230] bg-[#F5F5F5]"
                        : ""
                    }`}
                    onClick={() => handlePageChange(idx + 1)}
                    aria-current={page === idx + 1 ? "page" : undefined}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <div>
                <button
                  className="px-3 py-2 "
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next Page"
                >
                  <img src="/icons/ButtonNxt.png" alt="next" />
                </button>
              </div>
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
