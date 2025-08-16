"use client";

import React from "react";
import { FileText, Send } from "lucide-react";

export function ConversationDetailEmptyState({
  onCreateNew,
}: {
  onCreateNew: () => void;
}) {
  return (
    <section className="flex-1 flex flex-col h-full border border-[#EAECF0] rounded-[24px]">
      <div className="flex-1 m-[-2rem] flex items-center bg-[url('/icons/BackgroundEmpty.png')] bg-fit bg-no-repeat bg-center justify-center">
        <div className="text-center">
          <div className="mx-auto mt-28 h-24 w-24 rounded-full bg-[#EDF0F3] flex items-center  justify-center relative">
            <div className="absolute inset-0 rounded-full " />
            <img src="/icons/PaEmpty.png" alt="PAcodeemptystate" />
          </div>
          <h3 className="text-[#344054] text-[17.68px] font-medium">
            Feels empty here
          </h3>
          <p className=" text-[13.75px] font-normal text-[#344054] max-w-80">
            Select an interaction or create a new request to start communicating
            with a HMO.
          </p>
          <div className="mt-3">
            <button
              onClick={onCreateNew}
              className="inline-flex items-center font-normal gap-2 px-4 py-2 rounded-xl bg-[#017FA71A] text-[#017EA6]  text-[12.91px]"
            >
              New Request
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center gap-2 bg-white rounded-[15px] border border-[#EAECF0] p-[16px]">
          <input
            placeholder="Type something here..."
            className="flex-1 outline-none text-sm placeholder:text-[#676767] font-light"
          />
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[#E5F2F6]">
            <img src="/icons/send-2.svg" alt="message" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ConversationDetailEmptyState;
