/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";


interface BillDetailsModalProps {
  open: boolean;
  onClose: () => void;
  bill: any;
}

const tabs = ["Services", "Drugs"];

export default function BillDetailsModal({ open, onClose, bill }: BillDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("Services");
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#014C654D] backdrop-blur-[0.3px]" onClick={onClose}>

      <div className="bg-white w-full max-w-4xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto relative animate-fade-in" onClick={e => e.stopPropagation()}>
        
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10" />
            <div>
              <div className="font-bold text-lg text-gray-800">Powder Hospital</div>
              <div className="text-xs text-gray-400">Bill Details</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">Print</button>
            <button className="px-4 py-1 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">Download</button>
            <button className="ml-2 text-gray-400 hover:text-gray-700" onClick={onClose} aria-label="Close">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-6 border-b px-8 bg-white">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`py-3 px-2 font-semibold text-sm border-b-2 transition ${activeTab === tab ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "Services" ? (
            <div>
              <table className="min-w-full divide-y divide-gray-200 mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Encounter Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Enrollee ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Diagnosis</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2 text-sm">2024-07-01</td>
                    <td className="px-4 py-2 text-sm">ENR-001</td>
                    <td className="px-4 py-2 text-sm">Fracture</td>
                    <td className="px-4 py-2 text-sm">A001</td>
                    <td className="px-4 py-2 text-sm">₦200,000 <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-2 align-middle"></span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">2024-07-02</td>
                    <td className="px-4 py-2 text-sm">ENR-002</td>
                    <td className="px-4 py-2 text-sm">Surgery</td>
                    <td className="px-4 py-2 text-sm">B002</td>
                    <td className="px-4 py-2 text-sm">₦500,000 <span className="inline-block w-2 h-2 rounded-full bg-green-500 ml-2 align-middle"></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table className="min-w-full divide-y divide-gray-200 mb-6">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Encounter Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Enrollee ID</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Drug</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Cost</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2 text-sm">2024-07-01</td>
                    <td className="px-4 py-2 text-sm">ENR-001</td>
                    <td className="px-4 py-2 text-sm">Paracetamol</td>
                    <td className="px-4 py-2 text-sm">D001</td>
                    <td className="px-4 py-2 text-sm">₦2,000 <span className="inline-block w-2 h-2 rounded-full bg-purple-500 ml-2 align-middle"></span></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">2024-07-02</td>
                    <td className="px-4 py-2 text-sm">ENR-002</td>
                    <td className="px-4 py-2 text-sm">Ibuprofen</td>
                    <td className="px-4 py-2 text-sm">D002</td>
                    <td className="px-4 py-2 text-sm">₦3,500 <span className="inline-block w-2 h-2 rounded-full bg-purple-500 ml-2 align-middle"></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {/* Footer */}
          <div className="flex flex-col gap-2 mt-8 border-t pt-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₦705,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>₦10,000</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total Due</span>
              <span>₦715,500</span>
            </div>
            <div className="flex justify-between text-sm mt-4">
              <span>Payment Info</span>
              <span className="text-gray-500">Bank: Zenith | Acc: 0123456789</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Approval</span>
              <span className="text-green-600 font-semibold">Approved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
