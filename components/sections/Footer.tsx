"use client";

import React from 'react';
import { motion } from 'motion/react';
import { sectionReveal } from '@/lib/animations';

const Footer = () => {
  return (
    <motion.footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12 lg:px-24" {...sectionReveal}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 relative">
          <h2 className="text-[10vw] font-bold tracking-tighter leading-none opacity-20">Let's</h2>
          <h2 className="text-[10vw] font-bold tracking-tighter leading-none -mt-4">talk now</h2>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
            <p className="text-[10px] uppercase tracking-widest font-bold">Get in touch • Get in touch •</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-8">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Footer"
                className="w-full h-full object-cover grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#f5f5f5] rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-black rounded-sm rotate-45" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <nav className="flex flex-col gap-4">
              {['About Us', 'Journal', 'Faq', 'Get In Touch', 'Careers'].map(link => (
                <a key={link} href="#" className="text-3xl font-bold hover:text-white/50 transition-colors">{link}</a>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm text-white/50 leading-relaxed mb-12">
              At Floka, we believe furniture should be more than just functional—it should tell your story. With a focus on timeless design, sustainable materials, and expert craftsmanship, we create pieces that feel personal.
            </p>
            <div className="space-y-4 mb-12">
              <p className="font-bold">info@floka-design.com</p>
              <p className="font-bold">+123 (456 789 00)</p>
              <p className="text-white/50">12/A, Booston Tower, NYC</p>
            </div>
            <div className="flex gap-6">
              {['Fb', 'X', 'In', 'Ig'].map((label) => (
                <a key={label} href="#" className="hover:text-white/50 transition-colors text-sm font-bold uppercase">{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-white/50">
          <p>Copyright © 2025 Case-Themes</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
