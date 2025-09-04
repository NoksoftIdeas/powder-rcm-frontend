import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  logo: React.ReactNode;
  form: React.ReactNode;
  infoPanel?: React.ReactNode;
  supportEmail?: string;
}

export default function AuthLayout({
  logo,
  form,
  supportEmail,
}: AuthLayoutProps) {
  return (
    <main className="h-full flex flex-col lg:flex-row gap-4 ">
      <section className="w-full flex flex-col justify-between  relative bg-white">
        <div className="flex flex-col justify-center items-center">
          {logo}
          <div className="w-[80%]">{form}</div>
        </div>
        {supportEmail && (
          <div className="flex items-center gap-2 text-gray-500 text-sm lg:mt- lg:absolute left-1/2 lg:left-10 bottom-0  transform -translate-x-1/2 lg:translate-x-0 w-full justify-center ml-[-60px] lg:justify-end">
            <span className="text-[#3C4043] text-[12.89px] leading-[18.42px] font-light ">
              {supportEmail}
            </span>
            <Image
              src="/icons/mail.svg"
              alt="mailIcon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
        )}
      </section>

      <section className="w-full flex items-center rounded-[27.62px] justify-center bg-cover bg-center text-white ">
        <div className="w-full flex flex-col items-center">
          <div className="relative w-full h-auto ">
            <Image
              src="/logoImg.png"
              alt="logo"
              width={430}
              height={430}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}
