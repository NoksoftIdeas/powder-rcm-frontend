/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  TooltipProps as RechartsTooltipProps
} from "recharts";
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

type ChartData = {
  label: string;
  claims: number;
  average: number;
};

const chartData: ChartData[] = [
  { label: "Jul", claims: 12000, average: 10500 },
  { label: "Aug", claims: 32000, average: 28500 },
  { label: "Sep", claims: 34000, average: 29500 },
  { label: "Oct", claims: 22000, average: 24000 },
  { label: "Nov", claims: 14000, average: 18000 },
  { label: "Dec", claims: 14000, average: 16000 },
  { label: "Jan", claims: 19000, average: 21000 },
  { label: "Feb", claims: 23000, average: 25000 },
  { label: "Mar", claims: 31000, average: 28000 },
  { label: "Apr", claims: 26000, average: 24000 },
  { label: "May", claims: 17000, average: 21000 },
  { label: "Jun", claims: 25000, average: 23000 },
];

// Custom Tooltip component for the charts
interface CustomTooltipProps extends RechartsTooltipProps<number, string> {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p 
            key={`tooltip-${index}`} 
            className="text-sm" 
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Simple Card component
const Card = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`bg-white rounded-lg border border-gray-200 shadow-sm p-4 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Simple CardHeader component
const CardHeader = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex justify-between items-center mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Simple CardTitle component
const CardTitle = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

// Simple CardContent component
const CardContent = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Simple Select component
const Select = ({
  value,
  onChange,
  children,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={`h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
    value={value}
    onChange={onChange}
    {...props}
  >
    {children}
  </select>
);



export default function ClaimsChartSection() {
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState<'claims' | 'average'>('claims');

  const filteredData = timeRange === '6m' ? chartData.slice(-6) : chartData;
  
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };
  const totalClaims = filteredData.reduce((sum, item) => sum + item.claims, 0);
  const avgClaims = Math.round(totalClaims / filteredData.length);
  const trend = ((filteredData[filteredData.length - 1].claims - filteredData[0].claims) / filteredData[0].claims) * 100;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <CardTitle>Claims Overview</CardTitle>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="flex space-x-1 rounded-md bg-gray-100 p-1">
                <button
                  onClick={() => setActiveTab('claims')}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === 'claims' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Claims
                </button>
                <button
                  onClick={() => setActiveTab('average')}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeTab === 'average' 
                      ? 'bg-white shadow-sm text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Average
                </button>
              </div>
              <div className="w-48">
                <Select value={timeRange} onChange={handleTimeRangeChange}>
                  <option value="6m">Last 6 months</option>
                  <option value="12m">Last 12 months</option>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {/* <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{totalClaims.toLocaleString()}</p>
              <p className="text-sm text-gray-800">
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% from last period
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Avg. Claims</p>
              <p className="text-xl font-semibold">{avgClaims.toLocaleString()}</p>
            </div>
          </div> */}
          {activeTab === 'claims' ? (
            <Card>
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={filteredData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="label" 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="claims" 
                        name="Claims"
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                      data={filteredData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis 
                        dataKey="label" 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                      />
                      <YAxis 
                        tick={{ fill: '#6b7280' }}
                        axisLine={{ stroke: '#e5e7eb' }}
                        tickLine={{ stroke: '#e5e7eb' }}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="average" 
                        name="Average Claims"
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Claims
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClaims.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {trend >= 0 ? '+' : ''}{trend.toFixed(1)}% from last period
            </p>
          </CardContent>
        </Card> */}
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Claims
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgClaims.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Monthly average claims
            </p>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
