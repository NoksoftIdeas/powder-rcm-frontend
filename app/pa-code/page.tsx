"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronDown, Paperclip, Send, MessageSquare } from "lucide-react";
import NewRequestModal from "../components/modals/NewRequestModal";

// Types
interface PatientDetails {
  patientName: string;
  policyNumber: string;
  healthcareProvider: string;
  procedure: string;
  estimatedCost: string;
  description: string;
}

interface Message {
  id: number;
  type: "patient-details" | "reply" | "code";
  content: PatientDetails | string;
  sender?: string;
  timestamp: string;
}

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
  {
    id: 2,
    name: "Linda Eseyin",
    organization: "Reliance HMO",
    role: "Spouse",
    status: "Overdue",
    timestamp: "11/10/23 • 2:15PM",
    isRead: false,
    avatar: "L",
    socialIcons: ['whatsapp']
  },
  {
    id: 3,
    name: "Joseph Jibril",
    organization: "Hygeia HMO",
    role: "Dependent",
    status: "Overdue",
    timestamp: "10/10/23 • 4:45PM",
    isRead: false,
    avatar: "J",
    socialIcons: ['gmail']
  },
  {
    id: 4,
    name: "Chisom Chika",
    organization: "Reliance HMO",
    role: "Dependent",
    status: "New",
    timestamp: "12/10/23 • 8:20AM",
    isRead: false,
    avatar: "C",
    socialIcons: ['whatsapp']
  },
  {
    id: 5,
    name: "Hafsat Woru",
    organization: "Hygeia HMO",
    role: "",
    status: "Read",
    timestamp: "12/10/23 • 9:32AM",
    isRead: true,
    avatar: "H",
    socialIcons: ['gmail']
  },
  {
    id: 6,
    name: "Kabir Suru",
    organization: "Reliance HMO",
    role: "Dependent",
    status: "Overdue",
    timestamp: "09/10/23 • 1:10PM",
    isRead: false,
    avatar: "K",
    socialIcons: ['whatsapp']
  }
];

// Mock chat messages for different patients
const mockMessagesData: { [key: number]: Message[] } = {
  1: [
    {
      id: 1,
      type: "patient-details",
      content: {
        patientName: "Muhammad Sahab",
        policyNumber: "13/O/W7E27O",
        healthcareProvider: "Trust Charitos Hospital",
        procedure: "Allergic conjunctivitis, Consultation, Kaytifen Eyedrop",
        estimatedCost: "₦21,980.00",
        description: "Please review this claim and provide your approval at your earliest convenience. If you need any additional information, please don't hesitate to ask."
      },
      sender: "Hassan Garba",
      timestamp: "9:53 AM"
    },
    {
      id: 2,
      type: "reply",
      content: "Reviewed and approved",
      timestamp: "9:59 AM"
    },
    {
      id: 3,
      type: "code",
      content: "CGGEF198398092HJE",
      timestamp: "10:03 AM"
    }
  ],
  2: [
    {
      id: 1,
      type: "patient-details",
      content: {
        patientName: "Linda Eseyin",
        policyNumber: "REL/2023/0456",
        healthcareProvider: "Lagos University Teaching Hospital",
        procedure: "Routine Check-up, Blood Test",
        estimatedCost: "₦15,500.00",
        description: "Annual health screening for spouse. All tests are within normal range."
      },
      sender: "Dr. Adebayo",
      timestamp: "10:15 AM"
    }
  ],
  3: [
    {
      id: 1,
      type: "patient-details",
      content: {
        patientName: "Joseph Jibril",
        policyNumber: "HYG/2023/0789",
        healthcareProvider: "National Hospital Abuja",
        procedure: "Emergency Treatment, X-Ray",
        estimatedCost: "₦45,000.00",
        description: "Emergency case - patient fell and suspected fracture. Immediate attention required."
      },
      sender: "Emergency Dept",
      timestamp: "2:30 PM"
    }
  ]
};

// Mock processed items
const processedItems = [
  { id: 1, name: "Consultation - Orthopedic Doctor", checked: false },
  { id: 2, name: "Admission - Private Room", checked: false },
  { id: 3, name: "MRI Test", checked: false },
  { id: 4, name: "Stool v1", checked: false }
];

