import React from 'react';

interface DeleteTariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  serviceName?: string;
}

export const DeleteTariffModal: React.FC<DeleteTariffModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  serviceName = 'this item'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col justify-center"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Delete Item</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-semibold">{serviceName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-2 mt-6">
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg border bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
