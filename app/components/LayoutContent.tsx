"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./dashboard/Sidebar";
import TopBar from "./dashboard/TopBar";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = 
    pathname === '/Login' || 
    pathname === '/Signup' || 
    pathname === '/terms' || 
    pathname === '/privacy';

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full p-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 px-8 py-3 bg-gray-50">{children}</main>
      </div>
    </div>
  );
} 