"use client";

import { useState } from "react";
import { withAuth } from "../components/auth/withAuth";
import Link from "next/link";
import Image from "next/image";
import AddHmoModal from "../components/modals/AddHmoModal";
import type { HMOFormData } from "../components/modals/AddHmoModal";
import { Pagination } from "../components/ui/Pagination";
import { Plus } from "lucide-react";

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
  {
    id: 11,
    logo: null,
    name: "AXA Mansard",
    plans: 3,
    tariffUpdate: "1 month ago",
    channels: "Web Portal",
  },
  {
    id: 12,
    logo: null,
    name: "AXA Mansard",
    plans: 3,
    tariffUpdate: "1 month ago",
    channels: "Web Portal",
  },
  {
    id: 13,
    logo: null,
    name: "AXA Mansard",
    plans: 3,
    tariffUpdate: "1 month ago",
    channels: "Web Portal",
  },
  {
    id: 14,
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
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-[#FF6058] text-xs rounded font-semibold">
             <Image src="/icons/warning.png" alt="warning-HMO" width={16} height={16} />
      {children}
    </span>
  );
}

function HMOsPage() {
  const [hmos, setHmos] = useState<HMO[]>(initialHMOs);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filtered = hmos.filter((hmo) =>
    hmo.name.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddHMO = (
    formData: Omit<HMOFormData, "logo"> & { logo: string | null }
  ) => {
    const newHMO: HMO = {
      id: hmos.length + 1,
      logo: formData.logo || "/Avatar.png", // Use default avatar if no logo provided
      name: formData.name,
      plans: 0,
      tariffUpdate: "Set up tariff",
      channels: "Set up channels",
    };

    setHmos([newHMO, ...hmos]);
    setIsModalOpen(false);
  };

  return (
    <div className="py-4 border-[1px] border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
        <h2 className="text-xl ml-4 sm:text-2xl font-bold text-[#344054]">
          You have <span className="font-extrabold">{hmos.length}</span> partner
          HMOs
        </h2>
        <div className="flex gap-1 w-full sm:w-auto">
          <input
            className="flex-1 max-w-xs border-[1px] text-[#667085] mr-5 border-gray-300 rounded-xl px-4 py-2 focus:outline-none  text-sm"
            placeholder="Search HMOs"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <button
            className="flex items-center gap-2 px-5 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-800 transition font-semibold whitespace-nowrap mr-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" /> Add HMO
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100  ">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-10 py-3 text-left text-xs  text-[#475467] uppercase">
                HMO
              </th>
              <th className="px-3 py-3 text-left text-xs  text-[#475467] uppercase">
                Plans
              </th>
              <th className="px-2 py-3 text-left text-xs  text-[#475467] uppercase">
                Tariff Update
              </th>
              <th className="px-5 py-3 text-left text-xs  text-[#475467] uppercase">
                Channels
              </th>
              <th className="px-5 py-3 text-left text-xs  text-[#475467] uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginated.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">
                  No HMOs found.
                </td>
              </tr>
            )}
            {paginated.map((hmo , idx) => (
              <tr key={hmo.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <div className="relative w-8 h-8">
                        <Image
                          src={hmo.logo || "/Avatar.png"}
                          alt={hmo.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "/Avatar.png";
                          }}
                        />
                      </div>
                    </div>
                    <span className=" text-[#101828]">
                      {hmo.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-[#475467] whitespace-nowrap">{hmo.plans}</td>
                <td className="px-3 text-[#475467] py-3 whitespace-nowrap">
                  {hmo.tariffUpdate === "Set up tariff" ? (
                    <WarningBadge>Set up tariff</WarningBadge>
                  ) : (
                    hmo.tariffUpdate
                  )}
                </td>
                <td className="px-6 text-[#475467] py-4 whitespace-nowrap">
                  {hmo.channels === "Set up channels" ? (
                    <WarningBadge>Set up channels</WarningBadge>
                  ) : (
                    hmo.channels
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/hmos/${hmo.id}/tariff-plans`}
                    className="text-[#027FA3] hover:underline mr-4"
                  >
                    Tariff Plans
                  </Link>
                  <Link
                    href={`/hmos/${hmo.id}/channels`}
                    className="text-[#027FA3]  hover:underline mr-4"
                  >
                    Channels
                  </Link>
                  <button className=" rounded hover:bg-gray-100">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4">
        <Pagination
          totalItems={filtered.length}
          itemsPerPage={PAGE_SIZE}
          currentPage={page}
          onPageChange={setPage}
        />
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
