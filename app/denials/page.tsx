"use client";

import { useState } from "react";
import DenialsFilters from "../components/dashboard/DenialsFilters";
import DenialsSummaryCards from "../components/dashboard/DenialsSummaryCards";
import DenialsTable, { Denial } from "../components/dashboard/DenialsTable";
import Pagination from "@/app/components/ui/Pagination";

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

        {/* Pagination */}
        <div className="px-6 py-4">
          <Pagination
            totalItems={filteredDenials.length}
            itemsPerPage={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
