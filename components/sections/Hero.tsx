"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f5f5f5] px-4 pb-6 pt-24 md:px-6 md:pb-8 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(245,241,234,0.7)_32%,rgba(245,241,234,1)_68%)]" />
      <motion.div 
        style={{ y: scrollY * 0.5 }}
        className="absolute inset-x-4 bottom-6 top-24 md:inset-x-6 md:bottom-8 md:top-28"
      >
        <div className="relative h-full overflow-hidden rounded-[2rem] md:rounded-[2.25rem]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full scale-110 object-cover"
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-astronaut-working-on-a-laptop-5174/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,0.66)_0%,rgba(4,10,18,0.2)_42%,rgba(4,10,18,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(116,214,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,170,90,0.28),transparent_26%)]" />
        </div>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative mx-auto flex min-h-[820px] max-w-[1680px] flex-col justify-between overflow-hidden rounded-[2rem] px-7 pb-12 pt-8 md:min-h-[860px] md:px-12 md:pb-16 md:pt-12"
      >
        <div className="flex justify-end">
          <div className="hidden rounded-full border border-white/20 bg-[#f5f5f5]/8 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md md:block">
            Creative studio and motion-first web systems
          </div>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-white text-[22vw] font-bold leading-[0.82] tracking-[-0.08em] sm:text-[18vw] md:text-[9rem] lg:text-[11rem]">
              Floka
            </h1>
            <div className="mt-0 md:mt-1">
              <span className="block pl-[34%] text-5xl font-light leading-none tracking-tight text-white/30 md:text-[5.5rem]">
                Studio
              </span>
            </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="self-end"
          >
            <div className="w-full max-w-[340px] rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-5">
                <div className="shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                    alt="Almond D. Nelsi" 
                    className="h-24 w-24 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#A3B1C2]">Head of idea</p>
                  <p className="mt-0.5 text-xl font-bold leading-tight tracking-tight text-black">
                    Almond D. Nelsi
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </motion.button>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">
                      Let&apos;s talk
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-[1.125rem] font-bold leading-tight text-white">
                No cookie-cutter websites. No fluff.
              </p>
              <p className="max-w-[320px] text-[0.95rem] leading-snug text-white/40">
                Just real tools and smart strategies to grow your business and elevate your brand.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
