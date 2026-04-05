"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(2);
  const faqs = [
    { q: 'What is artificial intelligence (AI)?', a: 'AI is the simulation of human intelligence processes by machines, especially computer systems.' },
    { q: 'How does AI improve business efficiency?', a: 'AI can automate repetitive tasks, provide data-driven insights, and enhance customer experiences.' },
    { q: 'How long does AI implementation take?', a: 'Explore how we transform ideas into extraordinary digital experiences. Each case study is a testament to our design thinking, strategic approach, and creative execution.' },
    { q: 'What industries can benefit from AI?', a: 'Almost every industry, including healthcare, finance, retail, and manufacturing, can benefit from AI.' },
    { q: 'What are the costs of AI solutions?', a: 'Costs vary based on project scope, data readiness, integrations, and the depth of customization required.' },
  ];

  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide max-w-[1240px]">
        <div className="border-t border-black/8 pt-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-black/55">FAQ &amp; Get Answer</p>
        </div>

        <div className="mt-8 grid gap-14 lg:grid-cols-[0.72fr_1.08fr] lg:gap-20">
          <div className="flex flex-col justify-between">
            <div className="lg:pt-[15rem]">
              <p className="max-w-[20ch] text-[15px] leading-8 text-black/52">
                Don&apos;t found anything yet. Feel free to ask anything. <a href="#" className="font-medium text-black underline underline-offset-4">Let&apos;s Talk</a>
              </p>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35 }}
              className="group mt-10 overflow-hidden rounded-[1.3rem] shadow-[0_20px_50px_rgba(15,23,42,0.08)]"
            >
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
                alt="FAQ" 
                className="h-[14rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          <div>
            <h2 className="max-w-[10ch] font-[family-name:var(--font-space-grotesk)] text-[2.35rem] font-medium leading-[1.05] tracking-[-0.06em] text-black md:text-[3.15rem]">
              Have more questions? We&apos;ve answers.
            </h2>

            <div className="mt-12 space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  layout
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden rounded-[1.05rem] bg-[#f5f5f5] shadow-[0_12px_30px_rgba(15,23,42,0.04)]"
                >
                  <button 
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left"
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  >
                    <span className="font-[family-name:var(--font-space-grotesk)] text-[1.05rem] font-medium tracking-[-0.03em] text-black">
                      {faq.q}
                    </span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white">
                      {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        {i === 2 ? (
                          <div className="grid gap-5 px-5 pb-5 md:grid-cols-[180px_1fr]">
                            <motion.img
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.05 }}
                              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                              alt="FAQ detail"
                              className="h-28 w-full rounded-[0.9rem] object-cover"
                              referrerPolicy="no-referrer"
                            />

                            <motion.div
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35, delay: 0.1 }}
                              className="flex flex-col justify-between"
                            >
                              <p className="max-w-[34ch] text-[15px] leading-8 text-black/62">
                                {faq.a}
                              </p>
                              <motion.a
                                href="#contact"
                                whileHover={{ x: 5 }}
                                className="mt-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-black"
                              >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                                  <ArrowRight size={13} />
                                </span>
                                Get in touch
                              </motion.a>
                            </motion.div>
                          </div>
                        ) : (
                          <div className="px-5 pb-5">
                            <p className="max-w-[38ch] text-[15px] leading-8 text-black/58">
                              {faq.a}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FAQ;
