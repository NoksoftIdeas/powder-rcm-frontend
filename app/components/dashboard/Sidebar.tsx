"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: "dashboard", href: "/dashboard" },
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
        <div className="flex items-center justify-center mb-10">
          <span className="font-bold text-lg tracking-widest text-gray-400">
            POWDER
          </span>
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition font-semibold text-sm ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}
              >
                {/* Icon placeholder */}
                <span className="w-6 h-6 flex items-center justify-center">
                  {/* Replace with real icons */}
                  <span className="bg-blue-100 text-blue-400 rounded-full w-6 h-6 flex items-center justify-center">
                    {item.icon === "dashboard" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 13h8V3H3v10zM13 21h8v-8h-8v8zM13 3v8h8V3h-8zM3 21h8v-4H3v4z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {item.icon === "key" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M15 7a5 5 0 11-9.9 1M15 7V3m0 4h4m-4 0a5 5 0 100 10 5 5 0 000-10z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {item.icon === "document" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 7h10M7 11h10M7 15h6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {item.icon === "credit-card" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <path
                          d="M2 10h20"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {item.icon === "users" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87" />
                        <path d="M16 3.13a4 4 0 010 7.75" />
                      </svg>
                    )}
                    {item.icon === "user" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="7" r="4" />
                        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                      </svg>
                    )}
                    {item.icon === "settings" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 15.5A3.5 3.5 0 1112 8.5a3.5 3.5 0 010 7zm7.94-2.06a1.5 1.5 0 00.33-1.64l-1.1-1.91a1.5 1.5 0 00-1.51-.85l-2.2.31a7.07 7.07 0 00-1.47-.85l-.33-2.2a1.5 1.5 0 00-.85-1.51l-1.91-1.1a1.5 1.5 0 00-1.64.33l-1.54 1.54a1.5 1.5 0 00-.33 1.64l1.1 1.91a1.5 1.5 0 001.51.85l2.2-.31c.49.28.96.59 1.47.85l.33 2.2a1.5 1.5 0 00.85 1.51l1.91 1.1a1.5 1.5 0 001.64-.33l1.54-1.54z" />
                      </svg>
                    )}
                    {item.icon === "alert" && (
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          d="M12 9v2m0 4h.01m-6.93 1.73L19.73 7.3a2.75 2.75 0 00-3.86-3.86L3.27 16.13a2.75 2.75 0 003.86 3.86L12 9z"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
