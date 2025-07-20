import React from "react";

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
}

const hmoOptions = ["Songhai Health Trust", "Ally Healthcare", "Other HMO"];
const planOptions = ["Basic", "Family Plan", "Premium"];
const roleOptions = ["Principal", "Spouse", "Child"];

export default function AddPatientModal({
  open,
  onClose,
}: AddPatientModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#014C654D] backdrop-blur-[0.3px] "
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl py-2 px-8 flex flex-col animate-slide-in-right "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold ">Add Patient</h2>
        <p className="text-gray-500 text-sm mb-1">
          Create a profile for a new patient
        </p>
        <form className="flex flex-col gap-2 flex-1">
          <div>
            <label className="block text-sm font-medium">Patient ID</label>
            <input
              type="text"
              placeholder="Enter Hospital ID here"
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Enrollee ID</label>
            <input
              type="text"
              placeholder="Enter HMO ID here"
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border "
            />
          </div>
          <div>
            <label className="block text-sm font-medium">HMO</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4  border ">
              <option value="">Select HMO</option>
              {hmoOptions.map((hmo) => (
                <option key={hmo} value={hmo}>
                  {hmo}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-400 ">
              Active HMO patient is registered with
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium ">Plan</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 border">
              <option value="">Select plan</option>
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-400">
              Package patient is on with their HMO
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium ">Role</label>
            <select className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 border">
              <option value="">Select role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <div className="text-xs text-gray-400">
              Patient’s role in the HMO
            </div>
          </div>
        <p className="text-xs text-gray-400 mt-1">
          By submitting this form, I confirm that the information provided is
          accurate and true. I understand that providing false information may
          result in legal consequences and termination of services. I agree to
          the
          <a href="#" className="underline text-gray-500 hover:text-teal-600">
            Terms and Conditions
          </a>
          .
        </p>
        </form>
        <div className="flex justify-between ">
          <button
            type="button"
            className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-1 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
