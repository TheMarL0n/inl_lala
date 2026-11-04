// template.js
'use client';

import { motion } from 'framer-motion';
import { usePageTransition } from './context/TransitionContext';

export default function Template({ children }) {
  const { isExiting } = usePageTransition();

  return (
    <>
      {/* Contenido de la página */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isExiting ? 0 : 1, y: isExiting ? -15 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Cortina de transición */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#0a0a0a] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isExiting ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: isExiting ? 1 : 0 }}
      />
    </>
  );
}