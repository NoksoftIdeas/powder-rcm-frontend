'use client';

import { Suspense } from 'react';
import PACodeClient from './PACodeClient';

export default function PACodePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PACodeClient />
    </Suspense>
  );
}
