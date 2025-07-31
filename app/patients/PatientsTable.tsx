import React from "react";

interface Patient {
  patientId: string;
  name: string;
  enrolleeId: string;
  hmo: string;
  plan: string;
  role: string;
}

interface PatientsTableProps {
  patients: Patient[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <div className=" bg-white rounded-xl shadow border-[1px] border-gray-200  mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient ID</th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient Name</th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrollee ID</th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">HMO</th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
            <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-3 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">&nbsp;</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {patients.map((patient, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.patientId}</td>
              <td className="px-3 py-4 whitespace-nowrap font-bold text-sm text-gray-900">{patient.name}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.enrolleeId}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.hmo}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.plan}</td>
              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{patient.role}</td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-gray-400">
                <button className="p-2 rounded hover:bg-gray-100">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="5" r="1.5"/>
                    <circle cx="12" cy="12" r="1.5"/>
                    <circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
