"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const Awards = () => {
  const awards = [
    { title: 'Best Designer Awards', org: 'Awwwards', year: '2025' },
    { title: 'Peaky UI Designer', org: 'Google', year: '2024' },
    { title: 'Great in UX', org: 'Apple', year: '2023' },
    { title: 'Best Website Pick', org: 'Microsoft', year: '2022' },
    { title: 'Nelson UI & UX Designer', org: 'Samsung', year: '2021' },
  ];

  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide max-w-[1240px]">
        <div className="grid items-center gap-16 lg:grid-cols-[405px_1fr] lg:gap-24">
          {/* Left: Image Card */}
          <div className="flex flex-col items-start">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-[1.6rem]"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="Award" 
                className="h-[28rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
            <p className="mt-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-black/45">Get rewards</p>
          </div>

          {/* Right Column Content */}
          <div className="flex flex-col">
            {/* Trophy Emblem Seal */}
            <div className="mb-14 flex justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-black/10">
                <Trophy size={24} className="text-black/30" />
                <svg className="absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[7.5px] uppercase tracking-[0.14em] fill-black/20 font-bold">
                    <textPath xlinkHref="#circlePath">
                      Great Design Solutions • Awards & Recognition •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>

            <h2 className="mb-16 font-[family-name:var(--font-space-grotesk)] text-[2.1rem] font-medium leading-[1.1] tracking-[-0.06em] text-black md:text-[3rem]">
              Driven by passion and grounded in expertise, our team turns bold ideas into reality, leading the way in creative innovation.
            </h2>

            <div className="space-y-0.5">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="group grid grid-cols-[1.5fr_1fr_0.5fr] items-center gap-6 border-b border-black/8 py-5 transition-colors hover:border-black/20"
                >
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.1em] text-black">{award.title}</p>
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.08em] text-black/35">{award.org}</p>
                  <p className="justify-self-end text-[0.66rem] font-medium text-black/35">{award.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Awards;
