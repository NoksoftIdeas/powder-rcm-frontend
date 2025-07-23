"use client";

import { useState } from "react";
import { withAuth } from "../components/auth/withAuth";
import DashboardCards from "../components/dashboard/DashboardCards";
import ClaimsChartSection from "../components/dashboard/ClaimsChartSection";
import { EmptyState } from "../components/dashboard/EmptyState";

// Mock function to check if there's any data
const hasData = () => {
  // In a real app, this would check your actual data source
  // For now, we'll use a simple check against localStorage
  return localStorage.getItem('hasData') === 'true';
};

function DashboardPage() {
  const [showEmptyState, setShowEmptyState] = useState(!hasData());

  const handleAddFirstClaim = () => {
    // In a real app, this would navigate to the add claim form
    // For now, we'll just simulate adding data
    localStorage.setItem('hasData', 'true');
    setShowEmptyState(false);
  };

  return (
    <div className="space-y-6">
      {showEmptyState ? (
        <div className="bg-white rounded-lg shadow p-6">
          <EmptyState 
            title="No claims data yet"
            description="Get started by adding your first claim to see your dashboard in action."
            actionText="Add Your First Claim"
            onAction={handleAddFirstClaim}
          />
        </div>
      ) : (
        <>
          <DashboardCards />
          <ClaimsChartSection />
        </>
      )}
    </div>
  );
}

export default withAuth(DashboardPage);
