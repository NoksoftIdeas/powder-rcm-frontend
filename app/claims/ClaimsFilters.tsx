import React from "react";

export interface ClaimsFilterState {
  search: string;
  hmo: string;
  minAmount: string;
  maxAmount: string;
  status: string;
  date: string;
}

interface ClaimsFiltersProps {
  filters: ClaimsFilterState;
  onChange: (filters: ClaimsFilterState) => void;
}

export default function ClaimsFilters({ filters, onChange }: ClaimsFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Patient ID/Name"
        className="border border-gray-300 rounded px-1 py-1 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={filters.search}
        onChange={e => onChange({ ...filters, search: e.target.value })}
      />

      <select
        className="border border-gray-300 rounded px-2 py-1 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={filters.hmo}
        onChange={e => onChange({ ...filters, hmo: e.target.value })}
      >
        <option value="">All HMOs</option>
        <option value="Ally Healthcare">Ally Healthcare</option>
        <option value="Mediplus">Mediplus</option>
        <option value="Hygeia">Hygeia</option>
      </select>

      <div className="flex items-center gap-1">
        <span className="text-gray-400 text-xs">-</span>
        <input
          type="text"
          min={0}
          placeholder="#0-#99999999"
          className="border border-gray-300 rounded px-3 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={filters.maxAmount}
          onChange={e => onChange({ ...filters, maxAmount: e.target.value })}
        />
      </div>


      <select
        className="border border-gray-300 rounded PX-3 py-1 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={filters.status}
        onChange={e => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">Any status</option>
        <option value="Open">Open</option>
        <option value="Resolved">Resolved</option>
      </select>


      <input
        type="text"
        placeholder="Date range             🗓"
        className="border border-gray-300 rounded px-2 py-1 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={filters.date}
        onChange={e => onChange({ ...filters, date: e.target.value })}
        onFocus={e => (e.target.type = 'date')}
        onBlur={e => (e.target.type = 'text')}
      />
    </div>
  );
}
