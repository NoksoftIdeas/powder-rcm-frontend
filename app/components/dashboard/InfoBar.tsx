"use client";

import { useState } from "react";

export default function InfoBar() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-sm font-medium text-blue-900 shadow-sm">
      <span className="flex-1">
        Looks like you’ve not finished your onboarding. Setup <span className="font-bold">HMOs</span>, <span className="font-bold">Patients</span> and start requesting <span className="font-bold">PA Codes</span> so you can start analyzing your data.
      </span>
      <button className="ml-4 px-4 py-1.5 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition text-xs">Finish Setup</button>
      <button className="ml-2 text-blue-400 hover:text-blue-600" onClick={() => setShow(false)} aria-label="Dismiss">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  );
}
