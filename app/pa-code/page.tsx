"use client";

import { useState } from "react";
import PACaseDetailView from "./components/PACaseDetailView";
import PARejectModal from "../components/modals/PARejectModal";

export default function PaCodePage() {
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  // Placeholder data - in real app, this would come from a server component or API
  const caseData = {
    hmo: "Sample HMO",
    policyNumber: "123456",
    patient: "John Doe",
    relationship: "Self",
    provider: "Sample Provider",
    procedure: "Sample Procedure",
    estimatedCost: "₦100,000",
    actionHistory: [],
    paCode: "PA-001",
  };

  const handleReject = () => {
    setShowRejectModal(true);
  };

  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
  };

  const handleSubmitReject = (reasons: { [key: number]: string }) => {
    console.log("Rejection reasons:", reasons);
    setShowRejectModal(false);
  };

  return (
    <>
    <PACaseDetailView
      caseData={caseData}
        onReject={handleReject}
      />
      {showRejectModal && (
        <PARejectModal 
          onClose={handleCloseRejectModal}
          onReject={handleSubmitReject}
    />
      )}
    </>
  );
}
