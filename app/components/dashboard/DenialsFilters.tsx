"use client";

import React from "react";

interface DenialsFiltersProps {
  search: string;
  hmo: string;
  status: string;
  startDate: string;
  endDate: string;
  hmoOptions: string[];
  statusOptions: string[];
  onChange: (filters: {
    search: string;
    hmo: string;
    status: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export default function DenialsFilters({
  search,
  hmo,
  status,
  startDate,
  endDate,
  hmoOptions,
  statusOptions,
  onChange,
}: DenialsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6 ml-4 items-center">
      <input
        type="text"
        placeholder="Search denials"
        className="border-[1px] text-[#667085] border-gray-300 rounded-xl px-4 py-2 w-full md:w-64 text-sm focus:outline-none"
        value={search}
        onChange={(e) =>
          onChange({ search: e.target.value, hmo, status, startDate, endDate })
        }
      />
      <select
        className="border-[1px] text-[#667085] border-gray-300 rounded-xl px-4 py-2 text-sm"
        value={hmo}
        onChange={(e) =>
          onChange({ search, hmo: e.target.value, status, startDate, endDate })
        }
      >
        <option value="">All HMOs</option>
        {hmoOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <select
        className="border-[1px]  text-[#667085] border-gray-300 rounded-xl px-4 py-2 text-sm"
        value={status}
        onChange={(e) =>
          onChange({ search, hmo, status: e.target.value, startDate, endDate })
        }
      >
        <option value="">Any status</option>
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Date Range      📅"
          className="border-[1px] text-[#667085] border-gray-300 rounded-xl px-4 py-2 text-sm w-full md:w-40 focus:outline-none"
          value={startDate}
          onChange={(e) =>
            onChange({
              search,
              hmo,
              status,
              startDate: e.target.value,
              endDate,
            })
          }
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
      </div>
    </div>
  );
}
