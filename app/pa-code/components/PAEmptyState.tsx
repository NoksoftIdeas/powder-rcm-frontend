export default function PAEmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center h-full text-center p-12 select-none">
      <div className="mx-auto mb-6">
        <div className="rounded-full bg-blue-50 w-20 h-20 flex items-center justify-center mx-auto">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#38bdf8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
      </div>
      <div className="text-lg font-medium text-gray-700 mb-2">Feels empty here</div>
      <div className="text-gray-500 mb-6">Select an interaction or create a new request to start communicating with a HMO.</div>
      <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-semibold shadow-sm">New Request</button>
    </div>
  );
}
