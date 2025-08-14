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
    <div className="rounded-lg  flex flex-wrap gap-[8px] text-[#667085] font-normal items-center">
      <div className="relative flex-1 max-w-xs">
        <input
          type="text"
          placeholder="Patient ID/Name"
          className="border-[1px]  border-gray-300 bg-[#F8F8F8] rounded-[12px] pl-[35px] py-[10px] text-sm w-48 focus:outline-none "
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
        <span className="absolute left-3 top-2.5 text-[#B4B4B4]  ">
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="2" />
            <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <select
        className="border-[1px]  border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-40 focus:outline-none "
        value={filters.hmo}
        onChange={(e) => onChange({ ...filters, hmo: e.target.value })}
      >
        <option value="" className="text-[#667085]">
          All HMOs
        </option>
        <option value="Ally Healthcare">Ally Healthcare</option>
        <option value="Mediplus">Mediplus</option>
        <option value="Hygeia">Hygeia</option>
      </select>

      <div className="flex items-center  gap-1">
        <input
          type="text"
          min={0}
          placeholder="#0-#99999999"
          className="border-[1px]  border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-24 focus:outline-none "
          value={filters.maxAmount}
          onChange={(e) => onChange({ ...filters, maxAmount: e.target.value })}
        />
      </div>

      <select
        className="border-[1px]  border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-36 focus:outline-none  "
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="" className="text-[#667085]">
          Any status
        </option>
        <option value="Open">Open</option>
        <option value="Resolved">Resolved</option>
      </select>

      <input
        type="text"
        placeholder="Date range          📅"
        className="border-[1px]  border-gray-300 bg-[#F8F8F8] rounded-[12px] px-[14px] py-[10px] text-sm w-40 focus:outline-none "
        value={filters.date}
        onChange={(e) => onChange({ ...filters, date: e.target.value })}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </div>
  );
}
