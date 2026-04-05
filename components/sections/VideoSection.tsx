"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const VideoSection = () => {
  return (
    <motion.section className="bg-[#f5f5f5] pb-16" {...sectionReveal}>
      <div className="container-wide">
        <motion.div
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative overflow-hidden rounded-[1.2rem]"
        >
          <motion.img
            variants={{
                rest: { scale: 1, filter: 'blur(0px)' },
                hover: { scale: 1.04, filter: 'blur(3px)' },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
            alt="Video BG"
            className="h-[560px] w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <motion.div
            variants={{
                rest: { backgroundColor: 'rgba(0,0,0,0.18)' },
                hover: { backgroundColor: 'rgba(0,0,0,0.32)' },
            }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          />
          <motion.button
            variants={{
                rest: {
                    scale: 1,
                    left: '1.5rem',
                    top: 'calc(100% - 1.5rem)',
                    x: '0%',
                    y: '-100%',
                },
                hover: {
                    scale: 1.06,
                    left: '50%',
                    top: '50%',
                    x: '-50%',
                    y: '-50%',
                },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center gap-3 rounded-full bg-[#f5f5f5] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                <Play size={14} fill="currentColor" />
            </span>
            Play reel
          </motion.button>

          <motion.div
            variants={{
                rest: { opacity: 0, scale: 0.94 },
                hover: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="rounded-full border border-white/40 bg-[#f5f5f5]/10 p-4 backdrop-blur-md">
                <div className="h-3 w-3 rounded-full border border-black/40" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoSection;
