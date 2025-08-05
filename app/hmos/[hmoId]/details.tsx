"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

interface HmoDetailsProps {
  id: string;
  name: string;
  logo: string | null;
}

export default function HmoDetails() {
  const params = useParams();
  const hmoId = Array.isArray(params.hmoId)
    ? params.hmoId[0]
    : params.hmoId || "";

  // In a real app, you would fetch the HMO details using the hmoId
  const hmo: HmoDetailsProps = {
    id: hmoId,
    name: "Reliance HMO",
    logo: "/Avatar.png",
  };

  return (
    <div className="p-6">
      <nav className="text-xs text-gray-400 mb-2 flex items-center gap-2">
        <Link href="/hmos" className="hover:underline cursor-pointer">
          HMOs
        </Link>
        <span>/</span>
        <span className="text-gray-700 font-semibold">{hmo.name}</span>
      </nav>

      <div className="flex items-center gap-4 mb-6">
      
        <h1 className="text-2xl font-bold flex gap-1 text-gray-800">
          <Image
            className=" object-cover"
            src={hmo.logo || "/Avatar.png"}
            alt={hmo.name}
            width={32}
            height={32}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/Avatar.png";
            }}
          />
          {hmo.name}
        </h1>
      </div>

      <div className="flex gap-4">
        <Link
          href={`/hmos/${hmo.id}/tariff-plans`}
          className="px-6 py-3 bg-cyan-700 text-white rounded-lg font-semibold hover:bg-cyan-800 transition"
        >
          Tariff Plans
        </Link>
        <Link
          href={`/hmos/${hmo.id}/channels`}
          className="px-6 py-3 bg-cyan-700 text-white rounded-lg font-semibold hover:bg-cyan-800 transition"
        >
          Channels
        </Link>
      </div>
    </div>
  );
}
