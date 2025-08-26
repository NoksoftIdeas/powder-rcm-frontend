"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./dashboard/Sidebar";
import TopBar from "./dashboard/TopBar";
import { PaCodeProvider } from "../pa-code/context/PaCodeContext";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/Login" ||
    pathname === "/Signup" ||
    pathname === "/terms" ||
    pathname === "/privacy";

  if (isAuthPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fff]">
        {children}
      </div>
    );
  }

  return (
    <PaCodeProvider>
      <div className="flex ">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 px-8 py-3 bg-[#fff]">{children}</main>
        </div>
      </div>
    </PaCodeProvider>
  );
}
