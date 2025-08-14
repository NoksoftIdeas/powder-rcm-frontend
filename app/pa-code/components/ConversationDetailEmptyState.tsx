"use client";

import React from "react";
import { FileText, Send } from "lucide-react";

export function ConversationDetailEmptyState({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <section className="flex-1 flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-8">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full ring-8 ring-blue-50" />
            <FileText className="h-10 w-10 text-[#3B82F6] relative" />
          </div>
          <h3 className="text-gray-900 text-lg font-medium">Feels empty here</h3>
          <p className="mt-1 text-sm text-gray-500 max-w-md">
            Select an interaction or create a new request to start communicating with a HMO.
          </p>
          <div className="mt-6">
            <button
              onClick={onCreateNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-sm font-medium"
            >
              New Request
            </button>
          </div>
        </div>
      </div>

      {/* Bottom input bar */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-3 py-2">
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

export default ConversationDetailEmptyState;


