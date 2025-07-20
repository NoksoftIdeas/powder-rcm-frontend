"use client";
import React, { useState } from "react";
import PatientsTable from "./PatientsTable";
import Pagination from "./Pagination";
import AddPatientModal from "../components/modals/AddPatientModal";
import { withAuth } from "../components/auth/withAuth";

function PatientsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">You have 5,395 patients</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search Patients"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:border-teal-500 focus:ring-teal-500 text-sm bg-gray-200"
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
      <PatientsTable />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <AddPatientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default withAuth(PatientsPage);
