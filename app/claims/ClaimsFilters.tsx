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
          className="py-[10px] text-sm border shadow-xs shadow-[#1018280D]  border-[#0000001A] rounded-[12px] bg-[#FFFFFF] placeholder-[#667085] pl-[35px] w-48 focus:outline-none "
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
        <span className="absolute left-3 top-2.5 text-[#667085]  ">
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
        className="py-[10px] text-sm border shadow-xs shadow-[#1018280D] px-[14px]  border-[#0000001A] rounded-[12px] bg-[#FFFFFF] text-[#667085] w-40 focus:outline-none "
        value={filters.hmo}
        onChange={(e) => onChange({ ...filters, hmo: e.target.value })}
      >
        <option value="">
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
          className="py-[10px] text-sm border shadow-xs shadow-[#1018280D] px-[14px] border-[#0000001A] rounded-[12px] bg-[#FFFFFF] placeholder-[#667085] w-28 focus:outline-none "
          value={filters.maxAmount}
          onChange={(e) => onChange({ ...filters, maxAmount: e.target.value })}
        />
      </div>

      <select
        className="py-[10px] text-sm border shadow-xs shadow-[#1018280D] px-[14px] border-[#0000001A] rounded-[12px] bg-[#FFFFFF] text-[#667085] w-36 focus:outline-none  "
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
        className="py-[10px] text-sm border shadow-xs shadow-[#1018280D]  border-[#0000001A] rounded-[12px] bg-[#FFFFFF] placeholder-[#667085] px-[14px] w-40 focus:outline-none "
        value={filters.date}
        onChange={(e) => onChange({ ...filters, date: e.target.value })}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
    </div>
  );
}
