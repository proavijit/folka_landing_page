"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plus } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { sectionReveal, staggerGrid, staggerItem } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';
import { WordsStagger } from "@/registry/spell-ui/words-stagger";
const Portfolio = () => {
  const projects = [
    { title: 'Aldan Branding', category: 'Branding', year: '2025', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
    { title: 'Digital Solutions', category: 'Web Design', year: '2025', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop' },
    { title: 'Creative Agency', category: 'Marketing', year: '2025', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
    { title: 'Mobile App', category: 'App Design', year: '2025', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Vision Product', category: 'Product Design', year: '2025', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <motion.section
      id="portfolio"
      variants={sectionReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="section-padding bg-[#f5f5f5] overflow-hidden"
    >
      <div className="container-wide">
        <SectionHeading
          subtitle="Portfolio"
          title={<WordsStagger>Strategy to build powerful digital solutions</WordsStagger>}
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={staggerGrid}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className={cn(
                "group cursor-pointer",
                i === 2 ? "md:col-span-2 md:w-full" : ""
              )}
            >
              <motion.div
                className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[10px] bg-black shadow-[0_18px_50px_rgba(15,23,42,0.1)] transition-all duration-500 group-hover:shadow-[0_26px_70px_rgba(15,23,42,0.16)]"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-black/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full bg-[#f5f5f5]/10 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  Logoipsum
                </div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f5] text-black opacity-0 shadow-[0_12px_32px_rgba(255,255,255,0.18)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <ArrowRight className="-rotate-45" size={20} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  className="absolute bottom-4 left-4 text-[0.72rem] font-semibold uppercase tracking-[0.06em] text-white"
                >
                  Branding, module, product, ux
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="flex items-center justify-between rounded-[10px] bg-[#f5f5f5] px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-black">
                  {project.title}
                </p>
                <p className="text-xs font-medium text-secondary">{project.year}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 flex justify-center"
        >
          <button className="group flex items-center gap-6 bg-accent/50 hover:bg-black hover:text-white px-10 py-6 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg hover:shadow-black/20">
            <span className="font-bold uppercase tracking-[0.2em] text-xs">View All Projects</span>
            <div className="w-10 h-10 bg-black group-hover:bg-[#f5f5f5] rounded-full flex items-center justify-center text-white group-hover:text-black transition-colors">
              <Plus size={18} />
            </div>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
