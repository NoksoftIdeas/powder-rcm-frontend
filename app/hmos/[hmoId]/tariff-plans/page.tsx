/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";

const initialTariffs = [
  { id: 1, service: "Consultation - Orthopaedic Doctor", category: "Service", cost: "₦30,000", status: "Approved" },
  { id: 2, service: "Consultation - Orthopaedic Doctor", category: "Drug", cost: "₦30,000", status: "Approved" },
  { id: 3, service: "Consultation - Orthopaedic Doctor", category: "Laboratory", cost: "₦30,000", status: "Approved" },
  { id: 4, service: "Consultation - Orthopaedic Doctor", category: "Drug", cost: "₦30,000", status: "Approved" },
  { id: 5, service: "Consultation - Orthopaedic Doctor", category: "Radiology", cost: "₦30,000", status: "Approved" },
  { id: 6, service: "Consultation - Orthopaedic Doctor", category: "Consultation", cost: "₦30,000", status: "Approved" },
  { id: 7, service: "Consultation - Orthopaedic Doctor", category: "Nursing", cost: "₦30,000", status: "Approved" },
];

export default function TariffPlansPage() {
  const [search, setSearch] = useState("");
  const [cost, setCost] = useState("");
  const [status, setStatus] = useState("Approved");
  const [modalOpen, setModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [tariffs, setTariffs] = useState(initialTariffs);

  const [pendingTariffs, setPendingTariffs] = useState([
    { name: "Admission - Private Room", cost: "₦60,000" },
    { name: "MRI Test", cost: "₦110,000" },
    { name: "Thyroid Test", cost: "₦35,500" },
    { name: "Stool Test", cost: "₦4,900" },
  ]);
  
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  return (
    <div className="py-4 px-5 border-[1px] border-gray-200 rounded-xl">
      <nav className="text-xs text-gray-400 mb-2 flex items-center gap-2">
        <span className="hover:underline cursor-pointer" onClick={() => router.push('/hmos')}>HMOs</span>
        <span>/</span>
        <span className="hover:underline cursor-pointer" onClick={() => router.push('/hmos/1')}>Reliance HMO</span>
        <span>/</span>
        <span className="text-gray-700 hover:underline cursor-pointer" onClick={() => setVerifyModalOpen(true)}>Tariff Plans</span>
      </nav>
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2563eb"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M8 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
        <h1 className="text-2xl font-bold text-gray-800">Reliance HMO</h1>
      </div>
      <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search for tariff"
          className="border rounded px-4 py-2 text-sm w-full md:w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2 text-sm w-full md:w-40"
          value={cost}
          onChange={e => setCost(e.target.value)}
        >
          <option value="">Min-Max</option>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status</span>
          <select
            className="border rounded px-4 py-2 text-sm w-full md:w-40"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <button
          className="ml-auto px-5 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-800 transition font-semibold whitespace-nowrap"
          onClick={() => setModalOpen(true)}
        >
          + Add Item
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Services</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {initialTariffs.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.service}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cost}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.status === "Approved" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right relative">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#64748b"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                  </button>
                  {menuOpen === item.id && (
                    <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => { setEditModalOpen(true); setActiveRow(item.id); setMenuOpen(null); }}
                      >
                        <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#38bdf8"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11-11a2.828 2.828 0 00-4-4L5 17v4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Edit</span>
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => { setDeleteModalOpen(true); setActiveRow(item.id); setMenuOpen(null); }}
                      >
                        <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f87171"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Delete</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 rounded-md border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1.5 rounded-md font-semibold text-sm bg-gray-300 text-white shadow">1</button>
          <button className="px-3 py-1.5 rounded-md font-semibold text-sm bg-white text-gray-700 hover:bg-gray-100">2</button>
          <button className="px-3 py-1.5 rounded-md font-semibold text-sm bg-white text-gray-700 hover:bg-gray-100">3</button>
        </div>
        <button className="px-4 py-2 rounded-md border text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
      </div>
      {modalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={() => setModalOpen(false)}>
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={() => setModalOpen(false)}
          aria-label="Close"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-1">Add Item</h2>
        <p className="text-gray-500 text-sm mb-6">Add new items to the tariff plan</p>
        <p className="text-xs text-gray-400 mb-4">Tariff for Red Diamond</p>
        <form className="flex flex-col gap-4 flex-1 overflow-y-auto" onSubmit={e => { e.preventDefault(); setModalOpen(false); setVerifyModalOpen(true); }}>
          {[0, 1].map((idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 mb-2">
              <div className="mb-2 text-xs font-semibold text-gray-500">{idx + 1}. Name</div>
              <input
                type="text"
                className="w-full rounded-md border px-4 py-2 mb-2 border-gray-300 focus:border-cyan-500"
                placeholder="Diamond - Corporate"
              />
              <label className="block text-sm font-medium mb-1">Service Category</label>
              <select className="w-full rounded-md border px-4 py-2 mb-2 border-gray-300 focus:border-cyan-500">
                <option>Pick one</option>
                <option>Consultation</option>
                <option>Service</option>
                <option>Drug</option>
                <option>Laboratory</option>
                <option>Radiology</option>
                <option>Nursing</option>
              </select>
              <label className="block text-sm font-medium mb-1">Cost</label>
              <input
                type="text"
                className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500"
                placeholder="Diamond - Corporate 0"
              />
            </div>
          ))}
          <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-2xl text-gray-500 hover:bg-gray-100 mb-2">
            +
          </button>
          <div className="text-xs text-gray-500 mt-4 mb-2">
            By submitting this form, I confirm that the information provided is accurate and true. I understand that providing false information may result in legal consequences and termination of services. I agree to the <a href="/terms" className="underline">Terms and Conditions</a>.
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 transition"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
  {verifyModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={() => setVerifyModalOpen(false)}>
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-1">Verify Tariff</h2>
        <p className="text-gray-500 text-sm mb-6">Confirm the new updates to the tariff plan</p>
        <div className="flex flex-col gap-4 mb-6">
          {pendingTariffs.map((item, idx) => (
            <div key={idx} className="border-b pb-2">
              <div className="font-semibold text-gray-800">{item.name}</div>
              <div className="text-gray-700">{item.cost}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-4 mb-2">
          By submitting this form, I confirm that the information provided is accurate and true. I understand that providing false information may result in legal consequences and termination of services. I agree to the <a href="/terms" className="underline">Terms and Conditions</a>.
        </div>
        <div className="flex gap-2 mt-6">
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
            onClick={() => setVerifyModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 transition"
            onClick={() => setVerifyModalOpen(false)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={() => setEditModalOpen(false)}>
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setEditModalOpen(false)}
              aria-label="Close"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-1">Edit Item</h2>
            <form className="flex flex-col gap-4 flex-1 overflow-y-auto mt-6">
              <label className="block text-sm font-medium mb-1">Service</label>
              <input type="text" className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500" placeholder="Orthopaedic Doctor" />
              <label className="block text-sm font-medium mb-1">Service Type</label>
              <select className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500">
                <option>Consultation</option>
                <option>Service</option>
                <option>Drug</option>
                <option>Laboratory</option>
                <option>Radiology</option>
                <option>Nursing</option>
              </select>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input type="text" className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500" placeholder="N 20,500" />
              <div className="text-xs text-gray-500 mt-4 mb-2">
                By submitting this form, I confirm that the information provided is accurate and true. I understand that providing false information may result in legal consequences and termination of services. I agree to the <a href="/terms" className="underline">Terms and Conditions</a>.
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={() => setDeleteModalOpen(false)}>
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col justify-center"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Delete Item</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex gap-2 mt-6">
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                onClick={() => setDeleteModalOpen(false)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 