import React from "react";

interface AuthLayoutProps {
  logo: React.ReactNode;
  form: React.ReactNode;
  infoPanel?: React.ReactNode;
  supportEmail?: string;
}

export default function AuthLayout({ logo, form, infoPanel, supportEmail }: AuthLayoutProps) {
  return (
    <main className="h-full] flex flex-col lg:flex-row bg-white">

      <section className="w-full lg:w-1/2 flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-3 lg:py-4 relative bg-white min-h-[60vh]">
        <div className="flex flex-col justify-center items-center flex-1 w-full">
          {logo}
          <div className="w-full max-w-sm mt-2">
            {form}
          </div>
        </div>
        {supportEmail && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-8 lg:mt-0 lg:absolute left-1/2 lg:left-10 bottom-4 lg:bottom-8 transform -translate-x-1/2 lg:translate-x-0 w-full justify-center lg:justify-end">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block mr-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12l-4 4-4-4m8-8H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" /></svg>
            <span>{supportEmail}</span>
          </div>
        )}
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#017FA5] via-[#6B7280] to-[#00303F] text-white p-4 sm:p-8">
        <div className="w-full max-w-xl flex flex-col items-center">
          {infoPanel}
        </div>
      </section>
    </main>
  );
}


