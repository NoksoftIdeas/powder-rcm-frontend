"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { withAuth } from "../components/auth/withAuth";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import AddHmoModal from "../components/modals/AddHmoModal";
import type { HMOFormData } from "../components/modals/AddHmoModal";

interface HMO {
  id: number;
  logo: string | null;
  name: string;
  plans: number;
  tariffUpdate: string;
  channels: string;
}

const initialHMOs: HMO[] = [
  {
    id: 1,
    logo: null,
    name: "Ally Healthcare",
    plans: 7,
    tariffUpdate: "24 hours ago",
    channels: "Email, SMS, Whatsapp",
  },
  {
    id: 2,
    logo: null,
    name: "Reliance HMO",
    plans: 4,
    tariffUpdate: "1 month ago",
    channels: "Web Portal, WhatsApp",
  },
  {
    id: 3,
    logo: null,
    name: "Hygeia HMO",
    plans: 1,
    tariffUpdate: "Set up tariff",
    channels: "Set up channels",
  },
  {
    id: 4,
    logo: null,
    name: "Aman HMO",
    plans: 4,
    tariffUpdate: "1 month ago",
    channels: "Email, WhatsApp",
  },
  {
    id: 5,
    logo: null,
    name: "Songhai Health Trust",
    plans: 4,
    tariffUpdate: "2 months ago",
    channels: "Email, SMS, Web Portal, WhatsApp",
  },
  {
    id: 6,
    logo: null,
    name: "Avon Healthcare",
    plans: 5,
    tariffUpdate: "1 month ago",
    channels: "Email",
  },
  {
    id: 7,
    logo: null,
    name: "ProHealth HMO",
    plans: 6,
    tariffUpdate: "2 months ago",
    channels: "SMS, Web Portal, WhatsApp",
  },
  {
    id: 8,
    logo: null,
    name: "AIICO Multishield",
    plans: 3,
    tariffUpdate: "2 days ago",
    channels: "Web Portal, WhatsApp",
  },
  {
    id: 9,
    logo: null,
    name: "GreenBay HMO",
    plans: 5,
    tariffUpdate: "2 months ago",
    channels: "Email, WhatsApp",
  },
  {
    id: 10,
    logo: null,
    name: "AXA Mansard",
    plans: 3,
    tariffUpdate: "1 month ago",
    channels: "Web Portal",
  },
];

const PAGE_SIZE = 10;

function WarningBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded font-semibold">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M6.93 4.26a10 10 0 0110.14 0M4.22 6.22a10 10 0 0115.56 0M2 12a10 10 0 0020 0M4.22 17.78a10 10 0 0115.56 0" /></svg>
      {children}
    </span>
  );
}

function HMOsPage() {
  const [hmos, setHmos] = useState<HMO[]>(initialHMOs);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const filtered = hmos.filter((hmo) =>
    hmo.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const handleAddHMO = (formData: Omit<HMOFormData, 'logo'> & { logo: string | null }) => {
    const newHMO: HMO = {
      id: hmos.length + 1,
      logo: formData.logo || '/Avatar.png', // Use default avatar if no logo provided
      name: formData.name,
      plans: 0,
      tariffUpdate: "Set up tariff",
      channels: "Set up channels",
    };
    
    setHmos([newHMO, ...hmos]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          You have <span className="font-extrabold">{hmos.length}</span> partner HMOs
        </h2>
        <div className="flex gap-1 w-full sm:w-auto">
          <input
            className="flex-1 max-w-xs px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 text-sm"
            placeholder="Search HMOs"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <button
            className="flex items-center gap-2 px-5 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-800 transition font-semibold whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusCircledIcon className="w-5 h-5" /> Add HMO
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow border border-gray-100  ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">HMO</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Plans</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tariff Update</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Channels</th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">No HMOs found.</td>
              </tr>
            )}
            {paginated.map((hmo) => (
              <tr key={hmo.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        className="h-full w-full object-cover"
                        src={hmo.logo || '/Avatar.png'}
                        alt={hmo.name}
                        width={32}
                        height={32}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/Avatar.png';
                        }}
                      />
                    </div>
                    <span className="font-semibold text-gray-800">{hmo.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{hmo.plans}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hmo.tariffUpdate === "Set up tariff" ? (
                    <WarningBadge>Set up tariff</WarningBadge>
                  ) : (
                    hmo.tariffUpdate
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {hmo.channels === "Set up channels" ? (
                    <WarningBadge>Set up channels</WarningBadge>
                  ) : (
                    hmo.channels
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/hmos/${hmo.id}/tariff-plans`}
                    className="text-cyan-700 font-semibold hover:underline mr-4"
                  >
                    Tariff Plans
                  </Link>
                  <Link
                    href={`/hmos/${hmo.id}/channels`}
                    className="text-cyan-700 font-semibold hover:underline mr-4"
                  >
                    Channels
                  </Link>
                  <span className="relative inline-block">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() => setMenuOpen(menuOpen === hmo.id ? null : hmo.id)}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#64748b"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                    </button>
                    {menuOpen === hmo.id && (
                      <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(null); /* Add edit logic here */ }}
                        >
                          <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#38bdf8"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11-11a2.828 2.828 0 00-4-4L5 17v4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Edit</span>
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => { setMenuOpen(null); /* Add delete logic here */ }}
                        >
                          <span className="inline-flex items-center gap-2"><svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f87171"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>Delete</span>
                        </button>
                      </div>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <AddHmoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHMO={handleAddHMO}
      />
    </div>
  );
}

export default withAuth(HMOsPage);
