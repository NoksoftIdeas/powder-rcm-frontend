import React from 'react';

interface EditTariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  tariff?: {
    service: string;
    category: string;
    cost: string;
    status: string;
  };
}

export const EditTariffModal: React.FC<EditTariffModalProps> = ({
  isOpen,
  onClose,
  onSave,
  tariff = { service: '', category: '', cost: '' }
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-1">Edit Item</h2>
        <form className="flex flex-col gap-4 flex-1 overflow-y-auto mt-6" onSubmit={onSave} id="edit-tariff-form">
          <label className="block text-sm font-medium mb-1">Service</label>
          <input 
            type="text" 
            name="service"
            className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500" 
            placeholder="Orthopaedic Doctor"
            defaultValue={tariff.service}
            required
          />
          <label className="block text-sm font-medium mb-1">Service Type</label>
          <select 
            name="category"
            className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500"
            defaultValue={tariff.category}
            required
          >
            <option>Consultation</option>
            <option>Service</option>
            <option>Drug</option>
            <option>Laboratory</option>
            <option>Radiology</option>
            <option>Nursing</option>
          </select>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input 
            type="text" 
            name="cost"
            className="w-full rounded-md border px-4 py-2 border-gray-300 focus:border-cyan-500" 
            placeholder="N 20,500"
            defaultValue={tariff.cost}
            required
          />
          <div className="text-xs text-gray-500 mt-4 mb-2">
            By submitting this form, I confirm that the information provided is accurate and true. 
            I understand that providing false information may result in legal consequences and termination of services. 
            I agree to the <a href="/terms" className="underline">Terms and Conditions</a>.
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
