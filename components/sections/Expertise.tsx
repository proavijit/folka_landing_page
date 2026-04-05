"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const Expertise = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  const items = [
    { title: 'User Interface & Experience Design', content: 'We create intuitive and engaging interfaces that provide a seamless user experience.' },
    { title: 'Web Development', content: 'Our developers build fast, secure, and scalable web applications using the latest technologies.' },
    { title: 'Search Engine Optimization', content: 'We optimize your digital presence to ensure maximum visibility and reach.' },
    { title: 'Low-Code Development', content: 'Rapidly deploy solutions with our expert low-code development services.' },
  ];

  const praise = [
    { name: 'Avery', quote: '10/10 well recommended', avatar: 'https://i.pravatar.cc/80?u=exp-1' },
    { name: 'Nina', quote: 'Super speedy website designer', avatar: 'https://i.pravatar.cc/80?u=exp-2' },
    { name: 'Leo', quote: 'Great in UI/UX', avatar: 'https://i.pravatar.cc/80?u=exp-3' },
    { name: 'Mia', quote: 'Best design communicator', avatar: 'https://i.pravatar.cc/80?u=exp-4' },
    { name: 'Owen', quote: 'Sharp and reliable execution', avatar: 'https://i.pravatar.cc/80?u=exp-5' },
  ];

  return (
    <motion.section
      id="expertise"
      variants={sectionReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="relative bg-black bg-fixed text-white overflow-hidden"
    >
      <div className="container-wide relative w-full px-6 py-20 md:px-12 md:py-24 lg:px-24">
        <div className="text-center mb-20 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-4"
          >
            Company
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-6xl font-medium -mt-12 md:-mt-16"
          >
            expertise
          </motion.h3>
        </div>

        <div className="mx-auto max-w-5xl space-y-0">
          {items.map((item, i) => (
            <div key={i} className="border-b border-white/10">
              <button 
                className="flex w-full items-center gap-6 py-6 text-left md:gap-12"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
                  {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                </span>
                <span className="text-lg md:text-[1.65rem] font-medium">{item.title}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-8 pl-14 md:grid-cols-[minmax(0,1fr)_220px] md:pl-20">
                      <div>
                        <p className="max-w-2xl text-white/60">
                          {item.content}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {['Branding', 'Module', 'Product', 'UX'].map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-[#f5f5f5]/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-[1.2rem] bg-[#f5f5f5]/4">
                        <img
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
                          alt="Expertise preview"
                          className="h-[170px] w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="sticky bottom-6 mt-16 overflow-hidden py-4">
          <div className="animate-marquee-left flex min-w-max items-center gap-14 whitespace-nowrap">
            {[...praise, ...praise].map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center gap-3 text-sm text-white/90">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="font-medium">&ldquo;{item.quote}&rdquo;</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Expertise;
