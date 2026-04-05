"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/app/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'portfolio', 'expertise', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Pages', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Blog', id: 'blog' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={cn(
      "fixed inset-x-0 top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm h-16" : "bg-white h-20"
    )}>
      <div className="mx-auto flex h-full max-w-[1680px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex cursor-pointer items-center gap-2.5"
          onClick={() => scrollTo('home')}
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex gap-0.5">
              <span className="h-[5px] w-[5px] bg-black" />
              <span className="h-[5px] w-[9px] bg-black" />
            </div>
            <div className="flex gap-0.5">
              <span className="h-[9px] w-[5px] bg-black" />
              <span className="h-[9px] w-[9px] bg-black" />
            </div>
          </div>
          <span className="text-[1.25rem] font-bold tracking-[-0.04em] text-black">Floka</span>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative text-[0.8rem] font-bold uppercase tracking-[0.1em] transition-all hover:text-black/60",
                activeSection === link.id ? "text-black" : "text-black/40"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 h-[2px] w-full bg-black rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Action Area */}
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="mailto:info@floka.com"
              className="text-[0.82rem] font-bold text-black"
            >
              info@floka.com
            </a>
            <div className="h-4 w-px bg-black/10" />
            <button className="flex flex-col gap-[3px] transition-transform hover:scale-110 active:scale-95">
              <div className="flex gap-[3px]">
                <span className="h-[3px] w-[3px] rounded-full bg-black" />
                <span className="h-[3px] w-[3px] rounded-full bg-black" />
              </div>
              <div className="flex gap-[3px]">
                <span className="h-[3px] w-[3px] rounded-full bg-black" />
                <span className="h-[3px] w-[3px] rounded-full bg-black" />
              </div>
            </button>
          </div>

          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-black/80 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-full border-t border-black/5 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    "text-xl font-bold text-left uppercase tracking-wider",
                    activeSection === link.id ? "text-black" : "text-black/30"
                  )}
                >
                  {link.name}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-black/5">
                <a href="mailto:info@floka.com" className="font-bold text-black">info@floka.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
