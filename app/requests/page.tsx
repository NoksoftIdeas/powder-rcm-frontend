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

  const hmos = [...new Set(requests.map((request) => request.hmo))];

  const filteredRequests = requests.filter((request) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      request.firstName.toLowerCase().includes(searchLower) ||
      request.lastName.toLowerCase().includes(searchLower) ||
      request.id.toLowerCase().includes(searchLower);

    const matchesHmo = hmoFilter === "all" || request.hmo === hmoFilter;
    
    // Handle status filter including Overdue
    let matchesStatus = true;
    if (statusFilter !== "all") {
      if (statusFilter === "Overdue") {
        // Example: Overdue if processing for more than 3 days
        const requestDate = new Date(request.date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - requestDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        matchesStatus = request.status === "Processed" && diffDays > 3;
      } else {
        matchesStatus = request.status === statusFilter;
      }
    }

    // Handle date filter
    let matchesDate = true;
    if (selectedDate) {
      const requestDate = new Date(request.date);
      requestDate.setHours(0, 0, 0, 0);
      const filterDate = new Date(selectedDate);
      filterDate.setHours(0, 0, 0, 0);
      matchesDate = requestDate.toDateString() === filterDate.toDateString();
    }

    return matchesSearch && matchesHmo && matchesStatus && matchesDate;
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
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="container mx-auto px-4 py-4 border-[1px] border-gray-200 rounded-xl">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-4">
               {/* Overdue counter */}
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs font-semibold leading-none text-white bg-red-500 rounded-full">
                  {requests.filter(r => r.status === 'Overdue').length}
                </span>
                <span className="text-sm font-medium text-red-500">Overdue</span>
              </div>
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by name/ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
             
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="w-full md:w-40">
                <select
                  className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={hmoFilter}
                  onChange={(e) => setHmoFilter(e.target.value)}
                >
                  <option value="all">All HMOs</option>
                  {hmos.map((hmo) => (
                    <option key={hmo} value={hmo}>
                      {hmo}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-full md:w-40">
                <select
                  className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as RequestStatus | "all" | "Overdue")
                  }
                >
                  <option value="all">All Statuses</option>
                  <option value="Process">Process</option>
                  <option value="Processed">Processed</option>
                </select>
              </div>
              
              <div className="w-full md:w-40">
                <input
                  type="date"
                  className="block w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
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
                >
                
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((request, index) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:text-blue-800">
                    <a href={`/pa-code?search=${encodeURIComponent(request.firstName)}+${encodeURIComponent(request.lastName)}`} className="hover:underline">
                      {request.firstName}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:text-blue-800">
                    <a href={`/pa-code?search=${encodeURIComponent(request.firstName)}+${encodeURIComponent(request.lastName)}`} className="hover:underline">
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
                      href={request.status === 'Process' ? `/pa-code?search=${encodeURIComponent(request.firstName)}+${encodeURIComponent(request.lastName)}` : '#'}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Process' 
                          ? 'text-blue-600 hover:text-blue-800 hover:underline' 
                          : 'text-gray-500'
                      }`}
                    >
                      {request.status}
                    </a>
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
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
            <div className="flex justify-center items-center py-4 gap-2">
              <button
                className="px-4 py-2 rounded-xl border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex gap-1">
                {pages.map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl border ${
                      page === currentPage
                        ? "bg-gray-300 text-white shadow"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                className="px-4 py-2 rounded-xl border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
  );
}
