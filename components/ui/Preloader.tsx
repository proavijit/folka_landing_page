"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after a delay to ensure smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 second delay as per requirement

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Center horizontal line container */}
          <div className="relative w-full h-[2px] md:h-[3px] bg-white/5 overflow-hidden">
            {/* The animated sweep line */}
            <div className="absolute top-0 left-0 h-full w-[15vw] min-w-[100px] bg-white animate-line-sweep shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
