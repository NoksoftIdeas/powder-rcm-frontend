"use client";

import React, { useState, useEffect } from "react";
import { Search, X, Plus, Minus, Trash2 } from "lucide-react";
import { PatientChannel } from "@/app/pa-code/context/PaCodeContext";
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

interface Request {
  id: string;
  firstName: string;
  lastName: string;
  hmo: string;
  date: string;
  status: string;
  requestedBy: string;
}

type NewRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (services: Service[], channel: string) => void;
  request: Request | null;
};

const CATEGORIES = ["Drugs", "Lab", "Radiology", "Procedure"];

export function NewRequestModal({
  isOpen,
  onClose,
  onSubmit,
  request,
}: NewRequestModalProps) {
  const [channel, setChannel] = useState<PatientChannel | "">("");
  const [channelError, setChannelError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Service[]>([]);

  // Available services for search
  const availableServices: Service[] = [
    {
      id: "1",
      name: "Consultation",
      price: 5000,
      quantity: 1,
      category: "Procedure",
    },
    { id: "2", name: "Lab Test", price: 10000, quantity: 1, category: "Lab" },
    {
      id: "3",
      name: "X-Ray",
      price: 15000,
      quantity: 1,
      category: "Radiology",
    },
    {
      id: "4",
      name: "Ultrasound",
      price: 20000,
      quantity: 1,
      category: "Radiology",
    },
  ];

  const patientDetails = request
    ? {
        name: `${request.firstName} ${request.lastName}`,
        id: request.id,
        hmo: request.hmo,
        requestedBy: request.requestedBy,
        date: new Date(request.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }
    : null;

  const medicalDetails: MedicalDetail[] = [
    { label: "Diagnosis", value: "ACUTE PHARYNGOTONSILITIS R/O MALARIA" },
    {
      label: "Prescription",
      value: [
        "Capsule Doxycycline 100mg bd x 5/7",
        "Tablet Paracetamol 1g tds x 3/7 (if feverish)",
        "Tablet Ibuprofen 400mg tds x 3/7 (if throat pain)",
        "Tablet Vitamin C 1000mg od x 7/7",
      ],
    },
    { label: "Radiology", value: ["N/A"] },
    { label: "Lab", value: ["FBC", "MP", "THROAT SWAB"] },
    { label: "Drugs", value: ["TETANUS TOXOID INJ"] },
    { label: "Services", value: ["N/A"] },
  ];

  const sampleServices = [
    {
      id: "1",
      name: "Drug3361 - TETANUS TOXOID INJ",
      price: 700,
      quantity: 1,
      category: "Drugs",
    },
    {
      id: "2",
      name: "Lab Test - Complete Blood Count",
      price: 1500,
      quantity: 1,
      category: "Lab",
    },
    {
      id: "3",
      name: "X-ray - Chest PA",
      price: 2500,
      quantity: 1,
      category: "Radiology",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const results = availableServices.filter(
      (service) =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() !== "") {
      const results = availableServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleInputBlur = () => {
    // Small delay to allow click events on dropdown items to fire
    setTimeout(() => {
      setSearchResults([]);
    }, 200);
  };

  const handleAddService = (service: Service) => {
    if (!services.some((s) => s.id === service.id)) {
      setServices([...services, { ...service, quantity: 1 }]);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const updateServiceQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setServices(
      services.map((service) =>
        service.id === id ? { ...service, quantity: newQuantity } : service
      )
    );
  };

  const updateServiceCategory = (id: string, newCategory: string) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, category: newCategory } : service
      )
    );
  };

  const handleServiceSubmit = () => {
    // Validate channel is selected
    if (!channel) {
      setChannelError("Please select a communication channel");
      return;
    }

    if (services.length === 0) {
      // Show error or notification that at least one service is required
      return;
    }

    // Submit with the selected channel
    onSubmit(services, channel);
  };

  if (!isOpen || !patientDetails) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-end">
        <div
          className="fixed inset-0 bg-[#014C654D] backdrop-blur-[0.3px]"
          onClick={onClose}
        />

        <div className="relative  bg-white shadow-xl flex flex-row">
          {/* Header */}
          <div className="px-6  border-[1.07px] border-[#EAECF0]">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[21.33px] leading-[32px]  font-bold text-[#101828]">
                  New Request
                </h2>
                <p className="text-[#475467] text-[14.93px] font-normal leading-[21.33px]  ">Send out authorization request to Patient's HMO</p>
              </div>
            </div>

            {/* Left Column - Patient Info */}
            <div className="space-y-2 mt-2.5 border-t-[1px] border-[#EAECF0] ">
              {/* Patient Card */}
              <div className="bg-white p-2 border-b-[1px] border-[#EAECF0]">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 mt-[-2rem] rounded-full flex items-center justify-center text-[#094063]">
                    <span className="font-medium">
                      {patientDetails.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="">
                    <h3 className="font-semibold text-[16px] leading-[21.33px] text-[#344054]">
                      {patientDetails.name}
                    </h3>
                    <p className="leading-[21.33px] font-normal text-[#475467] text-[16px]">
                       {patientDetails.id}
                    </p>
                    <p className="leading-[21.33px] font-normal text-[#475467] text-[16px]">
                      {patientDetails.hmo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medical Details */}
              <div className="space-y-[5px]">
                {medicalDetails.map((detail, index) => (
                  <div key={index} className="space-y-1">
                      <h4 className="text-[14.93px] font-medium text-[#344054] leading-[21.33px] ">
                      {detail.label}
                    </h4>
                    {Array.isArray(detail.value) ? (
                      <ul className=" text-sm leading-[21.33px] text-[#475467] ">
                        {detail.value.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-[#475467] ">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6">
              {/* Right Column - Service Request */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="channel"
                    className="block text-sm leading-[21.33px] font-normal text-[#344054] mb-1"
                  >
                    Channel
                  </label>
                  <select
                    id="channel"
                    className={`w-full px-3 py-2 border text-[#101828] ${
                      channelError ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none`}
                    value={channel}
                    onChange={(e) => {
                      setChannel(e.target.value as PatientChannel);
                      if (channelError) setChannelError("");
                    }}
                    required
                  >
                    <option value="">Select a channel</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="SMS">SMS</option>
                  </select>
                  {channelError ? (
                    <p className="text-xs text-red-600">{channelError}</p>
                  ) : (
                    <p className="text-[14.93px] leading-[14.93px] font-normal text-[#475467]">
                      The channel you want to communicate with the HMO
                    </p>
                  )}
                </div>

                {/* Services Section */}
                <div className="space-y-1">
                  <div className="space-y-2">
                    <label className="block text-sm leading-[21.33px] font-normal text-[#344054] mb-1">
                      Services
                    </label>
                    <div className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search services..."
                          className="w-full px-3 py-2 border border-gray-300 text-[#101828] rounded-md shadow-sm focus:outline-none "
                          value={searchQuery}
                          onChange={handleSearch}
                          onFocus={handleInputFocus}
                          onBlur={handleInputBlur}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      {searchResults.length > 0 && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto">
                          {searchResults.map((service) => (
                            <div
                              key={service.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center border-b border-gray-100 last:border-b-0"
                              onMouseDown={(e) => {
                                e.preventDefault(); // Prevent input blur before click
                                handleAddService(service);
                              }}
                            >
                              <div>
                                <div className="font-medium text-gray-900">
                                  {service.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {service.category}
                                </div>
                              </div>
                              <div className="text-sm font-medium text-blue-600">
                                ₦{service.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="space-y-3">
                    {services.length === 0 ? (
                      <div className="text-start ">
                        <p className="text-[14.93px] leading-[14.93px] font-normal text-[#475467]">Add services you wish to request for patient</p>
                        
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-3 border-r border-gray-200 rounded-lg"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {service.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₦{service.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() =>
                                    updateServiceQuantity(
                                      service.id,
                                      service.quantity - 1
                                    )
                                  }
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-sm w-8 text-center">
                                  {service.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateServiceQuantity(
                                      service.id,
                                      service.quantity + 1
                                    )
                                  }
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              <select
                                value={service.category}
                                onChange={(e) =>
                                  updateServiceCategory(
                                    service.id,
                                    e.target.value
                                  )
                                }
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
                <div className="bottom-1 absolute border-t-[1px] pt-[17px] border-[#EAECF0]  ">
                  <div className="flex justify-center space-x-56">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white  focus:outline-none "
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleServiceSubmit}
                      disabled={services.length === 0}
                      className={cn(
                        "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#027FA3]  focus:outline-none ",
                        services.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      )}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
