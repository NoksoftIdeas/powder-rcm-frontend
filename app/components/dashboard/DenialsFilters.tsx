"use client";

import React from "react";

interface DenialsFiltersProps {
  search: string;
  hmo: string;
  status: string;
  dateRange: string;
  hmoOptions: string[];
  statusOptions: string[];
  onChange: (filters: {
    search: string;
    hmo: string;
    status: string;
    dateRange: string;
  }) => void;
}

export default function DenialsFilters({
  search,
  hmo,
  status,
  dateRange,
  hmoOptions,
  statusOptions,
  onChange,
}: DenialsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-6 items-center">
      <input
        type="text"
        placeholder="Search denials"
        className="border rounded px-4 py-2 w-full md:w-64 text-sm"
        value={search}
        onChange={e => onChange({ search: e.target.value, hmo, status, dateRange })}
      />
      <select
        className="border rounded px-4 py-2 text-sm"
        value={hmo}
        onChange={e => onChange({ search, hmo: e.target.value, status, dateRange })}
      >
        <option value="">All HMOs</option>
        {hmoOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <select
        className="border rounded px-4 py-2 text-sm"
        value={status}
        onChange={e => onChange({ search, hmo, status: e.target.value, dateRange })}
      >
        <option value="">Any status</option>
        {statusOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Date range"
        className="border rounded px-4 py-2 text-sm w-full md:w-40"
        value={dateRange}
        onChange={e => onChange({ search, hmo, status, dateRange: e.target.value })}
      />
      {/* Replace with a real date picker if needed */}
    </div>
  );
} 