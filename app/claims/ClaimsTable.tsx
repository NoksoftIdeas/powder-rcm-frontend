import React from "react";

export interface Claim {
  date: string;
  patientId: string;
  patientName: string;
  enrolleeId: string;
  codes: number;
  totalCost: string;
  status: "Open" | "Resolved";
  hmo?: string;
  lineItems?: Array<{
    code: string;
    items: Array<{ sn: number; desc: string; price: string }>;
  }>;
}

export const mockClaims: Claim[] = [
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/W7EZ7O",
    patientName: "Muhammad Sahab",
    enrolleeId: "13/O/W7EZ7O",
    codes: 3,
    totalCost: "₦50,000",
    status: "Open",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  {
    date: "12 Dec 2024",
    patientId: "13/O/J9R42N",
    patientName: "Chidinma Isaac",
    enrolleeId: "13/O/J9R42N",
    codes: 2,
    totalCost: "₦50,000",
    status: "Resolved",
  },
  // ...more rows as needed
];

function StatusBadge({ status }: { status: Claim["status"] }) {
  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-semibold ${
        status === "Resolved"
          ? "bg-blue-50 text-blue-600"
          : "bg-gray-100 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}

interface ClaimsTableProps {
  onView: (claim: Claim) => void;
  claims?: Claim[];
}

export default function ClaimsTable({ onView, claims }: ClaimsTableProps) {
  const data = claims || mockClaims;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Date</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Patient ID</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Patient Name</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Enrollee ID</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">No. of Codes</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Total Cost</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Status</th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 capitalize">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {data.map((claim, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="px-4 py-3 text-sm whitespace-nowrap">{claim.date}</td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">{claim.patientId}</td>
            <td className="px-4 py-3 text-sm font-bold whitespace-nowrap">{claim.patientName}</td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">{claim.enrolleeId}</td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">{claim.codes}</td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">{claim.totalCost}</td>
            <td className="px-4 py-3 text-sm whitespace-nowrap"><StatusBadge status={claim.status} /></td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => onView(claim)}
                aria-label="View Claim"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#38bdf8">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  <path d="M2 12C4.5 7 12 7 12 7s7.5 0 10 5-7.5 5-10 5-7.5 0-10-5z" strokeWidth="2" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
