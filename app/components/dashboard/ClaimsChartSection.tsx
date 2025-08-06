"use client";

import React, { useState } from "react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Line,
  ComposedChart,
  Legend,
  BarChart,
  Tooltip,
  LineChart,
} from "recharts";
import { ChevronDown, ArrowUp } from "lucide-react";

type TooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    payload?: any;
  }>;
  label?: string;
};

type ChartData = {
  month: string;
  claims: number;
  average: number;
};

const chartData: ChartData[] = [
  { month: "Jul", claims: 12000, average: 10500 },
  { month: "Aug", claims: 32000, average: 28500 },
  { month: "Sep", claims: 34000, average: 29500 },
  { month: "Oct", claims: 22000, average: 24000 },
  { month: "Nov", claims: 14000, average: 18000 },
  { month: "Dec", claims: 14000, average: 16000 },
  { month: "Jan", claims: 19000, average: 21000 },
  { month: "Feb", claims: 23000, average: 25000 },
  { month: "Mar", claims: 31000, average: 28000 },
  { month: "Apr", claims: 26000, average: 24000 },
  { month: "May", claims: 17000, average: 21000 },
  { month: "Jun", claims: 25000, average: 23000 },
];

// Main Chart Tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#212123] p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
        <p className="font-medium mb-1 text-[#868686]">{label || data.month}</p>
        <p className="text-[#FCFCFC]">
          {/* <span className="font-medium">Claims: </span> */}
          {data.claims.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Mini Chart Card Component
const MiniChartCard = ({ avgClaims }: { avgClaims: number }) => {
  // const data = [
  //   { name: "3", value: 1800 },
  //   { name: "4", value: 2200 },
  //   { name: "5", value: 2100 },
  //   { name: "6", value: 2500 },
  //   { name: "7", value: 2300 },
  //   { name: "8", value: 2600 },
  //   { name: "9", value: 2400 },
  // ];
  const miniChartData = [
    { name: "3", value: 1800 },
    { name: "4", value: 800 },
    { name: "5", value: 2000 },
    { name: "6", value: 1500 },
    { name: "7", value: 2300 },
    { name: "8", value: 1750 },
    { name: "9", value: 2200 },
  ];

  // Mini chart tooltip
  const MiniTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded text-xs shadow-sm">
          <p>Value: {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" bg-[#027FA30F] rounded-xl p-4 flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center mb-4 pt-2">
        <p className="text-sm text-gray-500 mb-4">Average Claims</p>
        <h2 className="text-1xl font-bold text-gray-800">2,387</h2>
      </div>

      <ResponsiveContainer width="100%" height={60}>
        <BarChart data={miniChartData} barSize={10}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#027FA34D" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#027FA300" stopOpacity={0.5} />
            </linearGradient>
          </defs>

          <Tooltip content={<MiniTooltip />} />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={40}>
        <AreaChart data={miniChartData}>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563EB"
            strokeWidth={2}
            fill="url(#colorFade)"
            dot={false}
          />
          <defs>
            <linearGradient id="colorFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#027FA34D" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#027FA34D" stopOpacity={0} />
            </linearGradient>
          </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 10,}} // faded gray text for 3–9
              />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Card component with shadow and rounded corners
const Card = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={` ${className}`} {...props}>
    {children}
  </div>
);

// Chart Header Component
const ChartHeader = ({
  timeRange,
  onTimeRangeChange,
}: {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center space-x-3 mb-6 text-[#7A7A7A]">
    <h3 className="text-lg  text-[#7A7A7A] mb-2 sm:mb-0">Claims by Period</h3>
    <div className="relative">
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm focus:outline-none"
      >
        <option value="6m">Last 6 Months</option>
        <option value="12m">Last 12 Months</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  </div>
);

// Stats Summary Component
const StatsSummary = ({
  totalClaims,
  trend,
}: {
  totalClaims: number;
  trend: number;
}) => (
  <div className="mb-6 flex flex-row space-x-3">
    <p className="text-3xl font-bold">{totalClaims.toLocaleString()}</p>
    <div className="flex items-center text-sm text-[#027FA3] mt-1">
      <ArrowUp className="h-4 w-4 mr-1 bg-[#89dff7] rounded-full" />
      <span>{Math.abs(trend).toFixed(1)}% </span>
    </div>
  </div>
);

// Custom select component
const Select = ({ value, onChange, children, className = "" }: any) => (
  <div className="relative">
    <select
      className={`appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none  ${className}`}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

// Format number with K suffix
const formatNumber = (num: number) => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

export default function ClaimsChartSection() {
  const [timeRange, setTimeRange] = useState("12m");

  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    return timeRange === "6m" ? chartData.slice(-6) : chartData;
  }, [timeRange]);

  const totalClaims = filteredData.reduce((sum, item) => sum + item.claims, 0);
  const avgClaims = Math.round(
    filteredData.reduce((sum, item) => sum + item.average, 0) /
      filteredData.length
  );
  const trend = 5.2; // Static trend value for the design

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 bg-[#fff] rounded-xl border-[1px] border-gray-200 p-4 relative ">
      {/* Main Chart Section */}
      <div className="lg:col-span-3 ">
        <Card className="p-6">
          <ChartHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

          <StatsSummary totalClaims={totalClaims} trend={trend} />

          <div className="h-60 ">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#027FA380" stopOpacity={0.9} />
                    <stop
                      offset="95%"
                      stopColor="#027FA300"
                      stopOpacity={0.06}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#979797"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 15 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 15 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                  domain={[0, 40000]}
                  ticks={[0, 10000, 20000, 30000, 40000]}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="claims"
                  stroke="#027FA3"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClaims)"
                  activeDot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      {/* Mini Chart Card */}
      <div className="lg:col-span-1  absolute bottom-14 right-16 w-[20%]">
        <MiniChartCard avgClaims={avgClaims} />
      </div>
    </div>
  );
}
