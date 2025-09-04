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
    <main className="h-full flex flex-col lg:flex-row">
      <section className="w-full lg:w-1/2 flex flex-col justify-between px-4 sm:px-8 lg:px-10 py-3 lg:py-2 relative bg-white min-h-[60vh]">
        <div className="flex flex-col justify-center items-center flex-1 w-full">
          {logo}
          <div className="w-full max-w-sm mt-1 mb-3">{form}</div>
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

      <section className="w-full lg:w-1/2 h-fit flex items-center rounded-[27.62px] justify-center  bg-cover bg-center text-white ">
        <div className="w-full max-w-lg  flex flex-col items-center">
            <div className="relative w-full max-w-[420px] h-auto aspect-[4/3]">
              <Image 
                src="/logoImg.png" 
                alt="logo" 
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
        </div>
      </section>
    </main>
  );
}
