'use client';

import { useState, useEffect, useCallback } from "react";
// Icons are used in the component's JSX
import NewRequestModal from "../components/modals/NewRequestModal";

// Types will be used in future implementation
// interface PatientDetails {
//   patientName: string;
//   policyNumber: string;
//   healthcareProvider: string;
//   procedure: string;
//   estimatedCost: string;
//   description: string;
// }

// Message interface will be used in future chat/messaging functionality
// interface Message {
//   id: number;
//   type: "patient-details" | "reply" | "code";
//   content: PatientDetails | string;
//   sender?: string;
//   timestamp: string;
// }

interface Interaction {
  id: number;
  name: string;
  organization: string;
  role: string;
  status: string;
  timestamp: string;
  isRead: boolean;
  avatar: string;
  socialIcons: ('whatsapp' | 'gmail')[];
}

// Mock data for interactions
const mockInteractions: Interaction[] = [
  {
    id: 1,
    name: "Muhammad Sahab",
    organization: "Songhai Health Trust",
    role: "Principal",
    status: "Read",
    timestamp: "12/10/23 • 9:32AM",
    isRead: true,
    avatar: "S",
    socialIcons: ['whatsapp']
  },
  // ... rest of your mock data
];

interface PACodeContentProps {
  searchParam: string;
}

export default function PACodeContent({ searchParam }: PACodeContentProps) {
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  // selectedInteraction will be used for future interaction selection
  const [, setSelectedInteraction] = useState<number | null>(1);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  // These will be used in future UI implementation
  // const tabs = ["All", "Unread", "Overdue", "Resolved"];
  // const detailTabs = ["Unprocessed", "Processed"];

  // Handle search parameter from props
  const handleSearchParam = useCallback(() => {
    if (!searchParam) return;
    
    // Parse the search parameter (format: "FirstName LastName")
    const nameParts = decodeURIComponent(searchParam).split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    if (!fullName) return;
    
    // Check if patient already exists
    const existingPatient = interactions.find(p => 
      p.name.toLowerCase() === fullName.toLowerCase()
    );

    if (existingPatient) {
      setSelectedInteraction(existingPatient.id);
    } else {
      // Add new patient from search
      const newPatient: Interaction = {
        id: Math.max(0, ...interactions.map(i => i.id)) + 1,
        name: fullName,
        organization: "Unknown Organization",
        role: "Patient",
        status: "Unread",
        timestamp: new Date().toLocaleDateString('en-US', { 
          month: '2-digit', 
          day: '2-digit', 
          year: '2-digit' 
        }) + ' • ' + new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        isRead: false,
        avatar: fullName.split(' ').map(n => n[0]).join('').toUpperCase(),
        socialIcons: []
      };
      
      setInteractions(prev => [...prev, newPatient]);
      setSelectedInteraction(newPatient.id);
    }
  }, [searchParam, interactions]);

  useEffect(() => {
    handleSearchParam();
  }, [handleSearchParam]);

  // ... rest of your component code
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out -translate-x-full md:translate-x-0 md:relative">
        {/* Sidebar content */}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">PA Code</h1>
          {/* Rest of your sidebar content */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {/* Rest of your main content */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">PA Code Management</h2>
            <p className="text-gray-600">Manage your PA codes and requests</p>
          </div>
          
          {/* Your existing content here */}
          
        </main>
      </div>

      {/* New Request Modal */}
      <NewRequestModal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onCreateRequest={(requestData) => {
          // Handle new request creation
          console.log('New request created:', requestData);
          setShowNewRequestModal(false);
        }}
      />
    </div>
  );
}
