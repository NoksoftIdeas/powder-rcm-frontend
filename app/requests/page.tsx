"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Pagination from "@/app/components/ui/Pagination";

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
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all"
  );
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
    { value: "Overdue", label: "Overdue" },
  ];

  // Calculate overdue count
  const overdueCount = requests.filter((r) => {
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

  // Paginate the filtered requests
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-4 border-[1px] border-gray-200 rounded-xl">
      <div className=" rounded-lg border-b border-gray-200 mb-6 px-4 pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {overdueCount > 0 && (
            <div className="text-sm font-semibold text-[#FF2E3B]">
              {overdueCount} Overdue
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <div className="relative flex-1 sm:flex-initial sm:w-48">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none "
                placeholder="Patient ID/Name"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>

            <div className="relative flex-1 sm:flex-initial sm:w-40">
              <select
                className="appearance-none block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none "
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

            <div className="relative flex-1 sm:flex-initial sm:w-40">
              <select
                className="appearance-none block w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none "
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
            {paginatedRequests.map((request: Request, index: number) => (
              <tr
                key={request.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#475467]">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#475467]">
                  {new Date(request.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828]">
                  <a
                    href={`/pa-code?firstName=${encodeURIComponent(request.firstName)}&lastName=${encodeURIComponent(request.lastName)}&hmo=${encodeURIComponent(request.hmo)}&requestedBy=${encodeURIComponent(request.requestedBy)}&requestId=${encodeURIComponent(request.id)}&date=${encodeURIComponent(request.date)}`}
                    className="hover:underline"
                  >
                    {request.firstName}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#101828]">
                  <a
                    href={`/pa-code?firstName=${encodeURIComponent(request.firstName)}&lastName=${encodeURIComponent(request.lastName)}&hmo=${encodeURIComponent(request.hmo)}&requestedBy=${encodeURIComponent(request.requestedBy)}&requestId=${encodeURIComponent(request.id)}&date=${encodeURIComponent(request.date)}`}
                    className="hover:underline"
                  >
                    {request.lastName}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#979797]">
                  {request.hmo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#979797]">
                  {request.requestedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={
                      request.status === "Process"
                        ? `/pa-code?firstName=${encodeURIComponent(request.firstName)}&lastName=${encodeURIComponent(request.lastName)}&hmo=${encodeURIComponent(request.hmo)}&requestedBy=${encodeURIComponent(request.requestedBy)}&requestId=${encodeURIComponent(request.id)}&date=${encodeURIComponent(request.date)}`
                        : "#"
                    }
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === "Process"
                        ? "text-[#027FA3] hover:underline"
                        : "text-[#979797]"
                    }`}
                  >
                    {request.status}
                  </a>
                </td>
              </tr>
            ))}
            {paginatedRequests.length === 0 && (
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
      </div>
      <div className="px-6 py-4">
        <Pagination
          totalItems={filteredRequests.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
