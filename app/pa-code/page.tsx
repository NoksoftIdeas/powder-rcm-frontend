"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { withAuth } from "../components/auth/withAuth";
import ConversationListColumn, {
  ConversationSummary,
} from "./components/ConversationListColumn";
import ConversationDetailEmptyState from "./components/ConversationDetailEmptyState";
import ConversationDetailColumn, {
  ConversationMessage,
} from "./components/ConversationDetailColumn";
import PatientActionPanel from "./components/PatientActionPanel";
import { PaCodeProvider, usePaCode } from "./context/PaCodeContext";

const INITIAL_CONVERSATIONS: ConversationSummary[] = [
  {
    id: "1",
    patientName: "Rosemary Iheme",
    providerName: "Songhai Health Trust",
    patientType: "Principal",
    status: "New",
    channel: "WhatsApp",
    timestamp: "02:56 PM",
    isOverdue: true,
  },
  {
    id: "2",
    patientName: "Chidinma Isaac",
    providerName: "Ally Healthcare",
    patientType: "Spouse",
    status: "Read",
    channel: "Email",
    timestamp: "11:30 AM",
    isOverdue: false,
  },
  {
    id: "3",
    patientName: "Aisha Mohammed",
    providerName: "Medicare Plus",
    patientType: "Dependent",
    status: "New",
    channel: "WhatsApp",
    timestamp: "09:15 AM",
    isOverdue: true,
  },
  {
    id: "4",
    patientName: "John Doe",
    providerName: "Health First",
    patientType: "Principal",
    status: "Read",
    channel: "Email",
    timestamp: "08:30 AM",
    isOverdue: true,
  },
];

const INITIAL_MESSAGES: Record<string, ConversationMessage[]> = {
  "1": [
    {
      id: "m1",
      type: "request",
      providerName: "Songhai Health Trust",
      policyNumber: "13/OJ/WTE27O",
      channel: "WhatsApp",
      patientName: "Rosemary Iheme",
      patientType: "Principal",
      procedure: "Consultation - Orthopedic Doctor",
      estimatedCost: "₦75,000.00",
      message:
        "Requesting pre-authorization for orthopedic consultation due to persistent knee pain.",
      timestamp: "02:48 PM",
    },
    { id: "m2", type: "admin", text: "Received. Reviewing details now.", timestamp: "02:50 PM" },
    { id: "m3", type: "process", text: "Process Code", timestamp: "02:52 PM" },
  ],
  "2": [
    {
      id: "m1",
      type: "request",
      providerName: "Ally Healthcare",
      policyNumber: "13/OJ/9JR42N",
      channel: "Email",
      patientName: "Chidinma Isaac",
      patientType: "Spouse",
      procedure: "Admission - Private Room",
      estimatedCost: "₦230,000.00",
      message: "Requesting admission authorization following ER evaluation.",
      timestamp: "11:20 AM",
    },
    { id: "m2", type: "admin", text: "Acknowledged. Kindly share vitals.", timestamp: "11:24 AM" },
  ],
};

function PaCodePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>(
    INITIAL_CONVERSATIONS
  );
  const [messageMap, setMessageMap] = useState<Record<string, ConversationMessage[]>>(
    INITIAL_MESSAGES
  );
  const { setOverdueCount } = usePaCode();
  const processedParamsRef = useRef<string>("");

  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedId) || null,
    [selectedId, conversations]
  );

  const messages = useMemo(
    () => (selectedId ? messageMap[selectedId] || [] : []),
    [selectedId, messageMap]
  );

  // Calculate and update overdue count whenever conversations change
  useEffect(() => {
    const overdue = conversations.filter((conv) => conv.isOverdue).length;
    setOverdueCount(overdue);
  }, [conversations, setOverdueCount]);

  // Ensure no duplicate IDs in conversations
  useEffect(() => {
    const seenIds = new Set<string>();
    const duplicates = conversations.filter(conv => {
      if (seenIds.has(conv.id)) {
        return true;
      }
      seenIds.add(conv.id);
      return false;
    });

    if (duplicates.length > 0) {
      console.warn('Found duplicate conversation IDs:', duplicates.map(d => d.id));
      // Remove duplicates by keeping only the first occurrence
      const uniqueConversations = conversations.filter((conv, index) => {
        return conversations.findIndex(c => c.id === conv.id) === index;
      });
      setConversations(uniqueConversations);
    }
  }, [conversations]);

  // Handle incoming patient details from Requests page
  useEffect(() => {
    const firstName = searchParams.get("firstName");
    const lastName = searchParams.get("lastName");
    const hmo = searchParams.get("hmo");
    const requestId = searchParams.get("requestId");
    if (!firstName || !lastName || !hmo || !requestId) return;

    // Create a unique key for these parameters to prevent duplicate processing
    const paramsKey = `${firstName}-${lastName}-${hmo}-${requestId}`;
    if (processedParamsRef.current === paramsKey) return;
    processedParamsRef.current = paramsKey;

    const patientFullName = `${firstName} ${lastName}`;
    const timestamp = Date.now();
    const newId = `req-${requestId}-${timestamp}`;

    // Check if we already have a conversation for this patient from this request
    const existing = conversations.find((c) => 
      c.patientName === patientFullName && 
      c.providerName === hmo && 
      c.id.startsWith(`req-${requestId}`)
    );
    if (existing) {
      setSelectedId(existing.id);
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newConversation: ConversationSummary = {
      id: newId,
      patientName: patientFullName,
      providerName: hmo,
      patientType: "Principal",
      status: "New",
      channel: "Email",
      timestamp: timeStr,
      isOverdue: false,
    };

    const newMessages: ConversationMessage[] = [
      {
        id: `${newId}-m1`,
        type: "request",
        providerName: hmo,
        policyNumber: "--/--/--",
        channel: "Email",
        patientName: patientFullName,
        patientType: "Principal",
        procedure: "Consultation - Orthopedic Doctor",
        estimatedCost: "₦0.00",
        message: `Requesting pre-authorization for ${patientFullName}.`,
        timestamp: timeStr,
      },
      { id: `${newId}-m2`, type: "admin", text: "Received. Reviewing details now.", timestamp: timeStr },
      { id: `${newId}-m3`, type: "process", text: "Process Code", timestamp: timeStr },
    ];

    setConversations((prev) => {
      // Ensure no duplicates by checking if conversation with same patient and provider already exists
      const existingIndex = prev.findIndex(c => 
        c.patientName === patientFullName && 
        c.providerName === hmo && 
        c.id.startsWith(`req-${requestId}`)
      );
      
      if (existingIndex !== -1) {
        // Update the existing conversation instead of adding a new one
        const updated = [...prev];
        updated[existingIndex] = newConversation;
        return updated;
      }
      
      return [newConversation, ...prev];
    });
    setMessageMap((prev) => ({ ...prev, [newId]: newMessages }));
    setSelectedId(newId);

    // Clean query params so refresh doesn't re-add
    const url = new URL(window.location.href);
    url.search = "";
    router.replace(url.toString());
    
    // Clear the processed params ref after a short delay to allow for future requests
    setTimeout(() => {
      processedParamsRef.current = "";
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handle processing code click
  const handleProcessCode = () => {
    if (!selectedId) return;
    const code = generateProcessCode();
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessageMap((prev) => ({
      ...prev,
      [selectedId]: [
        ...(prev[selectedId] || []),
        { id: `${selectedId}-code-${now.getTime()}`, type: "code", code, timestamp },
      ],
    }));
  };

  function generateProcessCode(): string {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "CG";
    for (let i = 0; i < 14; i += 1) {
      out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
  }

  return (
    <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white min-h-[70vh]">
      {/* Left */}
      <div className="w-20 sm:w-80 md:w-96">
        <ConversationListColumn
          conversations={conversations}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreateNew={() => {}}
        />
      </div>

      {/* Middle + Right depending on state */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="flex-1 min-w-0">
            <ConversationDetailColumn
              providerName={selectedConversation.providerName}
              providerLogoUrl={null}
              timer={selectedConversation.status === "New" ? "02:56" : "--:--"}
              policyNumber={selectedConversation.patientType === "Principal" ? "13/OJ/WTE27O" : "13/OJ/9JR42N"}
              channel={selectedConversation.channel}
              messages={messages}
              onProcess={handleProcessCode}
            />
          </div>
          <div className="w-full lg:w-80">
            <PatientActionPanel
              assignees={["Hassan Garba", "Mary Abiola", "Samuel Umar"]}
              defaultAssignee="Hassan Garba"
              items={[
                { id: "1", label: "Consultation - Orthopedic Doctor", completed: false },
                { id: "2", label: "Admission - Private Room", completed: false },
                { id: "3", label: "Laboratory - MRI Scan", completed: true },
                { id: "4", label: "Physiotherapy - 2 Sessions", completed: false },
                { id: "5", label: "Pharmacy - Pain Management", completed: false },
              ]}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <ConversationDetailEmptyState onCreateNew={() => {}} />
        </div>
      )}
    </div>
  );
}

function PaCodePage() {
  return <PaCodePageContent />;
}

export default withAuth(PaCodePage);


