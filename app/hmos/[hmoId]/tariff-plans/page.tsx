/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { EditTariffModal } from "./components/modals/EditTariffModal";
import { DeleteTariffModal } from "./components/modals/DeleteTariffModal";
import Pagination from "@/app/components/ui/Pagination";

const initialTariffs = [
  {
    id: 1,
    service: "Consultation - Orthopaedic Doctor",
    category: "Service",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 2,
    service: "Consultation - Orthopaedic Doctor",
    category: "Drug",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 3,
    service: "Consultation - Orthopaedic Doctor",
    category: "Laboratory",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 4,
    service: "Consultation - Orthopaedic Doctor",
    category: "Drug",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 5,
    service: "Consultation - Orthopaedic Doctor",
    category: "Radiology",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 6,
    service: "Consultation - Orthopaedic Doctor",
    category: "Consultation",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 7,
    service: "Consultation - Orthopaedic Doctor",
    category: "Nursing",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 8,
    service: "Consultation - Orthopaedic Doctor",
    category: "Nursing",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 9,
    service: "Consultation - Orthopaedic Doctor",
    category: "Nursing",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 10,
    service: "Consultation - Orthopaedic Doctor",
    category: "Nursing",
    cost: "₦30,000",
    status: "Approved",
  },
  {
    id: 11,
    service: "Consultation - Orthopaedic Doctor",
    category: "Nursing",
    cost: "₦30,000",
    status: "Approved",
  },
];

