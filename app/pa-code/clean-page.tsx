"use client";

import { useState, useEffect } from "react";
import { 
  Search, MoreVertical, Calendar, Clock, 
  Phone, Mail, User, FileText, CreditCard, 
  ChevronDown, ChevronUp, Filter, CheckCircle2, XCircle 
} from "lucide-react";

type Patient = {
  id: number;
  name: string;
  insurance: string;
  policyNumber: string;
  nextAppointment: string;
  status: 'active' | 'inactive' | 'pending';
  phone: string;
  email: string;
  doctor: string;
  diagnosis: string;
};

type PAStatus = 'Active' | 'Pending' | 'Expired' | 'Rejected' | 'Approved';

type PARequest = {
  id: number;
  patientId: number;
  code: string;
  status: PAStatus;
  notes: string;
  requestedDate: string;
  approvedDate?: string;
  approvedBy?: string;
  requestedBy: string;
  diagnosis: string;
  requestedProcedures: string[];
};

export default function PaCodePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [paCode, setPaCode] = useState('');
  const [status, setStatus] = useState<PAStatus>('Pending');
  const [notes, setNotes] = useState('');
  
  // Sample patient data
  const patients: Patient[] = [
    {
      id: 1,
      name: 'Adebayo Ogunlesi',
      insurance: 'Axa Mansard',
      policyNumber: 'AXA-7890-4567-1234',
      nextAppointment: 'Tomorrow, 10:00 AM',
      status: 'active',
      phone: '+234 812 345 6789',
      email: 'adebayo.ogunlesi@example.com',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension Stage 2',
    },
    {
      id: 2,
      name: 'Chioma Okonkwo',
      insurance: 'Hygeia HMO',
      policyNumber: 'HYG-1234-5678',
      nextAppointment: 'Next Monday, 2:00 PM',
      status: 'active',
      phone: '+234 813 456 7890',
      email: 'chioma.o@example.com',
      doctor: 'Dr. James Wilson',
      diagnosis: 'Type 2 Diabetes',
    }
  ];

  // Set first patient as selected by default
  useEffect(() => {
    if (patients.length > 0 && !selectedPatient) {
      setSelectedPatient(patients[0]);
    }
  }, [patients, selectedPatient]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSavePACode = () => {
    console.log('Saving PA Code:', { paCode, status, notes });
    // API call would go here
  };

  if (!selectedPatient) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Patient List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
          {filteredPatients.map(patient => (
            <div 
              key={patient.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedPatient?.id === patient.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedPatient(patient)}
            >
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.insurance}</p>
              <p className="text-xs text-gray-500">ID: {patient.policyNumber}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Patient Details */}
      <div className="w-96 border-r bg-white p-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-lg font-semibold">{selectedPatient.name}</h2>
            <p className="text-sm text-gray-500">ID: {selectedPatient.policyNumber}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">{selectedPatient.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">{selectedPatient.email}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Appointment</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedPatient.nextAppointment}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Diagnosis</h3>
            <p className="text-sm text-gray-600">{selectedPatient.diagnosis}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Doctor</h3>
            <p className="text-sm text-gray-600">{selectedPatient.doctor}</p>
          </div>
        </div>
      </div>
      
      {/* PA Code Form */}
      <div className="flex-1 p-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">PA Code Update</h1>
          
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">PA Code Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">PA Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={paCode}
                  onChange={(e) => setPaCode(e.target.value)}
                  placeholder="Enter PA code"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PAStatus)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this PA code"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  className="px-4 py-2 border rounded-md text-sm font-medium"
                  onClick={() => {
                    setPaCode('');
                    setStatus('Pending');
                    setNotes('');
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                  onClick={handleSavePACode}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
