"use client";

import React, { useState } from "react";
import { Search, Filter, ChevronDown, Plus } from "lucide-react";

type RequestStatus = "Process" | "Processed" | "Overdue";

interface Request {
  id: string;
  firstName: string;
  lastName: string;
  hmo: string;
  date: string;
  status: RequestStatus;
  requestedBy: string;
}

export default function RequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hmoFilter, setHmoFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">("all");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API calls
  const requests: Request[] = [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      hmo: "Axa Mansard",
      date: "2023-06-20",
      status: "Processed",
      requestedBy: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      hmo: "Hygeia HMO",
      date: "2023-06-19",
      status: "Process",
      requestedBy: "Dr. James Wilson",
    },
    {
      id: "3",
      firstName: "Michael",
      lastName: "Johnson",
      hmo: "Avon HMO",
      date: "2023-06-18",
      status: "Processed",
      requestedBy: "Dr. Amina Yusuf",
    },
    {
      id: "4",
      firstName: "Sarah",
      lastName: "Williams",
      hmo: "Reliance HMO",
      date: "2023-06-17",
      status: "Process",
      requestedBy: "Dr. Tunde Ojo",
    },
    {
      id: "5",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "6",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "7",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "8",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "9",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "10",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "11",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "12",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
    {
      id: "13",
      firstName: "David",
      lastName: "Brown",
      hmo: "Redcare HMO",
      date: "2023-06-16",
      status: "Processed",
      requestedBy: "Dr. Ngozi Eze",
    },
  ];

  // Get unique HMOs for the filter dropdown
  const hmoOptions = [...new Set(requests.map((request) => request.hmo))];
  
  // Status options for the dropdown
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Process", label: "Process" },
    { value: "Processed", label: "Processed" },
    { value: "Overdue", label: "Overdue" }
  ];
  
  // Calculate overdue count
  const overdueCount = requests.filter(r => {
    const requestDate = new Date(r.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - requestDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return r.status === "Processed" && diffDays > 3;
  }).length;

  const filteredRequests = requests.filter((request) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        request.firstName.toLowerCase().includes(searchLower) ||
        request.lastName.toLowerCase().includes(searchLower) ||
        request.id.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // HMO filter
    if (hmoFilter !== "all" && request.hmo !== hmoFilter) {
      return false;
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "Overdue") {
        // Check if request is overdue (processed for more than 3 days)
        const requestDate = new Date(request.date);
        const today = new Date();
        const diffTime = today.getTime() - requestDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (!(request.status === "Processed" && diffDays > 3)) {
          return false;
        }
      } else if (request.status !== statusFilter) {
        return false;
      }
    }

    // Date filter
    if (selectedDate) {
      const requestDate = new Date(request.date);
      const filterDate = new Date(selectedDate);
      if (
        requestDate.getFullYear() !== filterDate.getFullYear() ||
        requestDate.getMonth() !== filterDate.getMonth() ||
        requestDate.getDate() !== filterDate.getDate()
      ) {
        return false;
      }
    }

    return true;
  });

  const getStatusBadgeClass = (status: RequestStatus) => {
    switch (status) {
      case "Processed":
        return "bg-green-100 text-green-800";
      case "Process":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedDenials = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-4 border-[1px] border-gray-200 rounded-xl">
      {/* Filter Bar */}
      <div className=" rounded-lg border-b border-gray-200 mb-6 px-4 pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Overdue Alert */}
          {overdueCount > 0 && (
            <div className="text-sm font-semibold text-red-600">
              {overdueCount} Overdue
            </div>
          )}
          
          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Patient ID/Name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>

            {/* HMO Dropdown */}
            <div className="relative flex-1 sm:flex-initial sm:w-40">
              <select
                className="appearance-none block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={hmoFilter}
                onChange={(e) => {
                  setHmoFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All HMOs</option>
                {hmoOptions.map((hmo) => (
                  <option key={hmo} value={hmo}>
                    {hmo}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative flex-1 sm:flex-initial sm:w-40">
              <select
                className="appearance-none block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as RequestStatus | "all");
                  setCurrentPage(1);
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Date Picker */}
            <div className="relative flex-1 sm:flex-initial sm:w-40">
              <input
                type="text"
                placeholder="Date range       📅"
                className="block w-full pl-4 pr-3 py-2 text-sm  border border-gray-300 rounded-md bg-white focus:outline-none"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
             
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                S/N
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                HMO
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              >
                Created By
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedDenials.map((request, index) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:text-blue-800">
                  <a
                    href={`/pa-code?search=${encodeURIComponent(
                      request.firstName
                    )}+${encodeURIComponent(request.lastName)}`}
                    className="hover:underline"
                  >
                    {request.firstName}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:text-blue-800">
                  <a
                    href={`/pa-code?search=${encodeURIComponent(
                      request.firstName
                    )}+${encodeURIComponent(request.lastName)}`}
                    className="hover:underline"
                  >
                    {request.lastName}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.hmo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.requestedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={
                      request.status === "Process"
                        ? `/pa-code?search=${encodeURIComponent(
                            request.firstName
                          )}+${encodeURIComponent(request.lastName)}`
                        : "#"
                    }
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === "Process"
                        ? "text-blue-600 hover:text-blue-800 hover:underline"
                        : "text-gray-500"
                    }`}
                  >
                    {request.status}
                  </a>
                </td>
              </tr>
            ))}
            {paginatedDenials.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No requests found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-4">
            {/* Showing X-Y of Z results */}
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, requests.length)} of{" "}
              {requests.length.toLocaleString()}
            </div>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {/* First page */}
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

              {/* Ellipsis after first page if needed */}
              {currentPage > 3 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              {/* Pages around current page */}
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
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}

              {/* Ellipsis before last page if needed */}
              {currentPage < totalPages - 2 && totalPages > 5 && (
                <span className="px-2 text-gray-400">...</span>
              )}

              {/* Last page */}
              {totalPages > 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage === totalPages
                      ? "bg-white text-gray-900 font-medium border border-gray-200"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <div className="">
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
