import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import type { Service } from './types';
import { ServiceItem } from './ServiceItem';

interface ServicesSectionProps {
  services: Service[];
  setServices: (services: Service[]) => void;
}

export function ServicesSection({ services, setServices }: ServicesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Add a new service
  const addService = () => {
    if (!searchQuery.trim()) return;
    
    const newService: Service = {
      id: `service-${Date.now()}`,
      name: searchQuery,
      code: `SVC-${Math.floor(1000 + Math.random() * 9000)}`,
      price: Math.floor(Math.random() * 1000) + 500,
      quantity: 1,
      category: 'Drugs'
    };
    
    setServices([...services, newService]);
    setSearchQuery('');
  };

  // Update service quantity
  const updateServiceQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    setServices(services.map(service => 
      service.id === id ? { ...service, quantity: newQuantity } : service
    ));
  };

  // Update service category
  const updateServiceCategory = (id: string, category: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, category } : service
    ));
  };

  // Remove a service
  const removeService = (id: string) => {
    setServices(services.filter(service => service.id !== id));
  };

  // Duplicate a service
  const duplicateService = (service: Service) => {
    setServices([...services, { ...service, id: `service-${Date.now()}` }]);
  };

  return (
    <div className="space-y-2">
      <label htmlFor="services" className="block text-sm font-medium text-gray-700">
        Services
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          id="services"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Search services"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && addService()}
        />
        <button
          type="button"
          onClick={addService}
          disabled={!searchQuery.trim()}
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-gray-500">
        Add services you wish to request for patient
      </p>

      {/* Services List */}
      <div className="mt-4 space-y-3">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            onUpdateQuantity={updateServiceQuantity}
            onUpdateCategory={updateServiceCategory}
            onRemove={removeService}
            onDuplicate={duplicateService}
          />
        ))}
      </div>
    </div>
  );
}
