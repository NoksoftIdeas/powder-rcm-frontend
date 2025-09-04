"use client";

import React, { useState } from "react";

interface TariffItem {
  name: string;
  category: string;
  cost: string;
}

interface AddTariffItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (items: TariffItem[]) => void;
}

export function AddTariffItemModal({ isOpen, onClose, onSubmit }: AddTariffItemModalProps) {
  const [formData, setFormData] = useState([
    { name: "", category: "", cost: "" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out any empty items before submitting
    const validItems = formData.filter(item => 
      item.name.trim() !== '' || item.category.trim() !== '' || item.cost.trim() !== ''
    );
    
    if (validItems.length > 0) {
      onSubmit(validItems);
      onClose();
    }
  };

  const addMoreFields = () => {
    setFormData([...formData, { name: "", category: "", cost: "" }]);
  };

  const removeField = (index: number) => {
    if (formData.length > 1) {
      const newFormData = [...formData];
      newFormData.splice(index, 1);
      setFormData(newFormData);
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { ...updatedFormData[index], [field]: value };
    setFormData(updatedFormData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#014C654D] backdrop-blur-[0.3px]"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl p-8 relative animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Add Item</h2>
            <p className="text-sm text-gray-500">Add new items to the tariff plan</p>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 13.3333V10" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 6.66669H10.0083" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 mb-1">Tariff for Red Diamond</h4>
              <p className="text-xs text-gray-500">
                By submitting this form, I confirm that the information provided is accurate and true. I understand that providing false information may result in legal consequences and termination of services.
              </p>
            </div>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 flex-1 overflow-y-auto"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {formData.map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-gray-700">Item {idx + 1}</h3>
                  {formData.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 text-sm"
                      onClick={() => removeField(idx)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border px-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                      placeholder="e.g. Diamond - Corporate"
                      value={item.name}
                      onChange={(e) => handleChange(idx, "name", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
                    <select 
                      className="w-full rounded-lg border px-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm bg-white"
                      value={item.category}
                      onChange={(e) => handleChange(idx, "category", e.target.value)}
                    >
                      <option value="">Select category</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Service">Service</option>
                      <option value="Drug">Drug</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Nursing">Nursing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost (₦)</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border pl-10 pr-4 py-2.5 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                        placeholder="0.00"
                        value={item.cost}
                        onChange={(e) => handleChange(idx, "cost", e.target.value)}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 mt-2"
              onClick={addMoreFields}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4.16669V15.8334M4.16663 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add another item
            </button>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
