"use client";
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { motion } from 'framer-motion';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleEnd = () => setIsLoading(false);
    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleEnd);
    Router.events.on('routeChangeError', handleEnd);
    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleEnd);
      Router.events.off('routeChangeError', handleEnd);
    };
  }, []);

  return isLoading ? (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-80 z-50">
      <motion.div
        className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>
  ) : null;
}
