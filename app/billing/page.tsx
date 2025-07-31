"use client";

import { useState } from 'react';
import { withAuth } from "../components/auth/withAuth";
import BillReviewModal from "../components/modals/BillDetailsModal";

const mockBillingData = [
  {
    id: 1,
    date: '12 Dec 2024',
    hmo: 'Reliance HMO',
    claims: 4871,
    total: '₦5,000,000',
    status: 'Unpaid',
  },
  {
    id: 2,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
  {
    id: 3,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
  {
    id: 4,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
  {
    id: 5,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },

   {
    id: 6,
    date: '12 Dec 2024',
    hmo: 'Reliance HMO',
    claims: 4871,
    total: '₦5,000,000',
    status: 'Unpaid',
  },

   {
    id: 7,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },

    {
    id: 8,
    date: '12 Dec 2024',
    hmo: 'Reliance HMO',
    claims: 4871,
    total: '₦5,000,000',
    status: 'Unpaid',
  },

    {
    id: 9,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
    {
    id: 10,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
    {
    id: 11,
    date: '12 Dec 2024',
    hmo: 'Ally Healthcare',
    claims: 2572,
    total: '₦2,500,000',
    status: 'Paid',
  },
  // ...more rows as needed
];

const mockBillDetails = {
  hmo: 'Ally Healthcare',
  logo: '/logo.png',
  date: '12 Dec 2024',
  billNo: 'ALTP/28/G49H',
  review: true,
  items: [
    {
      encounterDate: '12 Dec 2024',
      enrolleeId: '13/O/W7EZ7O',
      diagnosis: ['Malaria', 'Typhoid', 'Cold/Flu'],
      code: 'CGGEFI98398092HJE',
      services: [
        { name: 'Admission - Tier 3', cost: '₦75,000', type: 'service' },
        { name: 'MRI Test', cost: '₦110,500', type: 'service' },
        { name: 'Stool v1', cost: '₦6,500', type: 'service' },
      ],
      drugs: [],
      total: '₦305,000',
    },
    {
      encounterDate: '13 Dec 2024',
      enrolleeId: '13/O/W7EZ7O',
      diagnosis: ['Malaria'],
      code: 'CGGEFI98398092BTE',
      services: [
        { name: 'Malaria Test', cost: '₦5,000', type: 'service' },
      ],
      drugs: [
        { name: 'LynteMin Tablets X12', cost: '₦4,250', type: 'drug' },
      ],
      total: '₦9,250',
    },
  ],
  subtotal: '₦9,550,250',
  tax: '₦9,560',
  totalDue: '₦9,559,800',
  payTo: {
    account: '1234567890',
    bank: 'Zenith Bank Plc',
    hospital: 'Trust Charitos Hospital',
  },
  approvedBy: {
    name: 'John Doe',
    role: 'HMO Manager',
    date: '12 December 2024',
  },
};

type BillService = { name: string; cost: string; type: string };
type BillItem = {
  encounterDate: string;
  enrolleeId: string;
  diagnosis: string[];
  code: string;
  services: BillService[];
  drugs: BillService[];
  total: string;
};
type BillDetails = {
  hmo: string;
  logo: string;
  date: string;
  billNo: string;
  review: boolean;
  items: BillItem[];
  subtotal: string;
  tax: string;
  totalDue: string;
  payTo: { account: string; bank: string; hospital: string };
  approvedBy: { name: string; role: string; date: string };
};

// interface BillReviewModalProps {
//   bill: BillDetails | null;
//   open: boolean;
//   onClose: () => void;
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   onPrint: () => void;
//   onDownload: () => void;
//   pageNumber: string;
// }

function BillingPage() {
  const [filter, setFilter] = useState({
    search: '',
    hmo: '',
    amount: '',
    status: '',
    date: '',
  });
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null);
  const [billingData, setBillingData] = useState(mockBillingData);

  // Filter logic (mock, expand as needed)
  const filteredRecords = billingData.filter(record =>
    (filter.hmo === '' || record.hmo === filter.hmo) &&
    (filter.status === '' || record.status === filter.status) &&
    (filter.search === '' || record.hmo.toLowerCase().includes(filter.search.toLowerCase()))
  );
  const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRecords.length / pageSize);

  const handleMarkAsPaid = (id: number) => {
    setBillingData(data => data.map(bill => bill.id === id ? { ...bill, status: 'Paid' } : bill));
  };

  return (
    <div className=" py-4 px-5 border-[1px] border-gray-300 rounded-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-6 flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Bills due</span>
          <span className="text-2xl font-bold text-red-600">₦21.4m</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-6 flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Bills paid</span>
          <span className="text-2xl font-bold text-black">₦4.6m</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-6 flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Total number of bills</span>
          <span className="text-2xl font-bold text-black">17</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-[1px] border-gray-200 p-6 flex flex-col">
          <span className="text-gray-500 text-sm mb-2">Total amount of bills</span>
          <span className="text-2xl font-bold text-black">₦40.9m</span>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow border-[1px] border-gray-200 p-4 flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded px-4 py-2 text-sm w-full md:w-64"
          value={filter.search}
          onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
        />
        <select
          className="border rounded px-4 py-2 text-sm w-full md:w-40"
          value={filter.hmo}
          onChange={e => setFilter(f => ({ ...f, hmo: e.target.value }))}
        >
          <option value="">All HMOs</option>
          <option value="Reliance HMO">Reliance HMO</option>
          <option value="Ally Healthcare">Ally Healthcare</option>
        </select>
        <input
          type="text"
          placeholder="₦0 - ₦99999999"
          className="border rounded px-4 py-2 text-sm w-full md:w-40"
          value={filter.amount}
          onChange={e => setFilter(f => ({ ...f, amount: e.target.value }))}
        />
        <select
          className="border rounded px-4 py-2 text-sm w-full md:w-40"
          value={filter.status}
          onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
        >
          <option value="">Any status</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <input
          type="text"
          placeholder="Date range"
          className="border rounded px-4 py-2 text-sm w-full md:w-40"
          value={filter.date}
          onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow border-[1px] border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">HMO</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">No. of Claims</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Cost</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedRecords.map(record => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">{record.hmo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.claims}</td>
                <td className="px-6 py-4 whitespace-nowrap">{record.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${record.status === 'Paid' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{record.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {record.status === 'Paid' ? (
                    <button className="text-cyan-700 font-semibold hover:underline" onClick={() => { setSelectedBill(mockBillDetails as BillDetails); setModalOpen(true); }}>View</button>
                  ) : (
                    <>
                      <button className="text-cyan-700 font-semibold hover:underline mr-4" onClick={() => { setSelectedBill(mockBillDetails as BillDetails); setModalOpen(true); }}>Review</button>
                      {record.status !== 'Paid' && (
                        <button className="text-cyan-700 font-semibold hover:underline" onClick={() => handleMarkAsPaid(record.id)}>Mark As Paid</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 rounded-md border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              className={`px-3 py-1.5 rounded-md font-semibold text-sm ${
                page === idx + 1
                  ? "bg-gray-300 text-white shadow"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 rounded-md border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <BillReviewModal
        bill={selectedBill}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrint={() => {/* connect to backend print */}}
        onDownload={() => {/* connect to backend download */}}
        pageNumber={"1/28"}
      />
    </div>
  );
}

export default withAuth(BillingPage); 