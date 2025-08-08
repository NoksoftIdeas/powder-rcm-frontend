'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import PACodeContent from './PACodeContent';

function PACodeClientContent() {
  const searchParams = useSearchParams();
  
  return <PACodeContent searchParam={searchParams?.get('search') || ''} />;
}

export default function PACodeClient() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PACodeClientContent />
    </Suspense>
  );
}
