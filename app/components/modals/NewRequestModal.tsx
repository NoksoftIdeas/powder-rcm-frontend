"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X, Trash2, Check, X as XIcon } from "lucide-react";
import { Button } from "../ui/button";

// Types
interface Patient {
  id: string;
  name: string;
  hmo: string;
  status?: 'checking' | 'eligible' | 'ineligible';
  statusMessage?: string;
}

interface Service {
  id: string;
  name: string;
  code: string;
  price: number;
  category: string;
  quantity: number;
}

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRequest: (requestData: any) => void;
}

// Mock data
const mockPatients: Patient[] = [
  { 
    id: 'PAT-001', 
    name: 'John Doe', 
    hmo: 'Allianz Health', 
    status: 'eligible',
    statusMessage: 'Patient eligible'
  },
  { 
    id: 'PAT-002', 
    name: 'Jane Smith', 
    hmo: 'AXA Mansard', 
    status: 'eligible',
    statusMessage: 'Patient eligible'
  },
  { 
    id: 'PAT-003', 
    name: 'Robert Johnson', 
    hmo: 'Hygeia HMO', 
    status: 'ineligible',
    statusMessage: 'No active records'
  },
];

const serviceOptions: Service[] = [
  { id: '1', name: 'Tetanus Toxoid Injection', code: 'Drug3361', price: 700, category: 'Drugs', quantity: 1 },
  { id: '2', name: 'Consultation - General', code: 'CONS-001', price: 5000, category: 'Consultation', quantity: 1 },
  { id: '3', name: 'X-Ray - Chest', code: 'XRAY-001', price: 15000, category: 'Radiology', quantity: 1 },
  { id: '4', name: 'Blood Test - Full Count', code: 'LAB-001', price: 8000, category: 'Laboratory', quantity: 1 },
];

const channelOptions = ["WhatsApp", "Email", "SMS", "Phone"];

const NewRequestModal = ({ isOpen, onClose, onCreateRequest }: NewRequestModalProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedChannel, setSelectedChannel] = useState('WhatsApp'); 
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsFormValid(selectedPatient !== null && selectedServices.length > 0);
  }, [selectedPatient, selectedServices]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPatientDropdown(false);
        setShowServicesDropdown(false);
        setShowChannelDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientDropdown(false);
    setSearchTerm('');
    
    if (patient.status === 'eligible') {
      setIsCheckingEligibility(true);
      setTimeout(() => {
        setIsCheckingEligibility(false);
      }, 1500);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedServices([...selectedServices, { ...service, id: Date.now().toString() }]);
    setShowServicesDropdown(false);
  };

  const removeService = (id: string) => {
    setSelectedServices(selectedServices.filter(service => service.id !== id));
  };

  const updateServiceQuantity = (id: string, quantity: number) => {
    setSelectedServices(selectedServices.map(service => 
      service.id === id ? { ...service, quantity } : service
    ));
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    
    const requestData = {
      patient: selectedPatient,
      channel: selectedChannel,
      services: selectedServices,
      total: selectedServices.reduce((sum, service) => sum + (service.price * service.quantity), 0)
    };
    onCreateRequest(requestData);
    onClose();
  };

  if (!isOpen) return null;

  const filteredPatients = searchTerm
    ? mockPatients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">New request</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient ID
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or ID"
                className="w-full p-2 border rounded-md pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowPatientDropdown(true)}
                ref={searchRef}
                aria-label="Search patients"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            {showPatientDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border max-h-60 overflow-y-auto">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map(patient => (
                    <div
                      key={patient.id}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-500">ID: {patient.id} • {patient.hmo}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-gray-500">No patients found</div>
                )}
              </div>
            )}
          </div>

          <div className="mb-6 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Channel
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full p-2 border rounded-md text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={() => setShowChannelDropdown(!showChannelDropdown)}
                aria-haspopup="listbox"
                aria-expanded={showChannelDropdown}
              >
                <span>{selectedChannel}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              {showChannelDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border">
                  {channelOptions.map((channel) => (
                    <div
                      key={channel}
                      className="p-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedChannel(channel);
                        setShowChannelDropdown(false);
                      }}
                    >
                      {channel}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Services
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search services"
                className="w-full p-2 border rounded-md pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onFocus={() => setShowServicesDropdown(true)}
                aria-label="Search services"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {showServicesDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border max-h-60 overflow-y-auto">
                {serviceOptions.map((service) => (
                  <div
                    key={service.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{service.name}</span>
                      <span className="text-blue-600">₦{service.price.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">{service.code} • {service.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'} text-white`}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRequestModal;