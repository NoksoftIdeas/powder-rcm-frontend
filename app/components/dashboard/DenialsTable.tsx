"use client";

import React from "react";

export interface Denial {
  sn: number;
  date: string;
  enrolleeId: string;
  daysOpened: string;
  hmo: string;
  reason: string;
  action: "Reprocess" | "Reprocessed";
  time?: string; // for time display in date column
}

interface DenialsTableProps {
  denials: Denial[];
  onReprocess: (denial: Denial) => void;
}

export default function DenialsTable({ denials, onReprocess }: DenialsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">S/N</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Enrollee ID</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Days opened</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">HMO</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Reason</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 ">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {denials.map((denial, idx) => (
            <tr key={denial.sn} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 text-sm whitespace-nowrap">{denial.sn}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">{denial.time ? denial.time : denial.date}</td>
              <td className="px-4 py-3 text-sm font-bold whitespace-nowrap">{denial.enrolleeId}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">{denial.daysOpened}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">{denial.hmo}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">{denial.reason}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap text-center">
                {denial.action === "Reprocess" ? (
                  <button
                    className="text-sky-600 font-semibold hover:underline"
                    onClick={() => onReprocess(denial)}
                  >
                    Reprocess
                  </button>
                ) : (
                  <span className="text-gray-400">Reprocessed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 