"use client";
import PAActionPanel from "./PAActionPanel";

interface ActionHistoryItem {
  type: string;
  text: string;
  timestamp?: string;
}

interface CaseData {
  hmo: string;
  policyNumber: string;
  patient: string;
  relationship: string;
  provider: string;
  procedure: string;
  estimatedCost: string | number;
  actionHistory?: ActionHistoryItem[];
  paCode?: string;
}

interface PACaseDetailViewProps {
  caseData: CaseData;
  onReject: () => void;
}

export default function PACaseDetailView({ caseData, onReject }: PACaseDetailViewProps) {
  if (!caseData) {
    return null;
  }
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b px-8 py-4">
        <div>
          <div className="font-semibold text-gray-700 text-lg">{caseData.hmo} <span className="text-xs font-normal text-gray-400">({caseData.policyNumber})</span></div>
        </div>
        <div className="text-xs text-gray-400">Ref: {caseData.policyNumber}</div>
      </div>
      {/* Patient & Claim Details */}
      <div className="p-8 flex flex-col gap-2 bg-white border-b">
        <div className="font-bold text-gray-800 text-base">{caseData.patient} <span className="font-normal text-xs text-gray-500">({caseData.relationship})</span></div>
        <div className="text-sm text-gray-600">Provider: {caseData.provider}</div>
        <div className="text-sm text-gray-600">Treatment: {caseData.procedure}</div>
        <div className="text-sm text-gray-600">Estimated Cost: <span className="font-semibold">{caseData.estimatedCost}</span></div>
      </div>
      {/* Action History */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex flex-col gap-4">
        {caseData.actionHistory && caseData.actionHistory.length > 0 ? (
          caseData.actionHistory.map((action: ActionHistoryItem, idx: number) => (
            <div key={idx} className="flex items-center gap-3">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${action.type === 'review' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>{action.type === 'review' ? 'Reviewed' : 'Assess Code'}</span>
              <span className="text-gray-700 text-sm">{action.text}</span>
              <span className="ml-auto text-xs text-gray-400">{action.timestamp}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm">No actions yet.</div>
        )}
        {/* Show PA code if present on the case */}
        {caseData.paCode && (
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-green-50 text-green-700">PA Code</span>
            <span className="font-mono text-green-700 text-lg">{caseData.paCode}</span>
          </div>
        )}
      </div>
      {/* Action Panel */}
      <div className="border-t bg-white px-8 py-4">
        <PAActionPanel onReject={onReject} />
      </div>
    </div>
  );
}
