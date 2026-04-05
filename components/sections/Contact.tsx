"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import { sectionReveal } from '@/lib/animations';

const Contact = () => {
  return (
    <motion.section id="contact" className="section-padding relative overflow-hidden bg-black text-white" {...sectionReveal}>
      <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:radial-gradient(rgba(255,255,255,0.11)_0.7px,transparent_0.7px)] [background-size:6px_6px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_42%,rgba(0,0,0,0.48)_100%)]" />
      <div className="container-wide relative">
        <div className="px-2 py-2 md:px-4 md:py-4">
          <div className="relative grid items-start gap-12 lg:grid-cols-[1.08fr_0.82fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-10"
            >
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Get in touch</p>
              <h2 className="mb-14 max-w-[12.5ch] text-[2.2rem] font-medium leading-[1.02] tracking-[-0.05em] text-white md:text-[3.15rem]">
                Tell us about your project whether it&apos;s a website, SEO, or marketing.
              </h2>

              <div className="grid max-w-[30rem] gap-10 text-sm text-white/78 sm:grid-cols-2 sm:gap-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/72">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-[#f5f5f5]/6">
                      <Phone size={10} />
                    </span>
                    Talk to us
                  </div>
                  <p className="max-w-[20ch] text-white/62">Work and general inquiries</p>
                  <p className="font-medium text-white/92">+123 456 789 00</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/72">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-[#f5f5f5]/6">
                      <MapPin size={10} />
                    </span>
                    Post address
                  </div>
                  <p className="max-w-[24ch] text-white/62">541 Melville Ave, Palo Alto, CA 94301, United States</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="w-full max-w-[20rem] justify-self-start rounded-[1.2rem] bg-[#fbfaf8] p-6 text-black shadow-[0_26px_60px_rgba(15,23,42,0.18)] md:mt-2 md:p-7"
            >
              <h3 className="mb-6 text-[1.08rem] font-semibold tracking-[-0.03em]">Have a project in mind?</h3>
              <form className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="text" placeholder="YOUR NAME" className="h-10 w-full rounded-md border border-black/5 bg-[#f0eeeb] px-3 text-[9px] font-medium uppercase tracking-[0.08em] text-black placeholder:text-black/35 outline-none transition-all focus:border-black/18 focus:bg-[#f5f5f5]" />
                  <input type="email" placeholder="BUSINESS EMAIL" className="h-10 w-full rounded-md border border-black/5 bg-[#f0eeeb] px-3 text-[9px] font-medium uppercase tracking-[0.08em] text-black placeholder:text-black/35 outline-none transition-all focus:border-black/18 focus:bg-[#f5f5f5]" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/70">Budget</p>
                    <select className="h-10 w-full rounded-md border border-black/5 bg-[#f0eeeb] px-3 text-[9px] font-medium uppercase tracking-[0.08em] text-black outline-none transition-all focus:border-black/18 focus:bg-[#f5f5f5]">
                      <option>$1000 - $5000</option>
                      <option>$5000 - $10000</option>
                      <option>$10000+</option>
                    </select>
                  </div>
                  <div>
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/70">Service</p>
                    <select className="h-10 w-full rounded-md border border-black/5 bg-[#f0eeeb] px-3 text-[9px] font-medium uppercase tracking-[0.08em] text-black outline-none transition-all focus:border-black/18 focus:bg-[#f5f5f5]">
                      <option>Consultancy</option>
                      <option>Web Design</option>
                      <option>SEO</option>
                    </select>
                  </div>
                </div>

                <textarea placeholder="MESSAGE" rows={4} className="min-h-[5.9rem] w-full resize-none rounded-md border border-black/5 bg-[#f0eeeb] px-3 py-3 text-[9px] font-medium uppercase tracking-[0.08em] text-black placeholder:text-black/35 outline-none transition-all focus:border-black/18 focus:bg-[#f5f5f5]" />

                <motion.button
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-2 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em]"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white shadow-[0_8px_20px_rgba(15,23,42,0.16)]">
                    <ArrowRight size={12} />
                  </div>
                  <span>Let&apos;s talk</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
