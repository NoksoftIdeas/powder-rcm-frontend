"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface HMOFormData {
  logo: File | null;
  name: string;
  email: string;
  phone: string;
  paCode: string;
}

interface AddHmoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHMO: (hmoData: Omit<HMOFormData, 'logo'> & { logo: string | null }) => void;
}

export default function AddHmoModal({ isOpen, onClose, onAddHMO }: AddHmoModalProps) {
  const [form, setForm] = useState<HMOFormData>({
    logo: null,
    name: "",
    email: "",
    phone: "",
    paCode: "",
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.paCode.trim()) errs.paCode = "PA Code is required";
    
    setError(errs);
    if (Object.keys(errs).length > 0) return;

    // Prepare data for parent component
    onAddHMO({
      ...form,
      logo: form.logo ? URL.createObjectURL(form.logo) : null,
    });
    
    // Reset form
    setForm({ logo: null, name: "", email: "", phone: "", paCode: "" });
    setLogoPreview(null);
    setError({});
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end bg-[#014C654D] backdrop-blur-[0.3px]" 
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl pt-3 px-8 relative animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}
        
        <h2 className="text-2xl font-bold mb-1">Add HMO</h2>
        <p className="text-gray-500 text-sm mb-2">Create a profile for a partner HMO</p>
        
        <form className="flex flex-col gap-2 flex-1" onSubmit={handleSubmit}>
          <div className="flex flex-row items-center gap-4 mb-2">
            <div className="relative">
              <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                {logoPreview ? (
                  <Image 
                    src={logoPreview} 
                    alt="Logo preview" 
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#9ca3af">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path d="M8 12l2 2 4-4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#4b5563">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">HMO Logo</p>
              <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (max. 2MB)</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">HMO Name</label>
            <input
              type="text"
              className={`w-full rounded-md border px-4 py-2 ${
                error.name ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-cyan-500"
              }`}
              placeholder="Ally Healthcare"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            {error.name && <div className="text-xs text-red-500 mt-1">{error.name}</div>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">HMO Admin Email</label>
            <input
              type="email"
              className={`w-full rounded-md border px-4 py-2 ${
                error.email ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-cyan-500"
              }`}
              placeholder="admin@hmo.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
            {error.email && <div className="text-xs text-red-500 mt-1">{error.email}</div>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">HMO Admin Phone No.</label>
            <input
              type="tel"
              className={`w-full rounded-md border px-4 py-2 ${
                error.phone ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-cyan-500"
              }`}
              placeholder="+234..."
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
            {error.phone && <div className="text-xs text-red-500 mt-1">{error.phone}</div>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sample PA Code</label>
            <input
              type="text"
              className={`w-full rounded-md border px-4 py-2 ${
                error.paCode ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-cyan-500"
              }`}
              placeholder="CGGEFI98398092HJE"
              value={form.paCode}
              onChange={(e) => setForm((f) => ({ ...f, paCode: e.target.value }))}
            />
            {error.paCode && <div className="text-xs text-red-500 mt-1">{error.paCode}</div>}
            <span className="text-xs text-gray-400 mt-1 block">
              Train the system to identify codes sent from the HMO
            </span>
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
