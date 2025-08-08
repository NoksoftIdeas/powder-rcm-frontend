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
  onAddPatient: (patient: Patient) => void;
}

interface PatientFormData {
  patientId: string;
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
    patientId: "",
    name: "",
    enrolleeId: "",
    hmo: "",
    plan: "",
    role: "",
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
      onAddPatient(formData);
      console.log("onAddPatient called successfully");
      // Reset form
      setFormData({
        patientId: "",
        name: "",
        enrolleeId: "",
        hmo: "",
        plan: "",
        role: "",
      });
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#014C654D] backdrop-blur-[0.3px] "
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white py-1 px-8 flex flex-col animate-slide-in-right "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-[#101828] ">Add Patient</h2>
        <p className="text-[#475467] text-xs mb-2">
          Create a profile for a new patient
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
          <div>
            <label className="block text-sm text-[#344054] ">Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              placeholder="Enter Patient ID here"
              className="w-full rounded-md border-[#D0D5DD] text-[#667085] focus:outline-none px-4 py-1 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#344054]">Patient Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-md border-[#D0D5DD] text-[#667085]  focus:outline-none px-4 py-1 border"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#344054] ">
              Enrollee ID
            </label>
            <input
              type="text"
              name="enrolleeId"
              value={formData.enrolleeId}
              onChange={handleChange}
              placeholder="Enter HMO ID here"
              className="w-full rounded-md border-[#D0D5DD] text-[#667085]  focus:outline-none px-4 py-1 border mb-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#344054] ">HMO</label>
            <select
              name="hmo"
              value={formData.hmo}
              onChange={handleChange}
              className="w-full rounded-md border-[#D0D5DD] text-[#667085]  focus:outline-none text-xs px-4 py-1 border"
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
            <label className="block text-sm text-[#344054] ">Plan</label>
            <select
              name="plan"
              value={formData.plan}
                onChange={handleChange}
              className="w-full rounded-md border-[#D0D5DD] text-[#667085]  focus:outline-none  text-xs px-4 py-1 border"
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
            <label className="block text-sm text-[#344054]">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border-[#D0D5DD] text-[#667085]  focus:outline-none text-xs px-4 py-1 border"
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
          <p className="text-xs text-gray-400">
            By submitting this form, I confirm that the information provided is
            accurate and true. I understand that providing false information may
            result in legal consequences and termination of services. I agree to
            the <a href="#" className="underline text-gray-500 "> Terms and Conditions</a>
            .
          </p>
          <div className="flex justify-between mt-1">
            <button
              type="button"
              className="px-4 py-1 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 "
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-1 bg-cyan-700 text-white rounded-md "
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
