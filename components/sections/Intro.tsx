"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { WordsStagger } from "@/registry/spell-ui/words-stagger";
const Intro = () => {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <motion.section
      id="about"
      className="overflow-hidden bg-[#f8f8f8] px-4 py-20 md:px-6 md:py-28"
      {...animationProps}
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Top Header Section */}
        <div className="mb-14 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-6">
            {/* Spinning Circle Logo */}
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="absolute h-full w-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-black/20">
                  <textPath xlinkHref="#circlePath">Design • Agency • Creative • Studio •</textPath>
                </text>
              </svg>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white text-xl font-bold">
                F
              </div>
            </div>
            <p className="max-w-[180px] text-[0.85rem] leading-relaxed text-black/50">
              We design every project with long-term success in mind.
            </p>
          </div>

          <div className="max-w-[850px]">
            <h2 className="text-[2.5rem] font-medium leading-[1.1] tracking-tight text-black md:text-[3.5rem] lg:text-[4rem]">
              <WordsStagger>
                Our approach is straightforward—prioritizing functionality, speed, and clarity for solutions.
              </WordsStagger>
            </h2>
          </div>
        </div>

        {/* Bento Grid Section */}
        <div className="grid gap-4 lg:grid-cols-[260px_1fr_260px]">

          {/* Card 1: Experience */}
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-[2rem] bg-white p-8 border border-black/5 shadow-sm"
          >
            <div className="mb-8 border-b border-black/5 pb-8">
              <div className="flex items-start">
                <span className="text-[5.5rem] font-bold leading-none tracking-tighter text-black">25</span>
                <span className="text-4xl font-light text-black/20 ml-1">+</span>
              </div>
              <p className="mt-2 text-[10px] uppercase font-bold tracking-widest text-black/40">Years of experience</p>
            </div>
            <p className="text-[0.95rem] leading-relaxed text-black/60 mb-10">
              Explore how we transform ideas into extraordinary digital experiences.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-10 w-10 rounded-full border-2 border-white object-cover" alt="user" />
                ))}
              </div>
              <p className="text-[10px] font-bold leading-tight uppercase tracking-tight text-black/40">1200+ happy <br /> users review</p>
            </div>
          </motion.div>

          {/* Card 2: Main Feature (CEO) */}
          <motion.div
            className="group relative overflow-hidden rounded-[2.2rem] bg-[#0a0a0a] min-h-[480px] flex flex-col justify-end"
          >
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <motion.img
                src="/girl.png"
                alt="CEO"
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="h-[100%] w-full object-contain object-bottom group-hover:scale-[1.05] transition-transform duration-700"
              />
            </div>

            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute right-10 top-10 z-20 flex flex-col gap-6 text-right">
              <div className="text-white">
                <p className="text-xl font-bold tracking-tighter leading-none">ULTRA</p>
                <span className="text-[7px] uppercase tracking-[0.3em] font-bold text-white/40">Prestigious Winner</span>
              </div>
              <div className="text-white">
                <p className="text-xl font-bold tracking-tighter leading-none">HYPER</p>
                <span className="text-[7px] uppercase tracking-[0.3em] font-bold text-white/40">Best Award Winner</span>
              </div>
            </div>

            <div className="relative z-20 px-10 pb-10">
              <p className="text-xl md:text-[1.35rem] font-medium leading-[1.4] text-white max-w-[420px] tracking-tight">
                &quot;At Floka, we merge strategy, creativity, and technology to shape brands that people love.&quot;
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span className="h-px w-4 bg-white/20"></span>
                <p className="text-sm text-white font-bold">
                  Merizo H. Yelso <span className="font-normal text-white/40 ml-1">/ CEO</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Social & Progress */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] bg-white p-8 border border-black/5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-2">Follow us</p>
              <p className="text-2xl font-medium tracking-tight mb-6">For check updates</p>
              <div className="flex flex-wrap gap-2">
                {['DRIBBBLE', 'BEHANCE', 'LINKEDIN', 'X'].map((s) => (
                  <span key={s} className="px-4 py-1.5 rounded-full border border-black/10 text-[9px] font-bold tracking-wider hover:bg-black hover:text-white transition-all cursor-pointer">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 border border-black/5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-8">Impressions</p>
              <div className="space-y-4">
                {[
                  { name: 'Solutions', value: 100, color: 'bg-[#f0f0f0] text-black' },
                  { name: 'UI/UX', value: 90, color: 'bg-black text-white' },
                  { name: 'Explore', value: 72, color: 'border border-black/10 bg-transparent text-black' },
                ].map((stat) => (
                  <div key={stat.name} className="relative h-10 w-full bg-[#f8f8f8] rounded-2xl overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`absolute inset-0 flex items-center justify-between px-4 text-[10px] font-bold uppercase tracking-tight rounded-2xl ${stat.color}`}
                    >
                      <span>{stat.name}</span>
                      <span>{stat.value}%</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REFINED MARQUEE FOOTER */}
        <div className="mt-24 overflow-hidden select-none pointer-events-none relative w-full">
          <div
            className="flex w-max animate-marquee-left whitespace-nowrap text-[4.5vw] font-bold tracking-tighter uppercase leading-none py-4"
            style={{
              // Removed the brackets and passed the variable as a single string
              fontFamily: "var(--font-heading)",
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            {/* Set 1 */}
            <div className="flex items-center gap-[1.5vw] px-[1vw]">
              <span className="text-black/5">See how our </span>
              <span className="text-black/60">team combines </span>
              <span className="text-black/80">creativity, </span>
              <span className="text-black">technology, </span>
              <span className="text-black/40">and strategy — </span>
            </div>

            {/* Set 2 (Duplicate for seamless loop) */}
            <div className="flex items-center gap-[1.5vw] px-[1vw]">
              <span className="text-black/5">See how our </span>
              <span className="text-black/60">team combines </span>
              <span className="text-black/80">creativity, </span>
              <span className="text-black">technology, </span>
              <span className="text-black/40">and strategy — </span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Intro;