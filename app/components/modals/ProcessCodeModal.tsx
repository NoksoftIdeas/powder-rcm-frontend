import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type ProcessItem = {
  id: string;
  label: string;
  checked: boolean;
  type: "primary" | "secondary";
};

interface ProcessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  referenceCode: string;
  onSubmit: (items: ProcessItem[]) => void;
  initialItems?: ProcessItem[];
}

export default function ProcessCodeModal({
  isOpen,
  onClose,
  referenceCode,
  onSubmit,
  initialItems = [
    {
      id: "1",
      label: "Consultation – Orthopedic Doctor",
      checked: true,
      type: "primary",
    },
    {
      id: "2",
      label: "Admission – Private Room",
      checked: true,
      type: "primary",
    },
    { id: "3", label: "MRI Test", checked: true, type: "primary" },
    { id: "4", label: "Stool v1", checked: false, type: "primary" },
  ],
}: ProcessCodeModalProps) {
  const [items, setItems] = useState<ProcessItem[]>(initialItems);

  const handleItemToggle = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleTypeChange = (id: string, type: "primary" | "secondary") => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, type } : item))
    );
  };

  const handleSubmit = () => {
    onSubmit(items);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#014C654D] backdrop-blur-[0.3px]">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-white">
            {/* Header */}
            <div className="px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[21.33px] font-bold text-[#101828] leading-[32px] ">
                    Process Code
                  </h2>
                  <p className="mt-1 text-sm leading-[21.33px] text-[14.93px] text-[#475467]">
                    {referenceCode}
                  </p>
                </div>
                {/* <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#EAECF0]" />

            {/* Process Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id={`item-${item.id}`}
                        name={`item-${item.id}`}
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => handleItemToggle(item.id)}
                        className="h-4 w-4 rounded border-[#D0D5DD] bg-[#027FA3] text-[#ffff]"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-medium text-gray-700"
                      >
                        {item.label}
                      </label>
                    </div>
                    <div className="ml-4">
                      <select
                        className={`rounded-[8.53px] border-[1.07px] border-[#D0D5DD] py-[10.67px] px-[14.93px] text-smfocus:outline-none text-[16px] text-[#344054]  ${
                          !item.checked
                            ? "bg-gray-100 text-gray-400 text-[14px]"
                            : "bg-[#FFFFFF] text-[14px] text-[#101828]"
                        }`}
                        value={item.type}
                        onChange={(e) =>
                          handleTypeChange(
                            item.id,
                            e.target.value as "primary" | "secondary"
                          )
                        }
                        disabled={!item.checked}
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#EAECF0] p-4 ">
              <div className="flex justify-between space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[8.53px] border-[1.07px] border-[#D0D5DD] bg-[#FFFFFF] px-[14.93px] py-[10.67px] text-[14.93px] font-bold text-[#344054] focus:outline-none  focus:ring-offset-2 leading-[21.33px] "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-[8.53px] border-[1.07px] border-transparent bg-[#027FA3] py-[10.67px] px-[14.93px] text-[14.93px] font-bold text-[#FFFFFF] leading-[21.33px]  focus:outline-none"
                >
                  Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
