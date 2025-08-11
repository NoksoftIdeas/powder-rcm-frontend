"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PaCodeContextType {
  overdueCount: number;
  setOverdueCount: (count: number) => void;
  updateOverdueCount: () => void;
}

const PaCodeContext = createContext<PaCodeContextType | undefined>(undefined);

export function PaCodeProvider({ children }: { children: ReactNode }) {
  const [overdueCount, setOverdueCount] = useState(0);

  // Function to calculate overdue count based on conversations
  const updateOverdueCount = () => {
    // This would typically fetch from an API or calculate based on real data
    // For now, we'll use a mock calculation based on the mock data
    // In a real implementation, this would fetch from an API
    const mockOverdueCount = Math.floor(Math.random() * 5); // Random 0-4 for demo
    setOverdueCount(mockOverdueCount);
  };

  // Update overdue count on mount and periodically
  useEffect(() => {
    updateOverdueCount();
    
    // Update every 30 seconds for demo purposes
    const interval = setInterval(updateOverdueCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <PaCodeContext.Provider value={{ overdueCount, setOverdueCount, updateOverdueCount }}>
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
