"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

// Simulated hunting season dates (you can adjust these)
const HUNTING_SEASON = {
  start: new Date('2024-09-15'),
  end: new Date('2024-12-15')
};

export function HuntingSeasonBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkHuntingSeason = () => {
      const now = new Date();
      setIsOpen(now >= HUNTING_SEASON.start && now <= HUNTING_SEASON.end);
    };

    checkHuntingSeason();
    // Check every hour
    const interval = setInterval(checkHuntingSeason, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full py-2 text-center text-sm font-medium ${
        isOpen 
          ? 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]'
          : 'bg-destructive text-destructive-foreground'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>
          {isOpen 
            ? 'Época de Caça ABERTA! Caloiros, preparem-se para a Praxe! 🎭'
            : 'Época de Caça FECHADA - Voltamos em breve com mais tradições! 🎓'
          }
        </span>
      </div>
    </motion.div>
  );
}