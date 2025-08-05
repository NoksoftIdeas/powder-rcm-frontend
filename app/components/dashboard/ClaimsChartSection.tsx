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
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg text-sm">
        <p className="font-medium mb-1">{label || data.month}</p>
        <p className="text-gray-600">
          <span className="font-medium">Claims: </span>
          {data.claims.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Mini Chart Card Component
const MiniChartCard = ({ avgClaims }: { avgClaims: number }) => {
  const data = [
    { name: "3", value: 1800 },
    { name: "4", value: 2200 },
    { name: "5", value: 2100 },
    { name: "6", value: 2500 },
    { name: "7", value: 2300 },
    { name: "8", value: 2600 },
    { name: "9", value: 2400 },
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
    <div className="bg-blue-50 rounded-lg p-4 h-full flex flex-col">
      <div className="mb-4">
        <p className="text-sm text-gray-500">Average Claims</p>
        <p className="text-xl font-bold">{avgClaims.toLocaleString()}</p>
      </div>
      <div className="mt-auto h-16 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <Bar
              dataKey="value"
              fill="#A0DFFF"
              radius={[4, 4, 0, 0]}
              barSize={8}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickMargin={4}
            />
            <YAxis hide={true} domain={[0, 3000]} />
            <RechartsTooltip content={<MiniTooltip />} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Card component with shadow and rounded corners
const Card = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`bg-white rounded-lg shadow-sm p-4 ${className}`} {...props}>
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
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">
      Claims by Period
    </h3>
    <div className="relative">
      <select
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1.5 pr-8 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="6m">Last 6 months</option>
        <option value="12m">Last 12 months</option>
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
  <div className="mb-6">
    <p className="text-3xl font-bold">{totalClaims.toLocaleString()}</p>
    <div className="flex items-center text-sm text-blue-600 mt-1">
      <ArrowUp className="h-4 w-4 mr-1" />
      <span>{Math.abs(trend).toFixed(1)}% from last period</span>
    </div>
  </div>
);

// Custom select component
const Select = ({ value, onChange, children, className = "" }: any) => (
  <div className="relative">
    <select
      className={`appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Chart Section */}
      <div className="lg:col-span-3">
        <Card className="p-6">
          <ChartHeader timeRange={timeRange} onTimeRangeChange={setTimeRange} />

          <StatsSummary totalClaims={totalClaims} trend={trend} />

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                  domain={[0, 40000]}
                  ticks={[0, 10000, 20000, 30000, 40000]}
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="claims"
                  stroke="#3b82f6"
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
      <div className="lg:col-span-1">
        <MiniChartCard avgClaims={avgClaims} />
      </div>
    </div>
  );
}
