import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PatientSection } from "./PatientSection";
import { ChannelSection } from "./ChannelSection";
import { ServicesSection } from "./ServicesSection";
import type { Patient, Service, Channel, EligibilityStatus } from "./types";

export function NewRequestSlideOver({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState<Patient | null>(null);
  const [eligibilityStatus, setEligibilityStatus] =
    useState<EligibilityStatus>("idle");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [services, setServices] = useState<Service[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Check if form is valid
  const isFormValid =
    patient &&
    (eligibilityStatus === "eligible" || eligibilityStatus === "checking") &&
    services.length > 0 &&
    services.every((s) => s.quantity > 0);

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid) return;

    // TODO: Handle form submission
    console.log("Submitting request:", { patient, channel, services });
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#014C654D] backdrop-blur-[0.3px] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-1 shadow-xl">
                    <div className="px-4 sm:px-6 mb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Dialog.Title className="text-[21.33px] leading-[32px] font-bold text-[#101828]">
                            New request
                          </Dialog.Title>
                          <p className="mt-1 text-[14.93px] font-normal leading-[21.33px] text-[#475467]">
                            Send out authorization request to a patient's HMO
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative pt-4 flex-1 border-t border-[#EAECF0] px-4 sm:px-6 space-y-6">
                      {/* Patient ID Section */}
                      <PatientSection
                        patientId={patientId}
                        setPatientId={setPatientId}
                        patient={patient}
                        setPatient={setPatient}
                        eligibilityStatus={eligibilityStatus}
                        setEligibilityStatus={setEligibilityStatus}
                        isSearching={isSearching}
                        setIsSearching={setIsSearching}
                      />

                      <div className="border-t border-gray-200 pt-4">
                        {/* Channel Section */}
                        <ChannelSection
                          channel={channel}
                          setChannel={setChannel}
                        />
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        {/* Services Section */}
                        <ServicesSection
                          services={services}
                          setServices={setServices}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto border-t border-gray-200 px-4 pt-3 sm:px-4">
                      <div className="flex justify-between space-x-3">
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={!isFormValid}
                          className={`inline-flex justify-center rounded-md border border-[#027FA3] py-2 px-4 text-sm font-medium text-white shadow-[#1018280D] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            isFormValid
                              ? "bg-[#027FA3]"
                              : "bg-[#027FA3] cursor-not-allowed"
                          }`}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
