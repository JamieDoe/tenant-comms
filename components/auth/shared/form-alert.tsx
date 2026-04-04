'use client';

import { useSearchParams } from 'next/navigation';

export function FormAlert() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  if (!error && !success) return null;

  return (
    <div
      className={`w-full rounded-md px-4 py-3 text-sm ${
        error
          ? 'bg-destructive/10 text-destructive'
          : 'bg-green-50 text-green-600'
      }`}
    >
      {error || success}
    </div>
  );
}
