// Mock API for demonstration. Replace with real API integration as needed.
export const mockInteractions = [
  {
    id: 1,
    patient: "Muhammad Sahab",
    hmo: "Songhai Health Trust",
    policyNumber: "POL-0001",
    provider: "Federal Medical Centre, Lagos",
    procedure: "Knee Replacement",
    estimatedCost: 1200000,
    relationship: "Principal",
    status: "read",
    timestamp: "12/10/23 - 9:32AM",
    overdue: false,
    resolved: false,
  },
  {
    id: 2,
    patient: "Linda Essyin",
    hmo: "Reliance HMO",
    policyNumber: "POL-0002",
    provider: "Lagos University Teaching Hospital",
    procedure: "Appendectomy",
    estimatedCost: 350000,
    relationship: "Spouse",
    status: "new",
    timestamp: "12/10/23 - 9:32AM",
    overdue: false,
    resolved: false,
  },
  {
    id: 3,
    patient: "Joseph Jibril",
    hmo: "Hygeia HMO",
    policyNumber: "POL-0003",
    provider: "St. Nicholas Hospital",
    procedure: "MRI Scan",
    estimatedCost: 95000,
    relationship: "Dependent",
    status: "overdue",
    timestamp: "12/10/23 - 9:32AM",
    overdue: true,
    resolved: false,
  },
  {
    id: 4,
    patient: "Kabir Suru",
    hmo: "Reliance HMO",
    policyNumber: "POL-0004",
    provider: "Eko Hospital",
    procedure: "Cataract Surgery",
    estimatedCost: 200000,
    relationship: "Dependent",
    status: "resolved",
    timestamp: "12/10/23 - 9:32AM",
    overdue: false,
    resolved: true,
  },
];

export async function fetchInteractions() {
  // Simulate API delay
  await new Promise(res => setTimeout(res, 400));
  return mockInteractions;
}
