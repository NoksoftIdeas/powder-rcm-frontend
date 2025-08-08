import React from "react";

import { Claim } from "./ClaimsTable";
import Logo from "../components/Logo";

interface ClaimInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  claim: Claim | null;
}

export default function ClaimInvoiceModal({
  open,
  onClose,
  claim,
}: ClaimInvoiceModalProps) {
  if (!open || !claim) return null;

  // Example grouped line items structure
  const groupedLineItems = claim.lineItems || [
    {
      code: "CGGEFI98398092HJE",
      items: [{ sn: 1, desc: "Admission Tier 3", price: "₦74,720" }],
    },
    {
      code: "CGGEFI98398092HJE",
      items: [
        { sn: 2, desc: "Malaria", price: "₦5,800" },
        { sn: 3, desc: "Typhoid", price: "₦6,800" },
        { sn: 4, desc: "AMATEM Forte Softgel 20/120", price: "₦3,000" },
      ],
    },
    {
      code: "CGGEFI98398092HJE",
      items: [
        { sn: 5, desc: "Ciprotab 500mg Tablet", price: "₦5,000" },
        { sn: 6, desc: "Panadol Tablet 1x Sachet", price: "₦1,000" },
      ],
    },
  ];
  type GroupType = {
    code: string;
    items: { sn: number; desc: string; price: string }[];
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#014C654D] backdrop-blur-[0.3px]"
      onClick={onClose}
    >
      <div className="absolute right-[180px] top-9 flex flex-col gap-2">
        <button
          className="px-4 py-2 rounded bg-blue-50 text-gray-700 font-semibold text-xs border hover:bg-blue-100"
          onClick={() => {
            // Print only modal content
            const printContents = document.getElementById(
              "claim-invoice-modal-content"
            )?.innerHTML;
            const originalContents = document.body.innerHTML;
            if (printContents) {
              document.body.innerHTML = printContents;
              window.print();
              document.body.innerHTML = originalContents;
              window.location.reload(); // Reload to restore state
            } else {
              window.print();
            }
          }}
        >
          Print
        </button>
        <button
          className="px-4 py-2 rounded bg-gray-50 text-gray-700 font-semibold text-xs border hover:bg-gray-100"
          onClick={() => {
            // Try to use html2pdf.js if available
            type WindowWithHtml2Pdf = Window & {
              html2pdf?: (element: HTMLElement | null) => void;
            };
            const html2pdf = (window as WindowWithHtml2Pdf).html2pdf;
            if (typeof html2pdf === "function") {
              html2pdf(document.getElementById("claim-invoice-modal-content"));
            } else {
              alert(
                "PDF download requires html2pdf.js to be loaded on this page."
              );
            }
          }}
        >
          Download
        </button>
      </div>

      <div
        id="claim-invoice-modal-content"
        className="bg-white w-full max-w-2xl shadow-xl rounded-xl relative animate-fade-in md:max-h-[90vh] md:min-w-[32rem]"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex  items-center justify-between border-b-[1px] border-gray-200 px-8">
          <div className="flex mt-1 items-center w-[10%] gap-4">
            <Logo />
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold text-[#027FA3]">
              {claim.patientName}
            </div>
            <div className="text-xs text-gray-500">
              {claim.hmo || "Ally Healthcare"}
            </div>
            <div className="text-xs text-gray-400">{claim.enrolleeId}</div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="p-8  ">
          <table className="w-full mb-8 min-w-full divide-y divide-gray-100">
            <thead className="">
              <tr className="text-gray-900 capitalize text-xs font-bold">
                <th className="text-left text-sm pb-4">S/N</th>
                <th className="text-left text-sm pb-4">Description</th>
                <th className="text-left text-sm pb-4">Price</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500 py-1.5 bg-white divide-y divide-gray-100">
              {groupedLineItems.map((group: GroupType, gIdx: number) => (
                <React.Fragment key={gIdx}>
                  <tr className={gIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className=" mr-[-160%] text-gray-900 font-semibold flex justify-center  ">{group.code}</td>
                    <td colSpan={2}></td>
                  </tr>
                  {group.items.map(
                    (
                      item: { sn: number; desc: string; price: string },
                      iIdx: number
                    ) => (
                      <tr key={iIdx}>
                        <td>{item.sn}</td>
                        <td>{item.desc} </td>
                        <td>{item.price}</td>
                      </tr>
                    )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end p-2">
            <p>Signature</p>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col justify-between rounded-sm py-1 px-3 bg-gray-100 gap-1 mb-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-700 font-semibold">₦96,320</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax (10%)</span>
              <span className="text-gray-700 font-semibold">₦9,632</span>
            </div>
            <div className="flex justify-between   mt-2">
              <span className="text-[#027FA3] font-bold">Total due</span>
              <span className="text-[#027FA3] font-bold text-lg">
                ₦86,686.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
