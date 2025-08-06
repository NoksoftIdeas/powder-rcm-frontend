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
          ? "bg-[#027FA31A] text-[#027FA3]"
          : "bg-gray-200 text-[#979797]"
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
    <table className="min-w-full divide-y divide-gray-200 border-t border-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Date
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Patient ID
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Patient Name
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Enrollee ID
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            No. of Codes
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Total Cost
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
            Status
          </th>
          <th className="px-4 py-3 text-left text-xs  text-[#475467] capitalize">
           
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {data.map((claim, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            <td className="px-4 py-3 text-sm text-[#475467] whitespace-nowrap">
              {claim.date}
            </td>
            <td className="px-4 py-3 text-sm text-[#475467] whitespace-nowrap">
              {claim.patientId}
            </td>
            <td className="px-4 py-3 text-sm text-[#101828] whitespace-nowrap">
              {claim.patientName}
            </td>
            <td className="px-4 py-3 text-sm text-[#475467] whitespace-nowrap">
              {claim.enrolleeId}
            </td>
            <td className="px-4 py-3 text-sm text-[#475467] whitespace-nowrap">
              {claim.codes}
            </td>
            <td className="px-4 py-3 text-sm text-[#475467] whitespace-nowrap">
              {claim.totalCost}
            </td>
            <td className="px-4 py-3 text-sm text-[#475467]  whitespace-nowrap">
              <StatusBadge status={claim.status} />
            </td>
            <td className="px-4 py-3 text-sm whitespace-nowrap">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => onView(claim)}
                aria-label="View Claim"
              >
                <img src="/icons/eye.png" alt="" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
