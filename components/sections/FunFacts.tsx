"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { sectionReveal, staggerGrid, staggerItem } from '@/lib/animations';

const FunFacts = () => {
  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-18">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[360px]"
          >
            <motion.div
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[1.2rem] shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-black/10 blur-3xl" />
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/50 bg-[#f5f5f5]/55 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black/65 backdrop-blur-md">
                Real stories
              </div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
                alt="Fun facts team"
                className="h-[430px] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>

          <div className="max-w-[760px]">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-secondary"
            >
              Fun facts
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[620px] text-4xl font-medium leading-[1.15] tracking-[-0.05em] text-black md:text-[3.4rem]"
            >
              Consistently delivering impactful results through a perfect blend of design and functionality.
            </motion.h2>

            <motion.div
              className="mt-10 grid gap-4 md:grid-cols-[1.05fr_0.95fr]"
              variants={staggerGrid}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={staggerItem} className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-end justify-between rounded-[1rem] border border-black/5 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f3eb_100%)] px-5 py-5"
                >
                  <p className="max-w-[130px] text-[0.82rem] leading-5 text-secondary">
                    Successful projects completed
                  </p>
                  <p className="text-[2.6rem] font-medium tracking-[-0.06em] text-black">
                    2k<span className="text-black/20">+</span>
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-[1rem] bg-black p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                >
                  <div className="pointer-events-none absolute inset-x-10 bottom-0 h-16 rounded-full bg-[#f5f5f5]/10 blur-2xl" />
                  <div className="relative flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
                      alt="Project detail one"
                      className="h-16 w-18 rounded-[0.8rem] object-cover -rotate-12 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                      alt="Project detail two"
                      className="h-16 w-18 rounded-[0.8rem] object-cover rotate-6 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="relative mt-10 max-w-[270px] text-sm leading-7 text-white/75">
                    More than 2k+ projects completed, each crafted to deliver real-world results for ambitious brands.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1rem] border border-black/5 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f3eb_100%)] p-5"
                >
                  <div className="mb-3 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.28)]" />
                    ))}
                  </div>
                  <h4 className="text-[3.4rem] font-medium leading-none tracking-[-0.07em] text-black">4.9/5</h4>
                  <div className="my-6 h-px bg-black/10" />
                  <p className="max-w-[220px] text-sm leading-7 text-secondary">
                    We offer end-to-end creative solutions that make brands unforgettable.
                  </p>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="mt-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300">
                      <Plus size={14} />
                    </span>
                    Hire us now
                  </motion.button>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative overflow-hidden rounded-[1rem] bg-black text-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop"
                    alt="Worldwide base"
                    className="h-[84px] w-full object-cover opacity-45"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" />
                  <div className="absolute inset-0 flex items-end justify-between px-4 py-3">
                    <p className="max-w-[130px] text-[0.72rem] font-medium leading-5 text-white/90">
                      Worldwide base around the world
                    </p>
                    <span className="text-[2rem] font-medium tracking-[-0.05em]">5+</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FunFacts;
