import React from "react";

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
}

const hmoOptions = [
  "Songhai Health Trust",
  "Ally Healthcare",
  "Other HMO"
];
const planOptions = ["Basic", "Family Plan", "Premium"];
const roleOptions = ["Principal", "Spouse", "Child"];

export default function AddPatientModal({ open, onClose }: AddPatientModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30">
      <div className="w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl p-8 flex flex-col animate-slide-in-right overflow-y-auto">
        <h2 className="text-xl font-bold mb-1">Add Patient</h2>
        <p className="text-gray-500 text-sm mb-6">Create a profile for a new patient</p>
        <form className="flex flex-col gap-4 flex-1">
          <div>
            <label className="block text-sm font-medium mb-1">Patient ID</label>
            <input type="text" placeholder="Enter Hospital ID here" className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Patient Name</label>
            <input type="text" placeholder="John Doe" className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Enrollee ID</label>
            <input type="text" placeholder="Enter HMO ID here" className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">HMO</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-1">
              <option value="">Select HMO</option>
              {hmoOptions.map((hmo) => (
                <option key={hmo} value={hmo}>{hmo}</option>
              ))}
            </select>
            <div className="text-xs text-gray-400 mt-1">Active HMO patient is registered with</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plan</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-1">
              <option value="">Select plan</option>
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
            <div className="text-xs text-gray-400 mt-1">Package patient is on with their HMO</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-2 border mb-1">
              <option value="">Select role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <div className="text-xs text-gray-400 mt-1">Patient’s role in the HMO</div>
          </div>
        </form>
        <div className="flex justify-end gap-2 mt-8">
          <button type="button" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold" onClick={onClose}>Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700">Add</button>
        </div>
        <p className="text-xs text-gray-400 mt-6 mb-2">
          By submitting this form, I confirm that the information provided is accurate and true. I understand that providing false information may result in legal consequences and termination of services. I agree to the <a href="/terms-and-conditions" className="underline text-gray-500 hover:text-teal-600">Terms and Conditions</a>.
        </p>
      </div>
    </div>
  );
}
