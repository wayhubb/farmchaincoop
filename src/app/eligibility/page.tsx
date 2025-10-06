'use client';
import { useEffect, useState } from 'react';

export default function EligibilityPage() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-2">Eligibility Check</h1>
      {currentUrl ? (
        <p>You&apos;re viewing: {currentUrl}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
