"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

const routeNameMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/pa-code": "PA Code",
  "/requests": "EMR Requests",
  "/claims": "Claims",
  "/denials": "Denial Management",
  "/billing": "Billing",
  "/hmos": "HMOs",
  "/patients": "Patients",
  "/settings": "Settings",
  "/tariff-plans": "Tariff Plans",
  "/channels": "Channels",
  "/terms-and-conditions": "Terms and Conditions",
  "/privacy": "Privacy Policy",
};

export default function TopBar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  // Find the best matching route name
  const getPageTitle = () => {
    // Try to match the full path first
    if (routeNameMap[pathname]) return routeNameMap[pathname];
    // Try to match by prefix for dynamic or nested routes
    const match = Object.keys(routeNameMap).find((key) => pathname.startsWith(key));
    return match ? routeNameMap[match] : "Dashboard";
  };

  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-white border-b-[1px] border-gray-200">
      <h1 className="font-bold text-3xl">{getPageTitle()}</h1>
      <div className="flex items-center gap-6">
        <button className="relative">
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#38bdf8"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 10-3 0v.68C7.64 5.36 6 7.929 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#64748b"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
