"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

const menu = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
  { name: "Requests", icon: "inbox", href: "/requests" },
  { name: "PA Code", icon: "key", badge: 8, href: "/pa-code" },
  { name: "Claims", icon: "document", href: "/claims" },
  { name: "Denials", icon: "alert", href: "/denials" },
  { name: "Billing", icon: "credit-card", href: "/billing" },
  { name: "HMOs", icon: "users", href: "/hmos" },
  { name: "Patients", icon: "user", href: "/patients" },
  { name: "Settings", icon: "settings", href: "/settings" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {/* Mobile Hambugar */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        <svg
          width="28"
          height="28"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#38bdf8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r-[1px] border-gray-200  flex flex-col py-6 px-4 transition-transform duration-200 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:translate-x-0 lg:flex lg:min-h-screen`}
      >
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setOpen(false)}
        >
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#64748b"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex items-center justify-center mb-5">
           <Logo/>
        </div>

        <nav className="flex-1 flex flex-col gap-1">
          {menu.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition  text-sm ${
                  isActive
                    ? "bg-[#027FA31A] text-[#027FA3]"
                    : "text-[#667185] hover:bg-[#9adbf21a]"
                }`}
                onClick={() => setOpen(false)}
              >
                {/* Icon placeholder */}
                <span className="w-6 h-6 flex items-center justify-center">
                  <span className={` rounded-full w-6 h-6 flex items-center justify-center  ${
                  isActive
                    ? " text-[#027FA3]"
                    : "text-[#667185] hover:bg-[#027FA31A]"
                }` }>
                    {item.icon === "dashboard" && (
                      <img src="/icons/element-4.png" alt="DashboardIcon" />
                    )}
                    {item.icon === "inbox" && (
                     <img src="/icons/add.png" alt="RequestIcon" />
                    )}
                    {item.icon === "key" && (
                     <img src="/icons/message-text.png" alt="PAcodeIcon" />
                    )}
                    {item.icon === "document" && (
                    <img src="/icons/Frame.png" alt="ClaimsIcon" />
                    )}
                    {item.icon === "alert" && (
                     <img src="/icons/warning-2.png" alt="DenailsIcon" />
                    )}
                    {item.icon === "credit-card" && (
                     <img src="/icons/money-recive.png" alt="BillingIcon" />
                    )}
                    {item.icon === "users" && (
                     <img src="/icons/hospital.png" alt="HmosIcon" />
                    )}
                    {item.icon === "user" && (
                     <img src="icons/people.png" alt="PatientsIcon" />
                    )}
                    {item.icon === "settings" && (
                     <img src="icons/setting.png" alt="settingsIcon" />
                    )}
                  </span>
                </span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
