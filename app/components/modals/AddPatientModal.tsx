import React, { useState } from "react";

interface Patient {
  patientId: string;
  name: string;
  enrolleeId: string;
  hmo: string;
  plan: string;
  role: string;
}

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onAddPatient: (patient: Omit<Patient, 'patientId'>) => void;
}

interface PatientFormData {
  name: string;
  enrolleeId: string;
  hmo: string;
  plan: string;
  role: string;
}

const hmoOptions = ["Songhai Health Trust", "Ally Healthcare", "Other HMO"];
const planOptions = ["Basic", "Family Plan", "Premium"];
const roleOptions = ["Principal", "Spouse", "Child"];

export default function AddPatientModal({
  open,
  onClose,
  onAddPatient,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    enrolleeId: '',
    hmo: '',
    plan: '',
    role: '',
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    try {
      onAddPatient(formData);
      console.log('onAddPatient called successfully');
      // Reset form
      setFormData({
        name: '',
        enrolleeId: '',
        hmo: '',
        plan: '',
        role: '',
      });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
          <div>
            <label className="block text-sm font-medium">Patient ID</label>
            <input
              type="text"
              name="enrolleeId"
              value={formData.enrolleeId}
              onChange={handleChange}
              placeholder="Enter Enrollee ID here"
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">HMO</label>
            <select
              name="hmo"
              value={formData.hmo}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
              required
            >
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
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
              required
            >
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
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 focus:border-teal-500 focus:ring-teal-500 px-4 py-1 border"
              required
            >
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
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-700 text-white rounded-md hover:bg-cyan-800 font-semibold"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
