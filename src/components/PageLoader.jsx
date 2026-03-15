"use client";
import { useState, useEffect, useTransition } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Brief flash on route change
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80 z-50">
      <div
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
}
