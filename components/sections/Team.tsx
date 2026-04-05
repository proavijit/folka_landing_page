"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const Team = () => {
  const members = [
    { name: 'Nicolas K. Ellington', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Carlos E. Ashcroft', role: 'Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Leonardo F. Ashton', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
    { name: 'Ricardo P. Winslow', role: 'UI Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  ];

  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide max-w-[1220px]">
        <div className="rounded-[1.6rem] bg-[#f5f5f5] p-5 shadow-[0_26px_60px_rgba(15,23,42,0.06)] md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-between rounded-[1.25rem] bg-[#f5f5f5] p-4 md:p-5">
              <div>
                <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.16em] text-black/48">Our Avengers</p>
                <h2 className="max-w-[8.3ch] font-[family-name:var(--font-space-grotesk)] text-[1.92rem] font-medium leading-[1.04] tracking-[-0.055em] text-black md:text-[2.7rem]">
                  Meet with our team member
                </h2>

                <div className="mt-7 flex gap-5 border-b border-black/8 pb-4">
                  <button className="border-b border-black pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black">
                    Design team
                  </button>
                  <button className="pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/28">
                    Development team
                  </button>
                </div>

                <p className="mt-5 max-w-[34ch] text-[12.5px] leading-[1.75] text-black/58">
                  What began over coffee-fueled brainstorming sessions has grown into a thriving digital agency dedicated to helping brands stand out.
                </p>

                <motion.button
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-black"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                    <ArrowRight size={12} />
                  </span>
                  Join with us
                </motion.button>
              </div>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="group relative mt-9 overflow-hidden rounded-[1.05rem]"
              >
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team group"
                  className="h-[14.75rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {members.map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-[0.95rem] border border-black/4 bg-[#f5f3ef] p-2.5 shadow-[0_14px_34px_rgba(15,23,42,0.035)]"
                >
                  <div className="relative overflow-hidden rounded-[0.85rem] bg-[#dcc095]">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-[11.35rem] w-full object-contain object-center pt-2 transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#dcc095] via-[#dcc095]/75 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="px-2 pb-2 pt-4">
                    <h4 className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-medium tracking-[-0.045em] text-black">{m.name}</h4>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-black/38">{m.role}</p>

                    <div className="mt-4 flex gap-2">
                      {['f', 'x', 'in'].map((social) => (
                        <span
                          key={social}
                          className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#f5f5f5] text-[9px] font-bold uppercase text-black shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
                        >
                          {social}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Team;
