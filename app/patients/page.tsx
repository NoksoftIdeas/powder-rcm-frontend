"use client";
import React, { useState } from "react";
import PatientsTable from "./PatientsTable";
import Pagination from "./Pagination";
import AddPatientModal from "../components/modals/AddPatientModal";
import { withAuth } from "../components/auth/withAuth";

interface Patient {
  patientId: string;
  name: string;
  enrolleeId: string;
  hmo: string;
  plan: string;
  role: string;
}

const initialPatients = [
  {
    patientId: "13/OJ/WTE27O",
    name: "Muhammad Sahab",
    enrolleeId: "13/OJ/WTE27O",
    hmo: "Songhai Health Trust",
    plan: "Basic",
    role: "Principal",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
  {
    patientId: "13/OJ/9JR42N",
    name: "Chidinma Isaac",
    enrolleeId: "13/OJ/9JR42N",
    hmo: "Ally Healthcare",
    plan: "Family Plan",
    role: "Spouse",
  },
];

function PatientsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;
  
  // Filter patients based on search term (name or ID)
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.patientId.toLowerCase().includes(searchLower) ||
      patient.enrolleeId.toLowerCase().includes(searchLower)
    );
  });
  
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddPatient = (newPatient: Omit<Patient, 'patientId'>) => {
    console.log('Adding new patient:', newPatient);
    // Use the enrolleeId as patientId if provided, otherwise generate a random one
    const patientId = newPatient.enrolleeId || `PT${Math.floor(10000 + Math.random() * 90000)}`;
    const updatedPatients = [...patients, { ...newPatient, patientId }];
    console.log('Updated patients list:', updatedPatients);
    setPatients(updatedPatients);
    // Calculate the page where the new patient will be and navigate to it
    const newPatientPage = Math.ceil((patients.length + 1) / itemsPerPage);
    setCurrentPage(newPatientPage);
    setModalOpen(false);
  };

  return (
    <div className="py-4 px-5 border-[1px] border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">
        {searchTerm 
          ? `Found ${filteredPatients.length} ${filteredPatients.length === 1 ? 'patient' : 'patients'}`
          : `You have ${patients.length.toLocaleString()} patients`}
      </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-teal-500 text-sm bg-gray-200"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="7" strokeWidth="2"/><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </div>
          <button
            className="ml-2 px-4 py-2 rounded-md bg-cyan-700 text-white font-semibold shadow hover:bg-cyan-800 whitespace-nowrap"
            onClick={() => setModalOpen(true)}
          >
            + Add Patient
          </button>
        </div>
      </div>
      <PatientsTable patients={currentPatients} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <AddPatientModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
}

export default withAuth(PatientsPage);
