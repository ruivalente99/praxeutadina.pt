import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CapeAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
          animate={{ 
            clipPath: [
              'polygon(0 0, 0 0, 0 100%, 0 100%)',
              'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
            ]
          }}
          exit={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          transition={{ 
            duration: 2,
            ease: [0.45, 0, 0.55, 1],
            times: [0, 0.5, 1]
          }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(0, 0, 0, 0.95) 0%,
                rgba(26, 26, 26, 0.95) 100%
              ),
              url('/textures/fabric.png')
            `,
            backgroundBlendMode: 'multiply',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: `
                repeating-linear-gradient(
                  45deg,
                  rgba(0,0,0,0.1) 0px,
                  rgba(0,0,0,0.1) 2px,
                  transparent 2px,
                  transparent 4px
                )
              `
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}