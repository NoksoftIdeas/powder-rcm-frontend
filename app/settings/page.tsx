"use client";

import { withAuth } from "../components/auth/withAuth";

function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>This is the Settings page. Configure your application settings here.</p>
    </div>
  );
}

export default withAuth(SettingsPage);
