"use client";
import { useState } from "react";

const mockServices = [
  { id: 1, name: "Consultation - Orthopedic Doctor" },
  { id: 2, name: "Admission - Private Room" },
  { id: 3, name: "MRI Test" },
];

interface PARejectModalProps {
  onClose: () => void;
  onReject: (reasons: { [key: number]: string }) => void;
}

export default function PARejectModal({ onClose, onReject }: PARejectModalProps) {
  const [reasons, setReasons] = useState<{ [key: number]: string }>({});

  const handleReasonChange = (id: number, value: string) => {
    setReasons(prev => ({ ...prev, [id]: value }));
  };

  const handleReject = () => {
    onReject(reasons);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-2 text-red-600">Rejected Services</h2>
        <p className="text-sm text-gray-600 mb-6">Record reason for rejection to enable denial management</p>
        <div className="space-y-4">
          {mockServices.map(service => (
            <div key={service.id} className="flex flex-col gap-1">
              <span className="font-medium text-gray-700">{service.name}</span>
              <input
                type="text"
                className="border rounded px-3 py-2 text-sm"
                placeholder="Enter reason for rejection"
                value={reasons[service.id] || ""}
                onChange={e => handleReasonChange(service.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-8">
          <button className="px-4 py-2 rounded border bg-gray-50" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold" onClick={handleReject}>Reject</button>
        </div>
      </div>
    </div>
  );
}
