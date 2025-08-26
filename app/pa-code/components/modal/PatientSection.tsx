import { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ArrowPathIcon } from '@heroicons/react/20/solid';
import type { Patient, EligibilityStatus } from './types';

interface PatientSectionProps {
  patientId: string;
  setPatientId: (id: string) => void;
  patient: Patient | null;
  setPatient: (patient: Patient | null) => void;
  eligibilityStatus: EligibilityStatus;
  setEligibilityStatus: (status: EligibilityStatus) => void;
  isSearching: boolean;
  setIsSearching: (isSearching: boolean) => void;
}


export function PatientSection({
  patientId,
  setPatientId,
  patient,
  setPatient,
  eligibilityStatus,
  setEligibilityStatus,
  isSearching,
  setIsSearching
}: PatientSectionProps) {
  // Function to search for patient in the shared patients data
  const searchPatient = async (searchId: string) => {
    if (!searchId.trim()) {
      setPatient(null);
      setEligibilityStatus('idle');
      return;
    }

    setIsSearching(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response - in a real app, this would be an API call
      if (searchId) {
        // Simulate finding a patient only if ID has some content
        if (Math.random() > 0.2) { // 80% chance of finding a patient for demo
          const mockPatient: Patient = {
            id: searchId,
            patientId: searchId,
            name: 'Muhammad Sahab',
            enrolleeId: '13/O/W7EZ7O',
            hmo: 'Reliance HMO',
            role: 'Principal',
            plan: 'Premium'
          };
          setPatient(mockPatient);
          setEligibilityStatus('eligible');
        } else {
          // Simulate patient not found
          setPatient(null);
          setEligibilityStatus('not_found');
        }
      } else {
        // Simulate patient not found
        setPatient(null);
        setEligibilityStatus('not_found');
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      setPatient(null);
      setEligibilityStatus('not_eligible');
    } finally {
      setIsSearching(false);
    }
  };

  // Function to check eligibility
  const checkEligibility = async (patientId: string) => {
    setEligibilityStatus('checking');
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock eligibility check - in a real app, this would be an API call
      const isEligible = Math.random() > 0.3; // 70% chance of being eligible
      setEligibilityStatus(isEligible ? 'eligible' : 'not_eligible');
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setEligibilityStatus('not_eligible');
    }
  };

  // Debounce patient search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchPatient(patientId);
    }, 400);

    return () => clearTimeout(timer);
  }, [patientId]);

  return (
    <div className="space-y-2">
      <label htmlFor="patient-id" className="block text-sm font-medium text-gray-700">
        Patient ID
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          id="patient-id"
          className="block w-full rounded-md border-gray-300 pl-3 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Search patient"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ArrowPathIcon className="h-5 w-5 text-gray-400 animate-spin" />
          </div>
        )}
        {!isSearching && patient && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">
        {!patient && eligibilityStatus !== 'not_found' 
          ? "Which patient would you like to create a request for?"
          : eligibilityStatus === 'not_found'
          ? "No patient found with that ID. Please try another ID."
          : "Patient found!"}
      </p>

      {patient && (
        <div className="mt-4 rounded-md bg-gray-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-500">Enrollee ID: {patient.enrolleeId}</p>
              <p className="text-sm text-gray-500">{patient.hmo} · {patient.role}</p>
              {patient.plan && <p className="text-sm text-gray-500">Plan: {patient.plan}</p>}
              
              {eligibilityStatus === 'checking' && (
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <ArrowPathIcon className="mr-1.5 h-4 w-4 flex-shrink-0 animate-spin" />
                  <span>Checking eligibility...</span>
                </div>
              )}
              
              {eligibilityStatus === 'eligible' && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <CheckIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>Eligible</span>
                </div>
              )}
              
              {eligibilityStatus === 'not_eligible' && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <ExclamationCircleIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>No active records</span>
                </div>
              )}
              {eligibilityStatus === 'not_found' && (
                <div className="mt-2 flex items-center text-sm text-red-600">
                  <ExclamationCircleIcon className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>Patient not found</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
