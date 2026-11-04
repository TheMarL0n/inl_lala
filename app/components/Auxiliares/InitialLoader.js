// components/InitialLoader.js
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function InitialLoader() {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Tiempo que se queda la cortina estática mostrando el logo (ej. 1.2 segundos)
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isFinished) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#15428C] flex items-center justify-center pointer-events-none"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: isExiting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ originY: 0 }}
      onAnimationComplete={() => {
        if (isExiting) {
          setIsFinished(true); // Se desmonta limpiamente al terminar la animación
        }
      }}
    >
      {/* Contenido del loader (logo y spinner) */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.95 : 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        <Image 
          src="/logo_footer.svg" 
          alt="Instituto de Nutrición Lala" 
          width={140} 
          height={70}
        />
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </motion.div>
    </motion.div>
  );
}