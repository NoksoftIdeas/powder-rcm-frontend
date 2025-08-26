import { TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import type { Service } from './types';

interface ServiceItemProps {
  service: Service;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onUpdateCategory: (id: string, category: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (service: Service) => void;
}

export function ServiceItem({
  service,
  onUpdateQuantity,
  onUpdateCategory,
  onRemove,
  onDuplicate,
}: ServiceItemProps) {
  return (
    <div className="rounded-md border border-gray-200 p-3">
      <div className="flex justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {service.name}
          </p>
          <p className="text-sm text-gray-500">
            {service.code} (₦{service.price.toLocaleString()})
          </p>
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <div className="flex items-center rounded-md border border-gray-300">
            <button
              type="button"
              onClick={() => onUpdateQuantity(service.id, service.quantity - 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
              disabled={service.quantity <= 0}
            >
              -
            </button>
            <span className="w-8 text-center text-sm">{service.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(service.id, service.quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              +
            </button>
          </div>
          <select
            className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            value={service.category}
            onChange={(e) => onUpdateCategory(service.id, e.target.value)}
          >
            <option>Drugs</option>
            <option>Lab Tests</option>
            <option>Procedures</option>
            <option>Consultations</option>
          </select>
          <button
            type="button"
            onClick={() => onDuplicate(service)}
            className="text-gray-400 hover:text-gray-500"
            title="Duplicate"
          >
            <DocumentDuplicateIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => onRemove(service.id)}
            className="text-red-400 hover:text-red-500"
            title="Remove"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
