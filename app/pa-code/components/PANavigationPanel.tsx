"use client";
import PAInteractionList from "./PAInteractionList";

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

interface PANavigationPanelProps {
  onSelectCase: (item: InteractionItem) => void;
  selectedCase: InteractionItem | null;
}

export default function PANavigationPanel({ onSelectCase, selectedCase }: PANavigationPanelProps) {
  return (
    <aside className="w-80 min-w-[300px] bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search Interactions"
          className="w-full rounded bg-gray-50 border px-3 py-2 text-sm"
        />
      </div>
      <div className="px-4 py-2 border-b flex flex-col gap-2">
        <select className="w-full rounded bg-gray-50 border px-2 py-1 text-sm">
          <option>All Channels</option>
        </select>
        <div className="flex gap-2 mt-2">
          <button className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 font-semibold">All</button>
          <button className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-500">Unread</button>
          <button className="text-xs px-2 py-1 rounded bg-red-50 text-red-500">Overdue</button>
          <button className="text-xs px-2 py-1 rounded bg-gray-50 text-gray-400">Resolved</button>
        </div>
      </div>
      <PAInteractionList onSelectCase={onSelectCase} selectedCase={selectedCase} />
    </aside>
  );
}
