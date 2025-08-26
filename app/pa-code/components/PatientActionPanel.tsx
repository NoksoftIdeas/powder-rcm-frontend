"use client";

import React, { useState } from "react";
import { RejectModal } from "@/app/components/modals/RejectModal";
import { RejectedService } from "@/types/rejected-service";
import { addDenial } from "@/services/denials";

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
  const [hasCheckedItems, setHasCheckedItems] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectedServices, setRejectedServices] = useState<RejectedService[]>([]);

  const handleReject = async (rejectedServices: RejectedService[]) => {
    try {
      // Add each rejected service to the denials list
      for (const service of rejectedServices) {
        if (service.reason.trim()) {
          await addDenial({
            enrolleeId: "", // You might want to pass this as a prop
            hmo: assignee, // Using the selected assignee as HMO
            reason: service.reason,
          });
        }
      }
      
      // Close the modal and reset the UI
      setIsRejectModalOpen(false);
      setList(prev => prev.map(item => ({...item, completed: false})));
      setHasCheckedItems(false);
      
      // Show success message
      alert('Services have been rejected and added to denials.');
    } catch (error) {
      console.error('Error processing rejections:', error);
      alert('Failed to process rejections. Please try again.');
    }
  };

  const filtered = list.filter((i) =>
    activeTab === "Unprocessed" ? !i.completed : i.completed
  );

  return (
    <aside className="w-full animate-slide-in-right ">
      <div className="p-2 space-y-4 ">
        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Assigned To
          </label>
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            {assignees.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Tabs */}
        <div className="border border-[#EAECF0]  rounded-[24px]">
          <div className="flex items-center bg-[#F4F6F6] gap-6 border-b border-gray-200 px-1">
            {(["Unprocessed", "Processed"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-2 text-sm font-medium ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
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
                  onChange={(e) => {
                    const newList = list.map((it) =>
                      it.id === item.id
                        ? { ...it, completed: e.target.checked }
                        : it
                    );
                    setList(newList);
                    // Check if any items are checked in the Unprocessed tab
                    const hasChecked = newList.some(item => item.completed);
                    setHasCheckedItems(hasChecked);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">
                No items.
              </p>
            )}
            
            {activeTab === 'Unprocessed' && hasCheckedItems && (
              <div className="mt-4 p-3">
                <button 
                  className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  onClick={() => {
                    // Get all checked items and prepare them for rejection
                    const checkedItems = list.filter(item => item.completed);
                    setRejectedServices(
                      checkedItems.map(item => ({
                        id: item.id,
                        label: item.label,
                        reason: ''
                      }))
                    );
                    setIsRejectModalOpen(true);
                  }}
                >
                  Reject Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <RejectModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        rejectedServices={rejectedServices}
        onReasonChange={(id, reason) => {
          setRejectedServices(prev => 
            prev.map(service => 
              service.id === id ? { ...service, reason } : service
            )
          );
        }}
        onReject={() => handleReject(rejectedServices)}
      />
    </aside>
  );
}

export default PatientActionPanel;
