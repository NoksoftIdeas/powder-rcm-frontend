"use client";
import { useState } from "react";

export default function PAActionPanel({ onReject }: { onReject: () => void }) {
  const [note, setNote] = useState("");
  const [assessmentCode, setAssessmentCode] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);

  const handleApprove = () => {
    // Simulate code generation
    setAssessmentCode("CGGEFI983960921-1E");
    setShowCode(true);
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        className="w-full border rounded px-3 py-2 text-sm"
        placeholder="Type something here..."
        rows={2}
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      {showCode && assessmentCode && (
        <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2">
          <span className="font-mono text-green-700 text-lg">{assessmentCode}</span>
          <span className="text-xs text-green-700 ml-2">Assessment Code Generated</span>
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded font-semibold"
          onClick={handleApprove}
          disabled={showCode}
        >
          Approve
        </button>
        <button
          className="bg-red-50 text-red-600 border border-red-200 px-6 py-2 rounded font-semibold"
          onClick={onReject}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
