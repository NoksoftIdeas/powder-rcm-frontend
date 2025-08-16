"use client";

import React from "react";
import {
  Mail,
  MessageCircle,
  Paperclip,
  Send,
  Timer,
  ArrowRight,
} from "lucide-react";

export type ConversationMessage =
  | {
      id: string;
      type: "request";
      providerName: string;
      policyNumber: string;
      channel: "WhatsApp" | "Email" | "SMS";
      patientName: string;
      patientType: string;
      procedure: string;
      estimatedCost: string;
      message: string;
      timestamp: string;
    }
  | {
      id: string;
      type: "admin";
      text: string;
      timestamp: string;
    }
  | {
      id: string;
      type: "process";
      text: string; // e.g., "Process Code →"
      timestamp: string;
    }
  | {
      id: string;
      type: "code";
      code: string;
      timestamp: string;
    };

export function ConversationDetailColumn({
  providerName,
  providerLogoUrl,
  timer,
  policyNumber,
  channel,
  messages,
  onProcess,
}: {
  providerName: string;
  providerLogoUrl?: string | null;
  timer: string; // 02:56
  policyNumber: string;
  channel: "WhatsApp" | "Email" | "SMS";
  messages: ConversationMessage[];
  onProcess?: () => void;
}) {
  return (
    <section className="flex-1 w-full flex flex-col h-full bg-[#FFFFFF] border-t border-[#EAECF0] rounded-[24px] animate-fade-in">
      {/* Header */}
      <div className="flex flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-1">
          {providerLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={providerLogoUrl} alt="logo" className="h-8 w-8 rounded" />
          ) : (
            <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-[#344054]  text-xs">
              {providerName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="flex items-center">
            <p className="font-meduium text-[#344054]">{providerName}</p>
            <span className="inline-flex items-center text-xs font-medium text-white bg-red-500 px-2 rounded-full">
              <Timer className="h-1 w-1" /> {timer}
            </span>
          </div>
        </div>
        <div className="flex">
          <p className="text-xs text-gray-500"> {policyNumber}</p>
          <div>
            {channel === "WhatsApp" ? (
              <img src="/icons/Vector.png" alt="whatsapp" />
            ) : (
              <img src="/icons/gmail.png" alt="Gmail" />
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m) => {
          if (m.type === "request") {
            return (
              <div
                key={m.id}
                className="max-w-xl bg-[#027FA31A] border border-blue-100 rounded-2xl p-3"
              >
                <div className="text-sm text-[#344054]">
                  <p className="font-normal text-[#344054]">
                    {m.patientName} • {m.patientType}
                  </p>
                  <p className="mt-1">
                    <span className="font-normal">Procedure:</span>{" "}
                    {m.procedure}
                  </p>
                  <p className="mt-1">
                    <span className="font-normal">Est. cost:</span>{" "}
                    {m.estimatedCost}
                  </p>
                  <p className="mt-2">{m.message}</p>
                </div>
                <p className="mt-1 text-xs text-gray-400">{m.timestamp}</p>
              </div>
            );
          }
          if (m.type === "admin") {
            return (
              <div key={m.id} className="max-w-xl  ">
                <p className="text-sm  border border-gray-200 rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px]  p-2 bg-[#F1F1F1] text-[#344054]">
                  {m.text}
                </p>
                <p className="mt-1 text-xs text-gray-400">{m.timestamp}</p>
              </div>
            );
          }
          if (m.type === "code") {
            return (
              <div
                key={m.id}
                className="max-w-sm rounded-2xl p-3 bg-cyan-700 text-white shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide opacity-80">
                    PA Code
                  </span>
                </div>
                <div className="mt-1 text-lg font-semibold tracking-wider">
                  {m.code}
                </div>
                <p className="mt-1 text-[10px] opacity-80">{m.timestamp}</p>
              </div>
            );
          }
          return (
            <button
              key={m.id}
              className="max-w-xs bg-[#027FA3] text-white rounded-2xl px-3 py-2 inline-flex items-center gap-2 "
              onClick={() => onProcess?.()}
            >
              <span className="text-sm font-medium">{m.text}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      {/* Input */}
      <div className="border-b border-[#EAECF0] rounded-[24px]  p-3 bg-white">
        <div className="flex flex-col  items-start gap-2 bg-[#FFFFFF] rounded-[15px] border border-[#EAECF0] px-3 py-5">
          <input
            placeholder="Type something here..."
            className="flex-1 outline-none text-sm placeholder:text-gray-400"
          />
          <div className="flex flex-1 gap-[15rem] mt-4 ">
            <button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100">
              <Paperclip className="h-4 w-4 text-gray-500" />
            </button>

            <button className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[#E5F2F6]">
              <img src="/icons/send-2.svg" alt="message" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConversationDetailColumn;
