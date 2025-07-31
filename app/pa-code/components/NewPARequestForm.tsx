'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function NewPARequestForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    memberId: '',
    policyNumber: '',
    insuranceProvider: '',
    policyHolderName: '',
    policyHolderDob: '',
    relationshipToPatient: '',
    procedureCode: '',
    diagnosisCode: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New PA Request</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Full Name</Label>
              <Input
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Insurance Information Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Insurance Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memberId">Member ID</Label>
              <Input
                id="memberId"
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                placeholder="Enter member ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                name="policyNumber"
                value={formData.policyNumber}
                onChange={handleChange}
                placeholder="Enter policy number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                name="insuranceProvider"
                value={formData.insuranceProvider}
                onChange={handleChange}
                placeholder="Enter insurance provider"
                required
              />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <h3 className="text-md font-medium mb-3">Policy Holder Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyHolderName">Policy Holder Name</Label>
                <Input
                  id="policyHolderName"
                  name="policyHolderName"
                  value={formData.policyHolderName}
                  onChange={handleChange}
                  placeholder="Enter policy holder name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyHolderDob">Date of Birth</Label>
                <Input
                  id="policyHolderDob"
                  name="policyHolderDob"
                  type="date"
                  value={formData.policyHolderDob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="relationshipToPatient">Relationship to Patient</Label>
                <Select
                  value={formData.relationshipToPatient}
                  onValueChange={(value) => handleSelectChange('relationshipToPatient', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Procedure Information Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Procedure Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="procedureCode">Procedure Code</Label>
              <Input
                id="procedureCode"
                name="procedureCode"
                value={formData.procedureCode}
                onChange={handleChange}
                placeholder="Enter procedure code"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diagnosisCode">Diagnosis Code</Label>
              <Input
                id="diagnosisCode"
                name="diagnosisCode"
                value={formData.diagnosisCode}
                onChange={handleChange}
                placeholder="Enter diagnosis code"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
              className="min-h-[100px]"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Submit Request
          </Button>
        </div>
      </form>
    </div>
  );
}
