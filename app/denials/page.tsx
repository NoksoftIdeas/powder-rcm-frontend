"use client";

import { useState } from "react";
import DenialsFilters from "../components/dashboard/DenialsFilters";
import DenialsSummaryCards from "../components/dashboard/DenialsSummaryCards";
import DenialsTable, { Denial } from "../components/dashboard/DenialsTable";
import Pagination from "../patients/Pagination";

export default function DenialsPage() {
  const [filters, setFilters] = useState({
    search: "",
    hmo: "",
    status: "",
    dateRange: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const hmoOptions = [
    "ALLY HEALTH CARE",
    "VENUS MEDICARE LIMITED",
    "SONGHAI",
  ];
  const statusOptions = [
    "Unresolved",
    "Resolved",
    "Reprocessed",
  ];

  const mockDenials: Denial[] = [
    { sn: 1, time: "10:47 AM", date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "Few mins", hmo: "ALLY HEALTH CARE", reason: "Service not covered under policy", action: "Reprocess" },
    { sn: 2, time: "11:12 AM", date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "2 hrs", hmo: "ALLY HEALTH CARE", reason: "Service not covered under policy", action: "Reprocess" },
    { sn: 3, time: "01:32 PM", date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "12 hrs", hmo: "VENUS MEDICARE LIMITED", reason: "Service not covered under policy", action: "Reprocess" },
    { sn: 4, date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "1 day", hmo: "VENUS MEDICARE LIMITED", reason: "Service not covered under policy", action: "Reprocess" },
    { sn: 7, date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "3 days", hmo: "SONGHAI", reason: "Service not covered under policy", action: "Reprocess" },
    { sn: 8, date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "5 days", hmo: "ALLY HEALTH CARE", reason: "Service not covered under policy", action: "Reprocessed" },
    { sn: 9, date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "7 days", hmo: "VENUS MEDICARE LIMITED", reason: "Service not covered under policy", action: "Reprocessed" },
    { sn: 10, date: "12 Dec 2024", enrolleeId: "13/O/W7EZ7O", daysOpened: "7 days", hmo: "SONGHAI", reason: "Service not covered under policy", action: "Reprocessed" },
    // Add more mock data as needed for pagination
  ];

  const totalPages = Math.ceil(mockDenials.length / pageSize);
  const paginatedDenials = mockDenials.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleReprocess = (denial: Denial) => {
    // Implement reprocess logic here
    alert(`Reprocess denial for ${denial.enrolleeId}`);
  };

  return (
    <div className=" py-4 px-5 border-[1px] border-gray-300 rounded-xl">
      <DenialsSummaryCards
        totalAmount="₦21.4m"
        unresolved={23}
        resolved={321}
        avgDayOpen={4}
      />
      <DenialsFilters
        search={filters.search}
        hmo={filters.hmo}
        status={filters.status}
        dateRange={filters.dateRange}
        hmoOptions={hmoOptions}
        statusOptions={statusOptions}
        onChange={setFilters}
      />
      <DenialsTable denials={paginatedDenials} onReprocess={handleReprocess} />
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 