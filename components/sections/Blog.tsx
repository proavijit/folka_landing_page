"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const Blog = () => {
  const posts = [
    { title: 'Seamless user interfaces, crafted with intent.', date: 'NOV 07, 2025', category: 'WEB3', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Creative web platforms, designed for growth.', date: 'NOV 07, 2025', category: 'WEB3', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
    { title: 'Immersive virtual journeys, built with precision', date: 'NOV 07, 2025', category: 'WEB3', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide max-w-[1240px]">
        <div className="mb-16 text-center">
          <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.18em] text-black/50">Insights</p>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[2.2rem] font-medium leading-[1.04] tracking-[-0.06em] text-black md:text-[3.05rem]">
            Company blog &amp; updates
          </h2>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              whileHover={{ y: -4 }}
              className="rounded-[1.25rem] bg-black px-5 py-5 text-white"
            >
              <div className="mb-4 flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.1em] text-white/62">
                <span className="font-semibold text-white">{posts[0].category}</span>
                <span>{posts[0].date}</span>
              </div>
              <h4 className="max-w-[15ch] font-[family-name:var(--font-space-grotesk)] text-[1rem] font-medium leading-[1.35] tracking-[-0.035em] text-white">
                {posts[0].title}
              </h4>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.06 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-[1.25rem]"
            >
              <img
                src={posts[0].img}
                alt={posts[0].title}
                className="h-[20.25rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[1.25rem]"
            >
              <img
                src={posts[1].img}
                alt={posts[1].title}
                className="h-[20.5rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5] text-black shadow-[0_18px_45px_rgba(15,23,42,0.15)]">
                  <Plus size={18} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.14 }}
              whileHover={{ y: -4 }}
              className="rounded-[1.25rem] bg-[#f5f5f5] px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-5 flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.12em] text-black/40">
                <span className="font-semibold text-black">{posts[1].category}</span>
                <span>{posts[1].date}</span>
              </div>
              <h4 className="max-w-[14ch] font-[family-name:var(--font-space-grotesk)] text-[1.72rem] font-medium leading-[1.12] tracking-[-0.05em] text-black">
                {posts[1].title}
              </h4>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.18 }}
              whileHover={{ y: -4 }}
              className="rounded-[1.25rem] bg-black px-5 py-5 text-white"
            >
              <div className="mb-4 flex items-center gap-3 text-[8px] font-medium uppercase tracking-[0.1em] text-white/62">
                <span className="font-semibold text-white">{posts[2].category}</span>
                <span>{posts[2].date}</span>
              </div>
              <h4 className="max-w-[15ch] font-[family-name:var(--font-space-grotesk)] text-[1rem] font-medium leading-[1.35] tracking-[-0.035em] text-white">
                {posts[2].title}
              </h4>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.22 }}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-[1.25rem]"
            >
              <img
                src={posts[2].img}
                alt={posts[2].title}
                className="h-[20.25rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Blog;
