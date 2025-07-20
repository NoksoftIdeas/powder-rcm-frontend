"use client";

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const spinnerComponent = (
    <div 
      className={`
        ${sizeClasses[size]} 
        border-4 border-t-4 
        border-gray-200 border-t-cyan-600 
        rounded-full 
        animate-spin
      `}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        <div className="flex flex-col items-center justify-center space-y-4">
          {spinnerComponent}
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {spinnerComponent}
    </div>
  );
} 