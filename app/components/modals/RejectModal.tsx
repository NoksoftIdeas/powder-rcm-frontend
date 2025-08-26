"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { addDenial } from "@/services/denials";

type RejectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  rejectedServices: Array<{
    id: string;
    label: string;
    reason: string;
  }>;
  onReasonChange: (id: string, reason: string) => void;
  onReject: (
    rejectedServices: Array<{ id: string; label: string; reason: string }>
  ) => Promise<void>;
};

export function RejectModal({
  isOpen,
  onClose,
  rejectedServices,
  onReasonChange,
  onReject,
}: RejectModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const handleReject = async () => {
    try {
      setIsSubmitting(true);
      await onReject(rejectedServices);
      // Refresh the denials page to show the new rejections
      router.refresh();
    } catch (error) {
      console.error("Failed to process rejections:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#014C654D] backdrop-blur-[0.3px]" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white transition-transform duration-300 ease-in-out">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[21.33px] leading-[32px] font-bold text-[#101828]">
                  Rejected Services
                </h2>
                <p className="text-sm font-normal text-[#475467]">
                  Record reason for rejection to enable denial management
                </p>
              </div>
              {/* <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {rejectedServices.map((service) => (
              <div key={service.id} className="space-y-2">
                <h3 className="font-normal text-[14.93px] leading-[21.33px] text-[#475467]">{service.label}</h3>
                <div>
                  <label
                    htmlFor={`reason-${service.id}`}
                    className="block text-sm font-normal text-[#344054] mb-1"
                  >
                    Reason
                  </label>
                  <input
                    type="text"
                    id={`reason-${service.id}`}
                    value={service.reason}
                    onChange={(e) => onReasonChange(service.id, e.target.value)}
                    className="w-full rounded-[8.53px] border-[1.07px] border-[#D0D5DD] px-[14.93px] py-[10.67px] text-sm focus:outline-none"
                    placeholder="e.g., Service not covered"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 border-t border-[#EAECF0] bg-white p-4">
            <div className="flex justify-between space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border-[1.07px] border-[#D0D5DD] bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#344054]shadow-sm hover:bg-gray-50 focus:outline-none "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={isSubmitting}
                className="rounded-[8.53px] border-[1.07px] border-[#FF2E3B] bg-[#FF2E3B] px-4 py-2 text-sm font-medium text-[#FFFFFF]  focus:outline-none "
              >
                {isSubmitting ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
