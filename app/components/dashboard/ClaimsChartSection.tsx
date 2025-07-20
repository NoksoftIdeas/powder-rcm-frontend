"use client";

import React, { useState } from "react";

const chartData = [
  { label: "Jul", value: 12000 },
  { label: "Aug", value: 32000, highlight: true, tooltip: "Aug, 23: 1,390" },
  { label: "Sep", value: 34000 },
  { label: "Oct", value: 22000 },
  { label: "Nov", value: 14000 },
  { label: "Dec", value: 14000 },
  { label: "Jan", value: 19000 },
  { label: "Feb", value: 23000 },
  { label: "Mar", value: 31000 },
  { label: "Apr", value: 26000 },
  { label: "May", value: 17000 },
  { label: "Jun", value: 25000 },
];

export default function ClaimsChartSection() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-4 sm:p-6 mt-2 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-500 font-semibold text-lg">Claims by Period</span>
          <select className="ml-2 bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm text-gray-700">
            <option>This Month</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-2xl font-bold text-gray-900">4,556</span>
          <span className="text-blue-500 font-semibold text-sm">+5.2%</span>
        </div>
        {/* Area Chart */}
        <div className="relative h-48 w-full">
          <svg viewBox="0 0 480 192" className="absolute left-0 top-0 w-full h-full">
            
            <polyline
              fill="#06b6d4"
              fillOpacity="0.18"
              stroke="#06b6d4"
              strokeWidth="1"
              points="0,160 40,80 80,70 120,110 160,90 200,160 240,140 280,120 320,150 360,120 400,140 440,100 480,160"
            />
            {chartData.map((d, i) => (
              <circle
                key={i}
                cx={40 * i}
                cy={160 - d.value / 250}
                r={hoverIdx === i || d.highlight ? 7 : 5}
                fill={d.highlight ? "#06b6d4" : "#bae6fd"}
                stroke="#06b6d4"
                strokeWidth={d.highlight ? 3 : 2}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              />
            ))}
            {/* Tooltip */}
            {hoverIdx !== null && (
              <g>
                <rect x={40 * hoverIdx - 30} y={40} width="60" height="32" rx="8" fill="#fff" stroke="#06b6d4" />
                <text x={40 * hoverIdx} y={60} textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="13">
                  {chartData[hoverIdx].tooltip || `${chartData[hoverIdx].label}, 23: ${chartData[hoverIdx].value.toLocaleString()}`}
                </text>
              </g>
            )}
          </svg>
          {/* X Axis Labels */}
          <div className="absolute bottom-0 left-0 w-full flex space-x-6  ml-20 text-xs text-gray-400 px-2">
            {chartData.map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
          {/* Y Axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400">
            <span>40k</span>
            <span>30k</span>
            <span>20k</span>
            <span>10k</span>
            <span>0</span>
          </div>
        </div>
      </div>
      {/* Mini summary card */}
      <div className="w-full max-w-xs lg:w-48 bg-cyan-50 rounded-xl flex flex-col items-center justify-center p-4 shadow-sm border-[1px] border-gray-200 h-56 self-center mt-6 lg:mt-0">
        <span className="text-gray-600 text-sm font-semibold mb-2">Average Claims</span>
        <span className="text-3xl font-bold text-gray-900 mb-2">2,387</span>
        {/* Bar chart background */}
        <svg width="100" height="40" className="mt-2">
          <rect x="5" y="25" width="10" height="10" rx="3" fill="#bae6fd" />
          <rect x="20" y="10" width="10" height="25" rx="3" fill="#38bdf8" />
          <rect x="35" y="20" width="10" height="15" rx="3" fill="#bae6fd" />
          <rect x="50" y="5" width="10" height="30" rx="3" fill="#38bdf8" />
          <rect x="65" y="15" width="10" height="20" rx="3" fill="#bae6fd" />
          <rect x="80" y="20" width="10" height="15" rx="3" fill="#38bdf8" />

          
        </svg>
      </div>
    </div>
  );
}
