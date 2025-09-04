"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PatientStatus = 'New' | 'Read' | 'Overdue' | 'Resolved';
export type PatientChannel = 'Email' | 'WhatsApp' | 'SMS';
export type PatientType = 'Principal' | 'Spouse' | 'Dependent';

export interface Patient {
  id: string;
  name: string;
  providerName: string;
  patientType: PatientType;
  status: PatientStatus;
  channel: PatientChannel;
  timestamp: string;
  isOverdue: boolean;
  enrolleeId: string;
  hmo: string;
  reason: string;
  lastMessage?: string;
  unreadCount?: number;
  dueDate?: string;
}

interface PaCodeContextType {
  overdueCount: number;
  patients: Patient[];
  setOverdueCount: (count: number) => void;
  updateOverdueCount: () => void;
  addPatient: (patient: Omit<Patient, 'id' | 'timestamp' | 'status'> & { channel: PatientChannel }) => void;
  updatePatientStatus: (enrolleeId: string, status: string) => void;
}

const PaCodeContext = createContext<PaCodeContextType | undefined>(undefined);

export function PaCodeProvider({ children }: { children: ReactNode }) {
  const [overdueCount, setOverdueCount] = useState(0);
  const [patients, setPatients] = useState<Patient[]>([]);

  // Function to calculate overdue count based on patients data
  const updateOverdueCount = () => {
    // Calculate overdue count based on patients with isOverdue flag set to true
    const overduePatients = patients.filter(patient => patient.isOverdue);
    setOverdueCount(overduePatients.length);
  };

  // Update overdue count on mount and periodically
  useEffect(() => {
    updateOverdueCount();
    
    // Update every 30 seconds for demo purposes
    const interval = setInterval(updateOverdueCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const addPatient = (patientData: Omit<Patient, 'id' | 'timestamp' | 'status'> & { channel: PatientChannel }) => {
    if (!patientData.channel) {
      throw new Error('Channel is required when adding a new patient');
    }

    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'New',
      lastMessage: patientData.reason || 'New request',
      unreadCount: 1,
      dueDate: patientData.isOverdue ? new Date().toISOString() : undefined
    };
    setPatients(prev => [newPatient, ...prev]);
    updateOverdueCount();
  };

  const updatePatientStatus = (enrolleeId: string, newStatus: string) => {
    // Ensure the status is valid, default to 'Read' if invalid
    const status: PatientStatus = 
      (['New', 'Read', 'Overdue', 'Resolved'] as const).includes(newStatus as any)
        ? newStatus as PatientStatus
        : 'Read';

    setPatients(prev => 
      prev.map(patient => 
        patient.enrolleeId === enrolleeId 
          ? { 
              ...patient, 
              status,
              unreadCount: status === 'New' ? (patient.unreadCount || 0) + 1 : 0,
              timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
            } 
          : patient
      )
    );
    updateOverdueCount();
  };

  return (
    <PaCodeContext.Provider value={{ 
      overdueCount, 
      patients,
      setOverdueCount, 
      updateOverdueCount,
      addPatient,
      updatePatientStatus
    }}>
      {children}
    </PaCodeContext.Provider>
  );
}

export function usePaCode() {
  const context = useContext(PaCodeContext);
  if (context === undefined) {
    throw new Error('usePaCode must be used within a PaCodeProvider');
  }
  return context;
}
