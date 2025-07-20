"use client";
import { useEffect, useState } from "react";
import { fetchInteractions } from "../api/mockInteractions";
import PAStatusBadge from "./PAStatusBadge";

interface InteractionItem {
  id: number;
  hmo: string;
  policyNumber: string;
  patient: string;
  relationship: string;
  provider: string;
  procedure: string;
  estimatedCost: string | number;
  status: string;
  timestamp: string;
}

interface PAInteractionListProps {
  onSelectCase: (item: InteractionItem) => void;
  selectedCase: InteractionItem | null;
}

export default function PAInteractionList({ onSelectCase, selectedCase }: PAInteractionListProps) {
  const [interactions, setInteractions] = useState<InteractionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInteractions()
      .then((data) => {
        setInteractions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load interactions.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 text-sm mt-8">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-400 text-sm mt-8">{error}</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 py-4">
      {interactions.map((item) => (
        <div
          key={item.id}
          className={`rounded-xl p-3 mb-2 cursor-pointer border flex flex-col gap-1 shadow-sm transition-all ${selectedCase && selectedCase.id === item.id ? 'bg-blue-50 border-blue-400' : 'bg-white border-transparent hover:bg-gray-50'}`}
          onClick={() => onSelectCase(item)}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 text-sm">{item.patient}</span>
            <span className="ml-auto"><PAStatusBadge status={item.status as "read" | "new" | "overdue" | "resolved"} /></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
            <span>{item.hmo}</span>
            <span>•</span>
            <span>{item.relationship}</span>
            <span className="ml-auto whitespace-nowrap">{item.timestamp}</span>
          </div>
        </div>
      ))}
      {interactions.length === 0 && (
        <div className="text-center text-gray-400 text-sm mt-8">Interactions with HMOs will appear here...</div>
      )}
    </div>
  );
}
