"use client";

import React, { useState } from "react";
import { X, Search, Plus, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
};

type MedicalDetail = {
  label: string;
  value: string | string[];
};

type NewRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (services: Service[]) => void;
};

const CATEGORIES = ["Drugs", "Lab", "Radiology", "Procedure"];

export function NewRequestModal({ isOpen, onClose, onSubmit }: NewRequestModalProps) {
  const [channel, setChannel] = useState("WhatsApp");
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const patientDetails = {
    name: "Muhammad Sahab",
    id: "13/O/W7E270",
    hmo: "Reliance HMO",
  };

  const medicalDetails: MedicalDetail[] = [
    { label: "Diagnosis", value: "ACUTE PHARYNGOTONSILITIS R/O MALARIA" },
    { 
      label: "Prescription", 
      value: [
        "Capsule Doxycycline 100mg bd x 5/7",
        "Tablet Paracetamol 1g tds x 3/7 (if feverish)",
        "Tablet Ibuprofen 400mg tds x 3/7 (if throat pain)",
        "Tablet Vitamin C 1000mg od x 7/7"
      ] 
    },
    { label: "Radiology", value: ["N/A"] },
    { label: "Lab", value: ["FBC", "MP", "THROAT SWAB"] },
    { label: "Drugs", value: ["TETANUS TOXOID INJ"] },
    { label: "Services", value: ["N/A"] },
  ];
  
  const sampleServices = [
    { id: "1", name: "Drug3361 - TETANUS TOXOID INJ", price: 700, quantity: 1, category: "Drugs" },
    { id: "2", name: "Lab Test - Complete Blood Count", price: 1500, quantity: 1, category: "Lab" },
    { id: "3", name: "X-ray - Chest PA", price: 2500, quantity: 1, category: "Radiology" },
  ];

  const handleAddService = () => {
    if (!searchQuery.trim()) return;
    
    const newService: Service = {
      id: Date.now().toString(),
      name: searchQuery,
      price: 700, // Default price, can be dynamic
      quantity: 1,
      category: "Drugs",
    };

    setServices([...services, newService]);
    setSearchQuery("");
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateServiceQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    setServices(services.map(service => 
      service.id === id ? { ...service, quantity: newQuantity } : service
    ));
  };

  const updateServiceCategory = (id: string, newCategory: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, category: newCategory } : service
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[90vh]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">New request</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Send out an authorization request to a patient's HMO
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Patient Info */}
              <div className="space-y-6">
                {/* Patient Card */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <span className="font-medium">
                        {patientDetails.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{patientDetails.name}</h3>
                      <p className="text-xs text-gray-500">ID: {patientDetails.id}</p>
                      <p className="text-sm text-gray-700">{patientDetails.hmo}</p>
                    </div>
                  </div>
                </div>

                {/* Medical Details */}
                <div className="space-y-4">
                  {medicalDetails.map((detail, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-700">{detail.label}</h4>
                      {Array.isArray(detail.value) ? (
                        <ul className="text-sm text-gray-600 space-y-1">
                          {detail.value.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-600">{detail.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Service Request */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Channel
                  </label>
                  <div className="relative">
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                      <option value="SMS">SMS</option>
                      <option value="Portal">Portal</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">The channel you want to communicate with the HMO</p>
                </div>

                {/* Services Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search services"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        onClick={handleAddService}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Add services you wish to request for the patient</p>
                  </div>

                  {/* Services List */}
                  <div className="space-y-3">
                    {services.length === 0 ? (
                      <div className="text-center py-8">
                        <Search className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">No services added yet</p>
                        <p className="text-xs text-gray-400">Search and add services above</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {services.map((service) => (
                          <div key={service.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {service.name}
                              </p>
                              <p className="text-xs text-gray-500">₦{service.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateServiceQuantity(service.id, service.quantity - 1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-sm w-8 text-center">
                                  {service.quantity}
                                </span>
                                <button
                                  onClick={() => updateServiceQuantity(service.id, service.quantity + 1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              <select
                                value={service.category}
                                onChange={(e) => updateServiceCategory(service.id, e.target.value)}
                                className="text-xs border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              >
                                {CATEGORIES.map((category) => (
                                  <option key={category} value={category}>
                                    {category}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleRemoveService(service.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onSubmit(services)}
                disabled={services.length === 0}
                className={cn(
                  "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  services.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
