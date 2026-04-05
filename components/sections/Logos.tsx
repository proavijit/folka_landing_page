"use client";

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/app/lib/utils';
import { sectionReveal, staggerGrid, staggerItem } from '@/lib/animations';

const Logos = () => {
  const logoItems = [
    { name: 'Logoipsum', color: 'bg-blue-600' },
    { name: 'Logoipsum', color: 'bg-lime-500' },
    { name: 'Logoipsum', color: 'bg-violet-500' },
    { name: 'Logoipsum', color: 'bg-sky-500' },
    { name: 'logoipsum', color: 'bg-lime-400' },
    { name: 'Logoipsum', color: 'bg-pink-600' },
    { name: 'Logoipsum', color: 'bg-red-500' },
    { name: 'Next can be you', color: 'bg-black' },
  ];

  return (
    <motion.section className="py-20 bg-[#f5f5f5] border-y border-accent" {...sectionReveal}>
      <div className="container-wide">
        <div className="mb-5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-black/55">
          <span>Happy users</span>
          <span>©2025 CaseThemes studio</span>
        </div>

        <motion.div
          className="overflow-hidden rounded-[1.1rem] border border-black/6 bg-[#f5f5f5]"
          variants={staggerGrid}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {logoItems.map((item, i) => (
              <motion.div
                key={`${item.name}-${i}`}
                variants={staggerItem}
                whileHover={{ y: -2, backgroundColor: 'rgba(249,246,239,0.9)' }}
                className="group flex min-h-[100px] items-center justify-center border-b border-r border-black/6 px-6 py-8 text-center last:border-r-0 md:min-h-[108px]"
              >
                {i === 7 ? (
                  <div className="space-y-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-black/60">
                    <p>Next can be you</p>
                    <p className="text-black">Let&apos;s talk</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-105">
                    <span className={cn("h-4 w-4 rounded-[4px] rotate-12", item.color)} />
                    <span className="font-display text-lg font-bold text-black">{item.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Logos;
