"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../auth/AuthContext";
import { usePaCode } from "../../pa-code/context/PaCodeContext";

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
  
  // Get overdue count for PA Codes page
  let overdueCount = 0;
  try {
    const paCodeContext = usePaCode();
    overdueCount = paCodeContext.overdueCount;
  } catch (error) {
    // Context not available, use default value
  }

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  // Find the best matching route name
  const getPageTitle = () => {
    if (routeNameMap[pathname]) return routeNameMap[pathname];
    // Try to match by prefix for dynamic or nested routes
    const match = Object.keys(routeNameMap).find((key) =>
      pathname.startsWith(key)
    );
    return match ? routeNameMap[match] : "Dashboard";
  };

  return (
    <header className="flex items-center justify-between w-full h-16 px-8 bg-white border-b-[1px] border-[#E4E7EC]">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl text-[#344054]">{getPageTitle()}</h1>
        {pathname === "/pa-code" && (
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            overdueCount > 0 
              ? "bg-red-100 text-red-700" 
              : "bg-blue-100 text-blue-700"
          }`}>
            {overdueCount > 0 ? `${overdueCount} Overdue` : "Cleared"}
          </div>
        )}
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Image src="/icons/notification.png" alt="notificationICon" width={24} height={24} />
        </button>
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center "
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Image src="/icons/icon.png" alt="IconLogo" width={24} height={24} />
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
