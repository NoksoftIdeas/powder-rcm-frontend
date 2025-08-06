"use client";

import { useState } from "react";
import DenialsFilters from "../components/dashboard/DenialsFilters";
import DenialsSummaryCards from "../components/dashboard/DenialsSummaryCards";
import ReprocessModal from "../../components/ReprocessModal";
import DenialsTable, { Denial } from "../components/dashboard/DenialsTable";

export default function DenialsPage() {
  const [mockDenials, setMockDenials] = useState<Denial[]>([
    {
      sn: 1,
      time: "10:47 AM",
      date: "2024-12-10",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "Few mins",
      hmo: "ALLY HEALTH CARE",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 2,
      time: "11:12 AM",
      date: "2024-12-11",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "2 hrs",
      hmo: "ALLY HEALTH CARE",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 3,
      time: "01:32 PM",
      date: "2024-12-12",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "12 hrs",
      hmo: "VENUS MEDICARE LIMITED",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 4,
      date: "2024-12-13",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "1 day",
      hmo: "VENUS MEDICARE LIMITED",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 5,
      date: "2024-12-14",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "2 days",
      hmo: "SONGHAI",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 6,
      date: "2024-12-15",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "3 days",
      hmo: "SONGHAI",
      reason: "Service not covered under policy",
      action: "Reprocess",
    },
    {
      sn: 7,
      date: "2024-12-16",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "4 days",
      hmo: "ALLY HEALTH CARE",
      reason: "Service not covered under policy",
      action: "Reprocessed",
    },
    {
      sn: 8,
      date: "2024-12-17",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "5 days",
      hmo: "VENUS MEDICARE LIMITED",
      reason: "Service not covered under policy",
      action: "Reprocessed",
    },
    {
      sn: 9,
      date: "2024-12-18",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "6 days",
      hmo: "SONGHAI",
      reason: "Service not covered under policy",
      action: "Reprocessed",
    },
    {
      sn: 10,
      date: "2024-12-19",
      enrolleeId: "13/O/W7EZ7O",
      daysOpened: "7 days",
      hmo: "SONGHAI",
      reason: "Service not covered under policy",
      action: "Reprocessed",
    },
  ]);

  const [filters, setFilters] = useState({
    search: "",
    hmo: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const hmoOptions = ["ALLY HEALTH CARE", "VENUS MEDICARE LIMITED", "SONGHAI"];
  const statusOptions = ["Unresolved", "Resolved", "Reprocessed"];

  const filteredDenials = mockDenials.filter((denial) => {
    const matchesSearch =
      !filters.search ||
      denial.enrolleeId.toLowerCase().includes(filters.search.toLowerCase()) ||
      denial.hmo.toLowerCase().includes(filters.search.toLowerCase()) ||
      denial.reason.toLowerCase().includes(filters.search.toLowerCase());

    const matchesHmo = !filters.hmo || denial.hmo === filters.hmo;

    const matchesStatus =
      !filters.status ||
      denial.action.toLowerCase() === filters.status.toLowerCase();

    let matchesDate = true;
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      const recordDate = new Date(denial.date);
      startDate.setHours(0, 0, 0, 0);
      if (recordDate < startDate) {
        matchesDate = false;
      }
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      const recordDate = new Date(denial.date);
      endDate.setHours(23, 59, 59, 999);
      if (recordDate > endDate) {
        matchesDate = false;
      }
    }

    return matchesSearch && matchesHmo && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredDenials.length / pageSize);
  const paginatedDenials = filteredDenials.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const [selectedDenial, setSelectedDenial] = useState<Denial | null>(null);
  const [isReprocessModalOpen, setIsReprocessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReprocessClick = (denial: Denial) => {
    setSelectedDenial(denial);
    setIsReprocessModalOpen(true);
  };

  const handleReprocess = async () => {
    if (!selectedDenial) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the denial status in the local state
      setMockDenials((prev) =>
        prev.map((d) =>
          d.sn === selectedDenial.sn
            ? { ...d, action: "Reprocessed", daysOpened: "Few mins" }
            : d
        )
      );

      // Close the modal and reset state
      setIsReprocessModalOpen(false);
      setSelectedDenial(null);

      // Show success message or notification
      alert(`Successfully reprocessed denial for ${selectedDenial.enrolleeId}`);
    } catch (error) {
      console.error("Error reprocessing denial:", error);
      alert("Failed to reprocess denial. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <DenialsSummaryCards
        totalAmount="₦21.4m"
        unresolved={23}
        resolved={321}
        avgDayOpen={4}
      />
      <div className=" py-4  border-[1px] border-gray-300 rounded-xl">
        <DenialsFilters
          search={filters.search}
          hmo={filters.hmo}
          status={filters.status}
          startDate={filters.startDate}
          endDate={filters.endDate}
          hmoOptions={hmoOptions}
          statusOptions={statusOptions}
          onChange={setFilters}
        />
        <DenialsTable
          denials={paginatedDenials}
          onReprocess={handleReprocessClick}
        />

        <ReprocessModal
          isOpen={isReprocessModalOpen}
          onClose={() => setIsReprocessModalOpen(false)}
          onReprocess={handleReprocess}
          loading={isProcessing}
        />
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mx-5 py-2 gap-4">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, mockDenials.length)} of{" "}
              {mockDenials.length.toLocaleString()}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                className={`w-10 h-10 flex items-center justify-center rounded-md ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                1
              </button>
              {currentPage > 3 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (currentPage <= 3) {
                  pageNum = i + 2;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                if (pageNum > 1 && pageNum < totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 flex items-center justify-center rounded-md ${
                        currentPage === pageNum
                          ? "bg-white text-gray-900 font-medium border border-gray-200"
                          : "text-gray-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}

              {currentPage < totalPages - 2 && totalPages > 5 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              {totalPages > 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage === totalPages
                      ? "bg-white text-gray-900 font-medium border border-gray-200"
                      : "text-gray-600"
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>
            <div className="flex items-center gap-1">
              {/* Previous button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50"
                aria-label="Previous page"
              >
                ←
              </button>

              {/* Next button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1 px-3 rounded-md border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50"
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
