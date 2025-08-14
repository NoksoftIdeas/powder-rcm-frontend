import React from "react";

interface AuthLayoutProps {
  logo: React.ReactNode;
  form: React.ReactNode;
  infoPanel?: React.ReactNode;
  supportEmail?: string;
}

export default function AuthLayout({
  logo,
  form,
  infoPanel,
  supportEmail,
}: AuthLayoutProps) {
  return (
    <main className="h-full] flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/2 flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-3 lg:py-2 relative bg-white min-h-[60vh]">
        <div className="flex flex-col justify-center items-center flex-1 w-full">
          {logo}
          <div className="w-full max-w-sm mt-1 mb-3">{form}</div>
        </div>
        {supportEmail && (
          <div className="flex items-center gap-2 text-gray-500 text-sm lg:mt-20 lg:absolute left-1/2 lg:left-10 bottom-0  transform -translate-x-1/2 lg:translate-x-0 w-full justify-center ml-[-60px] lg:justify-end">
            <span className="text-[#3C4043] text-[12.89px] leading-[18.42px] font-light ">
              {supportEmail}
            </span>
            <img src="/icons/mail.svg" alt="" />
          </div>
        )}
      </section>

      <section className="w-full lg:w-1/2 flex items-center rounded-[27.62px] justify-center bg-[url('/loginbg.png')] bg-cover bg-center text-white p-4 sm:p-8">
        <div className="w-full max-w-xl flex flex-col items-center">
          {infoPanel}
        </div>
      </section>
    </main>
  );
}
