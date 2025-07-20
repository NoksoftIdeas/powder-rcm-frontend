"use client";
import { useState } from "react";
import PANavigationPanel from "./PANavigationPanel";
import PACaseDetailView from "./PACaseDetailView";
import PARejectModal from "./PARejectModal";
import PAEmptyState from "./PAEmptyState";

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

export default function PAContainer() {
  const [selectedCase, setSelectedCase] = useState<InteractionItem | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  // Removed unused rejectionData state.

  return (
    <div className="flex h-screen bg-gray-50">
      <PANavigationPanel
        onSelectCase={setSelectedCase}
        selectedCase={selectedCase}
      />
      <div className="flex-1 flex flex-col">
        {selectedCase ? (
          <PACaseDetailView
            caseData={selectedCase}
            onReject={() => setShowRejectModal(true)}
          />
        ) : (
          <PAEmptyState />
        )}
      </div>
      {showRejectModal && (
        <PARejectModal
          onClose={() => setShowRejectModal(false)}
          onReject={() => setShowRejectModal(false)}
        />
      )}
    </div>
  );
}
