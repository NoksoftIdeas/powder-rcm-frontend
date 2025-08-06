import { Search } from "lucide-react";
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

export default function ClaimsFilters({
  filters,
  onChange,
}: ClaimsFiltersProps) {
  return (
    <div className="rounded-lg  flex flex-wrap gap-[8px] items-center">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Patient ID/Name"
        className="border-[1px] text-[#667085] border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-48 focus:outline-none "
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />

      <select
        className="border-[1px] text-[#667085] border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-40 focus:outline-none "
        value={filters.hmo}
        onChange={(e) => onChange({ ...filters, hmo: e.target.value })}
      >
        <option value="">All HMOs</option>
        <option value="Ally Healthcare">Ally Healthcare</option>
        <option value="Mediplus">Mediplus</option>
        <option value="Hygeia">Hygeia</option>
      </select>

      <div className="flex items-center gap-1">
        <input
          type="text"
          min={0}
          placeholder="#0-#99999999"
          className="border-[1px] text-[#667085] border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-24 focus:outline-none "
          value={filters.maxAmount}
          onChange={(e) => onChange({ ...filters, maxAmount: e.target.value })}
        />
      </div>

      <select
        className="border-[1px] text-[#667085] border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-36 focus:outline-none  "
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">Any status</option>
        <option value="Open">Open</option>
        <option value="Resolved">Resolved</option>
      </select>

      <input
        type="text"
        placeholder="Date range           📅"
        className="border-[1px] text-[#667085] border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-40 focus:outline-none "
        value={filters.date}
        onChange={(e) => onChange({ ...filters, date: e.target.value })}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </div>
  );
}