export default function TariffPlansPage() {
  const [search, setSearch] = useState("");
  const [costFilter, setCostFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [editingTariff, setEditingTariff] = useState<{
    id: number;
    service: string;
    category: string;
    cost: string;
    status: string;
  } | null>(null);
  const [deletingTariff, setDeletingTariff] = useState<{
    id: number;
    service: string;
  } | null>(null);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [tariffs, setTariffs] = useState(initialTariffs);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleEditTariff = useCallback(
    (tariff: {
      id: number;
      service: string;
      category: string;
      cost: string;
      status: string;
    }) => {
      setEditingTariff(tariff);
    },
    []
  );

  const handleDeleteTariff = useCallback(
    (tariff: { id: number; service: string; status?: string }) => {
      setDeletingTariff(tariff);
    },
    []
  );

  const handleSaveEdit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingTariff) return;

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const updatedTariff: (typeof initialTariffs)[0] = {
        id: editingTariff.id,
        service: formData.get("service") as string,
        category: formData.get("category") as string,
        cost: formData.get("cost") as string,
        status: editingTariff.status,
      };

      setTariffs((prev) =>
        prev.map((tariff) =>
          tariff.id === updatedTariff.id ? updatedTariff : tariff
        )
      );

      setEditingTariff(null);
    },
    [editingTariff]
  );

  const handleConfirmDelete = useCallback(() => {
    if (deletingTariff) {
      // Here you would typically make an API call to delete the tariff
      setTariffs((prev) => prev.filter((t) => t.id !== deletingTariff.id));
      setDeletingTariff(null);
    }
  }, [deletingTariff]);

  const [pendingTariffs, setPendingTariffs] = useState([
    { name: "Admission - Private Room", cost: "₦60,000" },
    { name: "MRI Test", cost: "₦110,000" },
    { name: "Thyroid Test", cost: "₦35,500" },
    { name: "Stool Test", cost: "₦4,900" },
  ]);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  return (
    <div className="py-4 px-5">
      <div className="flex flex-row justify-between">
        <nav className="text-xs  mb-2 flex items-center gap-2">
          <span>
            <img src="/icons/Breadcrumb.png" alt="houseicon" />
          </span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/hmos")}
          >
            HMOs
          </span>
          <span>/</span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => router.push("/hmos/1")}
          >
            Reliance HMO
          </span>
          <span>/</span>
          <span className="text-gray-700 hover:underline cursor-pointer">
            Tariff Plans
          </span>
        </nav>
        <button
          className="ml-auto px-5 py-2 bg-cyan-700 text-white rounded-lg shadow hover:bg-cyan-800 transition font-semibold whitespace-nowrap"
          onClick={() => setModalOpen(true)}
        >
          + Add Item
        </button>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl flex flex-row gap-1.5 font-bold text-gray-800">
          <Image
            className=" object-cover w-8 h-8 rounded-full"
            src={"/Avatar.png"}
            alt={"Reliance HMO"}
            width={32}
            height={32}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/Avatar.png";
            }}
          />
          Reliance HMO
        </h1>
      </div>
      <div className="bg-[#F9FAFB] rounded-xl border border-[#EAECF0] p-4 flex  justify-between flex-col md:flex-row md:items-center gap-2 mb-4">
        <div className="flex flex-col items-start gap-2">
                    <span className="text-sm  text-[#344054]">Search for tarrif</span>

          <input
            type="text"
            placeholder="Search for tariff"
            className="border text-[#344054] rounded px-4 py-2 text-sm w-full md:w-64"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm  text-[#344054]">Costs</span>
          <select
            className="border rounded px-4 py-2 text-sm w-full text-[#344054] md:w-50"
            value={costFilter}
            onChange={(e) => {
              setCostFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filters change
            }}
          >
            <option value="">Min-Max</option>
            <option value="low">Low (Below ₦50,000)</option>
            <option value="high">High (₦50,000 and above)</option>
          </select>
        </div>

        <div className="flex flex-col items-start gap-1">
          <span className="text-sm  text-[#344054]">Status</span>
          <select
            className="border rounded px-4 py-2 text-sm w-full md:w-50"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset to first page when filters change
            }}
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl  border border-[#EAECF0] overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Services
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Service Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Cost
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {tariffs
              .filter((item) => {
                // Filter by search term (service name)
                const matchesSearch =
                  item.service.toLowerCase().includes(search.toLowerCase()) ||
                  item.category.toLowerCase().includes(search.toLowerCase());

                // Filter by status
                const matchesStatus =
                  statusFilter === "All" || item.status === statusFilter;

                // Filter by cost range
                let matchesCost = true;
                if (costFilter) {
                  const numericCost = parseFloat(
                    item.cost.replace(/[^0-9.]/g, "")
                  );
                  if (costFilter === "low") {
                    matchesCost = numericCost < 50000; // Example threshold for low cost
                  } else if (costFilter === "high") {
                    matchesCost = numericCost >= 50000; // Example threshold for high cost
                  }
                }

                return matchesSearch && matchesStatus && matchesCost;
              })
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item, idx) => (
                <tr
                  key={item.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}
                >
                  <td className="px-6 py-4 text-[#101828] whitespace-nowrap">
                    {item.service}
                  </td>
                  <td className="px-6 text-[#475467] py-4 whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-[#475467] whitespace-nowrap">{item.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs  ${
                        item.status === "Approved"
                          ? "bg-[#027FA31A] text-[#027FA3]"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right relative">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() =>
                        setMenuOpen(menuOpen === item.id ? null : item.id)
                      }
                    >
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#64748b"
                      >
                        <circle cx="5" cy="12" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="19" cy="12" r="2" />
                      </svg>
                    </button>
                    {menuOpen === item.id && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10"
                      >
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            handleEditTariff(item);
                            setMenuOpen(null);
                          }}
                        >
                          <span className="inline-flex text-[#344054] items-center gap-2">
                            <img src="/icons/edit-2.png" alt="EditIcon" />
                            Edit
                          </span>
                        </button>
                        <hr />
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            handleDeleteTariff({
                              id: item.id,
                              service: item.service,
                              status: item.status,
                            });
                            setMenuOpen(null);
                          }}
                        >
                          <span className="inline-flex text-[#344054] items-center gap-2">
                            <img src="/icons/trash.png" alt="DeleteIcon" />
                            Delete
                          </span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <Pagination
                    totalItems={tariffs.filter((item) => {
                      const matchesSearch =
                        item.service.toLowerCase().includes(search.toLowerCase()) ||
                        item.category.toLowerCase().includes(search.toLowerCase());
                      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
                      let matchesCost = true;
                      if (costFilter) {
                        const numericCost = parseFloat(item.cost.replace(/[^0-9.]/g, ""));
                        if (costFilter === "low") {
                          matchesCost = numericCost < 50000;
                        } else if (costFilter === "high") {
                          matchesCost = numericCost >= 50000;
                        }
                      }
                      return matchesSearch && matchesStatus && matchesCost;
                    }).length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-[#014C654D] backdrop-blur-[0.3px]"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-1">Add Item</h2>
            <p className="text-gray-500 text-sm mb-6">
              Add new items to the tariff plan
            </p>
            <p className="text-xs text-gray-400 mb-4">Tariff for Red Diamond</p>
            <form
              className="flex flex-col gap-4 flex-1 overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                setModalOpen(false);
                setVerifyModalOpen(true);
              }}
            >
              {[0, 1].map((idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 mb-2">
                  <div className="mb-2 text-xs font-semibold text-gray-500">
                    {idx + 1}. Name
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-md border px-4 py-2 mb-2 border-gray-300 focus:border-cyan-500"
                    placeholder="Diamond - Corporate"
                  />
                  <label className="block text-sm font-medium mb-1">
                    Service Category
                  </label>
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
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-2xl text-gray-500 hover:bg-gray-100 mb-2"
              >
                +
              </button>
              <div className="text-xs text-gray-500 mt-4 mb-2">
                By submitting this form, I confirm that the information provided
                is accurate and true. I understand that providing false
                information may result in legal consequences and termination of
                services. I agree to the{" "}
                <a href="/terms" className="underline">
                  Terms and Conditions
                </a>
                .
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-end bg-black/30"
          onClick={() => setVerifyModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-1">Verify Tariff</h2>
            <p className="text-gray-500 text-sm mb-6">
              Confirm the new updates to the tariff plan
            </p>
            <div className="flex flex-col gap-4 mb-6">
              {pendingTariffs.map((item, idx) => (
                <div key={idx} className="border-b pb-2">
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-gray-700">{item.cost}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-4 mb-2">
              By submitting this form, I confirm that the information provided
              is accurate and true. I understand that providing false
              information may result in legal consequences and termination of
              services. I agree to the{" "}
              <a href="/terms" className="underline">
                Terms and Conditions
              </a>
              .
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
      <EditTariffModal
        isOpen={!!editingTariff}
        onClose={() => setEditingTariff(null)}
        onSave={handleSaveEdit}
        tariff={editingTariff || undefined}
      />
      <DeleteTariffModal
        isOpen={!!deletingTariff}
        onClose={() => setDeletingTariff(null)}
        onDelete={handleConfirmDelete}
        serviceName={deletingTariff?.service}
      />
    </div>
  );
}
