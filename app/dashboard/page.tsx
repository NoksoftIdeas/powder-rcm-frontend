"use client";

import { withAuth } from "../components/auth/withAuth";
import DashboardCards from "../components/dashboard/DashboardCards";
import ClaimsChartSection from "../components/dashboard/ClaimsChartSection";

function DashboardPage() {
  return (
    <div className="space-y-6">
        <DashboardCards />
        <ClaimsChartSection />
    </div>
  );
}

export default withAuth(DashboardPage);
