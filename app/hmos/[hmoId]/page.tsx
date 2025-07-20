"use client";
import React from "react";
import Link from "next/link";

export default function HmoDetailsPage({ params }: { params: any }) {
  const { hmoId } = React.use(params);
  // In a real app, fetch HMO details by hmoId
  const hmo = {
    id: hmoId,
    name: "Reliance HMO",
    logo: null,
  };
  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-2 flex items-center gap-2">
        <Link href="/hmos" className="hover:underline cursor-pointer">HMOs</Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">{hmo.name}</span>
      </nav>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#2563eb"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M8 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" /></svg>
        </span>
        <h1 className="text-2xl font-bold text-gray-800">{hmo.name}</h1>
      </div>
      <div className="flex gap-4">
        <Link href={`/hmos/${hmo.id}/tariff-plans`} className="px-6 py-3 bg-cyan-700 text-white rounded-lg font-semibold hover:bg-cyan-800 transition">Tariff Plans</Link>
        <Link href={`/hmos/${hmo.id}/channels`} className="px-6 py-3 bg-cyan-700 text-white rounded-lg font-semibold hover:bg-cyan-800 transition">Channels</Link>
      </div>
      {/* Add more HMO details here as needed */}
    </div>
  );
} 