export default function PACodePage() {
  const [selectedInteraction, setSelectedInteraction] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState("All");
  const [activeDetailTab, setActiveDetailTab] = useState("Unprocessed");
  const [message, setMessage] = useState("");
  const [assignedTo, setAssignedTo] = useState("Hassan Garba");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showProcessCode, setShowProcessCode] = useState(false);
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const tabs = ["All", "Unread", "Overdue", "Resolved"];
  const detailTabs = ["Unprocessed", "Processed"];

  const selectedInteractionData = interactions.find(i => i.id === selectedInteraction);

  const searchParams = useSearchParams();

  // Function to add or highlight patient from requests page
  const addOrHighlightPatient = (patientData: Partial<Interaction>) => {
    const existingPatient = interactions.find(p =>
      p.name.toLowerCase().includes(patientData.name?.toLowerCase() || '') ||
      (patientData.name && p.name.toLowerCase() === patientData.name.toLowerCase())
    );
    
    if (existingPatient) {
      // Patient exists, highlight them
      setSelectedInteraction(existingPatient.id);
      setShowProcessCode(false);
    } else {
      // Add new patient
      const newPatient: Interaction = {
        id: Math.max(...interactions.map(i => i.id)) + 1,
        name: patientData.name || "Unknown Patient",
        organization: patientData.organization || "Unknown Organization",
        role: patientData.role || "Patient",
        status: "New",
        timestamp: new Date().toLocaleDateString() + " • " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isRead: false,
        avatar: (patientData.name || "U").charAt(0).toUpperCase(),
        socialIcons: ['whatsapp'] // Default to WhatsApp
      };
      
      setInteractions(prev => [newPatient, ...prev]);
      setSelectedInteraction(newPatient.id);
      setShowProcessCode(false);
    }
  };

  // Handle URL parameters from requests page
  useEffect(() => {
    const searchParam = searchParams?.get('search');
    if (searchParam) {
      // Parse the search parameter (format: "FirstName LastName")
      const nameParts = decodeURIComponent(searchParam).split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const fullName = `${firstName} ${lastName}`.trim();
      
      if (fullName) {
        // Try to find existing patient or add new one
        addOrHighlightPatient({
          name: fullName,
          organization: "Unknown Organization", // This would come from the request data in a real app
          role: "Patient"
        });
      }
    }
  }, [searchParams]);

  // Listen for URL parameters or global state to add patients from requests page
  // This would typically be handled by a router or global state management
  // For now, we'll expose the function globally for demonstration
  if (typeof window !== 'undefined') {
    (window as any).addPatientToPACode = addOrHighlightPatient;
  }

  // Render social media icons
  const renderSocialIcons = (icons: ('whatsapp' | 'gmail')[]) => {
    return icons.map((icon, index) => (
      <div key={index} className="w-4 h-4 rounded-full flex items-center justify-center">
        {icon === 'whatsapp' && (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </div>
        )}
        {icon === 'gmail' && (
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
            </svg>
          </div>
        )}
      </div>
    ));
  };

  // Get messages for selected interaction
  const getMessagesForInteraction = (interactionId: number | null) => {
    if (interactionId && mockMessagesData[interactionId]) {
      return mockMessagesData[interactionId];
    }
    return [];
  };

  const currentMessages = getMessagesForInteraction(selectedInteraction);
  
  // Filter interactions based on search, channel, and tab filters
  const getFilteredInteractions = () => {
    let filtered = [...interactions];
    
    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(interaction =>
        interaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interaction.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Channel filter
    if (selectedChannel !== "All Channels") {
      filtered = filtered.filter(interaction => {
        if (selectedChannel === "WhatsApp") {
          return interaction.socialIcons.includes('whatsapp');
        } else if (selectedChannel === "Email") {
          return interaction.socialIcons.includes('gmail');
        }
        return true;
      });
    }
    
    // Tab filter
    switch (activeTab) {
      case "Unread":
        filtered = filtered.filter(interaction => !interaction.isRead);
        break;
      case "Overdue":
        filtered = filtered.filter(interaction => interaction.status === "Overdue");
        break;
      case "Resolved":
        filtered = filtered.filter(interaction => interaction.status === "Read");
        break;
      case "All":
      default:
        // No additional filtering needed
        break;
    }
    
    return filtered;
  };
  
  const filteredInteractions = getFilteredInteractions();
  
  // Get overdue count for header
  const overdueCount = interactions.filter(interaction => interaction.status === "Overdue").length;
  
  // Get current patient info for header
  const getCurrentPatientInfo = () => {
    if (selectedInteraction && mockMessagesData[selectedInteraction]) {
      const patientMessage = mockMessagesData[selectedInteraction].find(msg => msg.type === "patient-details");
      if (patientMessage && typeof patientMessage.content === 'object') {
        return {
          name: patientMessage.content.patientName,
          policyNumber: patientMessage.content.policyNumber,
          organization: interactions.find(i => i.id === selectedInteraction)?.organization || "Unknown"
        };
      }
    }
    return {
      name: "Songhai Health Trust",
      policyNumber: "13/O/W7E27O",
      organization: "Songhai Health Trust"
    };
  };

  const currentPatient = getCurrentPatientInfo();

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {(showSidebar || showDetailPanel) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => {
            setShowSidebar(false);
            setShowDetailPanel(false);
          }}
        />
      )}

      {/* Column 1: Interaction Panel */}
      <div className={`w-80 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-50 ${
        showSidebar ? 'fixed inset-y-0 left-0 translate-x-0' : 'flex'
      } lg:static lg:translate-x-0`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">PA Codes</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-500 font-medium">{overdueCount} overdue</span>
              <button
                className="lg:hidden p-1"
                onClick={() => setShowSidebar(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* New Request Button */}
          <button
            onClick={() => setShowNewRequestModal(true)}
            className="w-full bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium mb-4 hover:bg-blue-200 transition-colors"
          >
            New Request
          </button>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Interactions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Channel Filter */}
          <div className="relative mb-4">
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option>All Channels</option>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>SMS</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Tab Filters */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Interactions List */}
        <div className="flex-1 overflow-y-auto">
          {filteredInteractions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No interactions found</p>
              {searchQuery && (
                <p className="text-sm mt-1">Try adjusting your search or filters</p>
              )}
            </div>
          ) : (
            filteredInteractions.map((interaction) => (
            <div
              key={interaction.id}
              onClick={() => {
                setSelectedInteraction(interaction.id);
                setShowProcessCode(false); // Reset process code visibility when switching patients
              }}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedInteraction === interaction.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {interaction.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900 truncate">{interaction.name}</h3>
                      <div className="flex space-x-1">
                        {renderSocialIcons(interaction.socialIcons)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{interaction.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {interaction.organization}
                    {interaction.role && ` • ${interaction.role}`}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        interaction.status === "New"
                          ? "bg-green-100 text-green-800"
                          : interaction.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {interaction.status}
                    </span>
                    {!interaction.isRead && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 -ml-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">PA Codes</h1>
          <button
            onClick={() => setShowDetailPanel(true)}
            className="p-2 -mr-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Column 2: Chat Panel */}
      <div className="flex-1 flex flex-col bg-white pt-16 lg:pt-0">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {currentPatient.organization.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{currentPatient.organization}</h2>
                <p className="text-sm text-gray-600">{currentPatient.policyNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                02:56
              </span>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((message) => (
            <div key={message.id} className="space-y-2">
              {message.type === "patient-details" && (
                <div className="bg-blue-50 rounded-lg p-4 max-w-md">
                  <div className="space-y-2 text-sm">
                    {typeof message.content === 'object' && (
                      <>
                        <p><span className="font-medium">Patient Name:</span> {message.content.patientName}</p>
                        <p><span className="font-medium">Policy Number:</span> {message.content.policyNumber}</p>
                        <p><span className="font-medium">Healthcare Provider:</span> {message.content.healthcareProvider}</p>
                        <p><span className="font-medium">Procedure/Treatment:</span> {message.content.procedure}</p>
                        <p><span className="font-medium">Estimated Cost:</span> {message.content.estimatedCost}</p>
                        <p className="mt-3">{message.content.description}</p>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                    <span>{message.sender}</span>
                    <span>{message.timestamp}</span>
                  </div>
                </div>
              )}
              
              {message.type === "reply" && (
                <div className="flex justify-end">
                  <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-md">
                    <p className="text-sm">{typeof message.content === 'string' ? message.content : ''}</p>
                    <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              )}
              
              {message.type === "code" && (
                <div className="flex justify-center">
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowProcessCode(!showProcessCode)}
                      className="bg-teal-500 text-white rounded-lg px-6 py-3 font-mono text-sm font-medium cursor-pointer hover:bg-teal-600 transition-colors block mx-auto"
                    >
                      Process Code →
                    </button>
                    {showProcessCode && (
                      <div className="bg-gray-100 rounded-lg px-4 py-2 font-mono text-sm text-center">
                        {typeof message.content === 'string' ? message.content : ''}
                      </div>
                    )}
                    <p className="text-xs text-gray-500 text-center">{message.timestamp}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type something here..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Column 3: Detail Panel */}
      <div className={`w-80 bg-white border-l border-gray-200 flex flex-col transition-transform duration-300 z-50 ${
        showDetailPanel ? 'fixed inset-y-0 right-0 translate-x-0' : 'flex'
      } xl:static xl:translate-x-0`}>
        <div className="p-4">
          {/* Mobile Close Button */}
          <div className="xl:hidden flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Details</h2>
            <button
              onClick={() => setShowDetailPanel(false)}
              className="p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Assigned To */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Assigned to:</label>
            <div className="relative">
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>Hassan Garba</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Detail Tabs */}
          <div className="flex space-x-1 mb-4">
            {detailTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeDetailTab === tab
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            {processedItems.map((item) => (
              <label key={item.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {
                    // Handle checkbox change
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      <NewRequestModal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onCreateRequest={(requestData) => {
          console.log('New request created:', requestData);
          // Here you would typically:
          // 1. Send the request to your backend API
          // 2. Add the new request to your interactions list
          // 3. Show a success message
          
          // For now, we'll just close the modal
          setShowNewRequestModal(false);
          
          // Optionally, you could add the new request as a new interaction
          // This is just for demonstration purposes
          const newInteraction: Interaction = {
            id: Math.max(...interactions.map(i => i.id)) + 1,
            name: requestData.patientId.split(' - ')[0] || "New Patient",
            organization: "New Request",
            role: "Patient",
            status: "New",
            timestamp: new Date().toLocaleDateString() + " • " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            isRead: false,
            avatar: (requestData.patientId.split(' - ')[0] || "N").charAt(0).toUpperCase(),
            socialIcons: [requestData.channel.toLowerCase() === 'whatsapp' ? 'whatsapp' : 'gmail'] as ('whatsapp' | 'gmail')[]
          };
          
          setInteractions(prev => [newInteraction, ...prev]);
          setSelectedInteraction(newInteraction.id);
        }}
      />
    </div>
  );
}