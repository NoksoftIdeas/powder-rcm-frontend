"use client";

import React, { useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  completed: boolean;
};

export function PatientActionPanel({
  assignees,
  defaultAssignee,
  items,
}: {
  assignees: string[];
  defaultAssignee: string;
  items: ChecklistItem[];
}) {
  const [assignee, setAssignee] = useState(defaultAssignee);
  const [activeTab, setActiveTab] = useState<"Unprocessed" | "Processed">(
    "Unprocessed"
  );
  const [list, setList] = useState(items);

  const filtered = list.filter((i) =>
    activeTab === "Unprocessed" ? !i.completed : i.completed
  );

  return (
    <aside className="w-full  animate-slide-in-right">
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Assigned To</label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 px-1">
          {(["Unprocessed", "Processed"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 text-sm font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute left-0 -bottom-px h-0.5 w-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>

        <div className="max-h-[60vh] overflow-auto pr-1 space-y-2">
          {filtered.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={(e) =>
                  setList((prev) =>
                    prev.map((it) =>
                      it.id === item.id ? { ...it, completed: e.target.checked } : it
                    )
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">No items.</p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default PatientActionPanel;


