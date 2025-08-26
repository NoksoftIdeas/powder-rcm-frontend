"use client";
import React, { useState } from "react";
import PatientsTable from "./PatientsTable";
import Pagination from "@/app/components/ui/Pagination";
import AddPatientModal from "../components/modals/AddPatientModal";
import { withAuth } from "../components/auth/withAuth";
import { Patient, initialPatients as sharedPatients } from "../data/patients";

function PatientsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState<Patient[]>(sharedPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  
  // Filter patients based on search term (name, patientId, or enrolleeId)
  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.patientId.toLowerCase().includes(searchLower) ||
      patient.enrolleeId.toLowerCase().includes(searchLower)
    );
  });
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddPatient = (newPatient: Patient) => {
    console.log('Adding new patient:', newPatient);
    
    if (patients.some(p => p.patientId === newPatient.patientId)) {
      alert('A patient with this ID already exists. Please use a different ID.');
      return;
    }
    
    const updatedPatients = [...patients, newPatient];
    console.log('Updated patients list:', updatedPatients);
    setPatients(updatedPatients);
    const newPatientPage = Math.ceil((patients.length + 1) / itemsPerPage);
    setCurrentPage(newPatientPage);
    setModalOpen(false);
  };

  return (
    <div className="py-4 px-5 border-[1px] border-gray-200 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-3">
        <h1 className="text-2xl text-[#344054] font-bold mb-2 sm:mb-0">
          {searchTerm 
            ? `Found ${filteredPatients.length} ${filteredPatients.length === 1 ? 'patient' : 'patients'}`
            : `You have ${patients.length.toLocaleString()} patients`}
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search Patients"
              className="w-full pl-10 text-[#66666699] pr-4 py-2 rounded-xl border border-[#0000000F] text-sm bg-[#F8F8F8] focus:outline-[#1018280D]"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <span className="absolute left-3 top-2.5 text-[#B4B4B4]">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <button
            className="ml-2 px-4 py-2 rounded-[8px] bg-[#027FA3] text-[#FFFFFF] font-bold  whitespace-nowrap"
            onClick={() => setModalOpen(true)}
          >
            + Add Patient
          </button>
        </div>
      </div>
      <PatientsTable patients={currentPatients} />
      <div className="mt-6 px-4">
      <Pagination
        totalItems={filteredPatients.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      </div>
      <AddPatientModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
}

export default withAuth(PatientsPage);
