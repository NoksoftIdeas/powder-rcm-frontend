"use client";

import React from "react";
import { Mail, MessageCircle, Paperclip, Send, Timer, ArrowRight } from "lucide-react";

export type ConversationMessage =
  | {
      id: string;
      type: "request";
      providerName: string;
      policyNumber: string;
      channel: "WhatsApp" | "Email";
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
  channel: "WhatsApp" | "Email";
  messages: ConversationMessage[];
  onProcess?: () => void;
}) {
  return (
    <section className="flex-1 flex flex-col h-full bg-white animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {providerLogoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={providerLogoUrl} alt="logo" className="h-8 w-8 rounded" />
          ) : (
            <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center text-blue-700 font-semibold text-xs">
              {providerName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900">{providerName}</p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                <Timer className="h-3 w-3" /> {timer}
              </span>
            </div>
            <p className="text-xs text-gray-500">Policy: {policyNumber}</p>
          </div>
        </div>
        <div>
          {channel === "WhatsApp" ? (
            <MessageCircle className="h-5 w-5 text-green-600" />
          ) : (
            <Mail className="h-5 w-5 text-blue-600" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((m) => {
          if (m.type === "request") {
            return (
              <div key={m.id} className="max-w-xl bg-blue-50 border border-blue-100 rounded-2xl p-3">
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900">{m.patientName} • {m.patientType}</p>
                  <p className="mt-1"><span className="font-medium">Procedure:</span> {m.procedure}</p>
                  <p className="mt-1"><span className="font-medium">Est. cost:</span> {m.estimatedCost}</p>
                  <p className="mt-2">{m.message}</p>
                </div>
                <p className="mt-1 text-xs text-gray-400">{m.timestamp}</p>
              </div>
            );
          }
          if (m.type === "admin") {
            return (
              <div key={m.id} className="max-w-xl bg-white border border-gray-200 rounded-2xl p-3">
                <p className="text-sm text-gray-700">{m.text}</p>
                <p className="mt-1 text-xs text-gray-400">{m.timestamp}</p>
              </div>
            );
          }
          if (m.type === "code") {
            return (
              <div key={m.id} className="max-w-sm rounded-2xl p-3 bg-cyan-700 text-white shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide opacity-80">PA Code</span>
                </div>
                <div className="mt-1 text-lg font-semibold tracking-wider">{m.code}</div>
                <p className="mt-1 text-[10px] opacity-80">{m.timestamp}</p>
              </div>
            );
          }
          return (
            <button
              key={m.id}
              className="max-w-xs bg-blue-600 text-white rounded-2xl px-3 py-2 inline-flex items-center gap-2 hover:bg-blue-700"
              onClick={() => onProcess?.()}
            >
              <span className="text-sm font-medium">{m.text}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-3 py-2">
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-gray-100">
            <Paperclip className="h-4 w-4 text-gray-500" />
          </button>
          <input
            placeholder="Type something here..."
            className="flex-1 outline-none text-sm placeholder:text-gray-400"
          />
          <button className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-blue-600 text-white">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ConversationDetailColumn;


