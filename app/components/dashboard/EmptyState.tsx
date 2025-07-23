import React from 'react';
import { PlusCircle } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
};

export function EmptyState({ 
  title, 
  description, 
  actionText = 'Add New',
  onAction 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-cyan-50 mb-4">
        <PlusCircle className="h-12 w-12 text-cyan-600" />
      </div>
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-md">
        {description}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
