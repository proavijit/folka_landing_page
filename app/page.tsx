"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Plus, 
  Minus, 
  Play, 
  Menu, 
  X, 
  ChevronRight,
  Phone,
  MapPin
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'portfolio', 'expertise', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
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
    { name: 'About', id: 'about' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Expertise', id: 'expertise' },
    { name: 'Contact', id: 'contact' },
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
      "fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 md:px-6",
      isScrolled ? "pt-3" : "pt-4"
    )}>
      <div
        className={cn(
          "mx-auto flex max-w-[1680px] items-center justify-between rounded-full border px-5 py-3 transition-all duration-500 md:px-8",
          isScrolled
            ? "border-black/10 bg-white/92 shadow-lg backdrop-blur-xl"
            : "border-white/50 bg-white/88 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
        )}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex cursor-pointer items-center gap-3"
          onClick={() => scrollTo('home')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
              <span className="h-1.5 w-3 rounded-[2px] bg-white" />
              <span className="h-3 w-1.5 rounded-[2px] bg-white" />
              <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-tighter text-black">Floka</span>
        </motion.div>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => scrollTo(link.id)}
              className={cn(
                "relative py-2 text-sm font-semibold transition-all",
                activeSection === link.id ? "text-black" : "text-secondary hover:text-black"
              )}
            >
              {link.name}
              {activeSection === link.id && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-black"
                />
              )}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="mailto:info@floka.com"
            className="text-sm font-medium text-black transition-colors hover:text-secondary"
          >
            info@floka.com
          </a>
          <button className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black text-white shadow-sm transition-transform hover:scale-105">
            <span className="grid grid-cols-2 gap-1">
              <span className="h-1 w-1 rounded-full bg-white" />
              <span className="h-1 w-1 rounded-full bg-white" />
              <span className="h-1 w-1 rounded-full bg-white" />
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
          </button>
        </div>

        <button 
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-4 right-4 top-full mt-3 overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id} 
                  onClick={() => scrollTo(link.id)}
                  className={cn(
                    "text-2xl font-bold text-left",
                    activeSection === link.id ? "text-black" : "text-secondary"
                  )}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const sectionViewport = { once: true, margin: '-120px' };

const sectionReveal = {
  initial: { opacity: 0, y: 56 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  viewport: sectionViewport,
};

const staggerGrid = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const CountUp = ({
  to,
  duration = 1.6,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) => {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let animationFrame = 0;
    let startTime: number | null = null;

    const updateValue = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setValue(Math.round(progress * to));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateValue);
      }
    };

    animationFrame = window.requestAnimationFrame(updateValue);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [duration, hasStarted, to]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {value}
    </motion.span>
  );
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#f5f1ea] px-4 pb-6 pt-24 md:px-6 md:pb-8 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(245,241,234,0.7)_32%,rgba(245,241,234,1)_68%)]" />
      <motion.div 
        style={{ y: scrollY * 0.5 }}
        className="absolute inset-x-4 bottom-6 top-24 md:inset-x-6 md:bottom-8 md:top-28"
      >
        <div className="relative h-full overflow-hidden rounded-[2rem] md:rounded-[2.25rem]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full scale-110 object-cover"
            poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-astronaut-working-on-a-laptop-5174/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,18,0.66)_0%,rgba(4,10,18,0.2)_42%,rgba(4,10,18,0.48)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(116,214,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,170,90,0.28),transparent_26%)]" />
        </div>
      </motion.div>

      <div className="relative mx-auto flex min-h-[820px] max-w-[1680px] flex-col justify-between overflow-hidden rounded-[2rem] px-7 pb-12 pt-8 md:min-h-[860px] md:px-12 md:pb-16 md:pt-12">
        <div className="flex justify-end">
          <div className="hidden rounded-full border border-white/20 bg-white/8 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md md:block">
            Creative studio and motion-first web systems
          </div>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-white text-[22vw] font-bold leading-[0.82] tracking-[-0.08em] sm:text-[18vw] md:text-[9rem] lg:text-[11rem]">
              Floka
            </h1>
            <div className="mt-0 md:mt-1">
              <span className="block pl-[34%] text-5xl font-light leading-none tracking-tight text-white/30 md:text-[5.5rem]">
                Studio
              </span>
            </div>
          </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="self-end"
          >
            <div className="w-full max-w-[420px] rounded-[1.6rem] bg-white p-3 text-black shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
              <div className="flex items-center gap-4 rounded-[1.25rem] bg-white p-2.5">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" 
                    alt="Head of Idea" 
                    className="h-28 w-28 rounded-[1rem] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b8b8b]">Head of idea</p>
                    <p className="mt-1 font-display text-[1.75rem] font-bold leading-none tracking-[-0.05em] text-black">
                      Almond D. Nelsi
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <motion.button 
                      whileHover={{ rotate: 90 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus size={18} />
                    </motion.button>
                    <a href="#contact" className="text-sm font-semibold uppercase tracking-[0.16em] text-black">
                      Let&apos;s talk
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-[420px] text-[0.95rem] font-semibold leading-8 text-white">
              No cookie-cutter websites. No fluff.
            </p>
            <p className="mt-1 max-w-[420px] text-[0.95rem] leading-8 text-white/58">
              Just real tools and smart strategies to grow your business and elevate your brand.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-white/30 text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ subtitle, title, className }: { subtitle: string, title: string, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={cn("mb-16", className)}
  >
    <p className="text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4">{subtitle}</p>
    <h2 className="text-4xl md:text-6xl font-medium leading-[1.1] tracking-tight max-w-3xl">
      {title}
    </h2>
  </motion.div>
);

const Intro = () => {
  return (
    <motion.section
      id="about"
      className="overflow-hidden bg-[#fbfaf8] px-4 py-20 md:px-6 md:py-28"
      {...sectionReveal}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="max-w-[220px] pt-2">
            <div className="mb-5 flex flex-col gap-4">
              <div className="relative flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full border border-black/8 bg-white">
                <div className="absolute inset-[-8px] rounded-full border border-black/5" />
                <div className="flex h-8 w-8 items-center justify-center rounded-[0.8rem] bg-black text-white">
                  <div className="grid grid-cols-2 gap-0.5">
                    <span className="h-1 w-1 rounded-[2px] bg-white" />
                    <span className="h-1 w-2.5 rounded-[2px] bg-white" />
                    <span className="h-2.5 w-1 rounded-[2px] bg-white" />
                    <span className="h-1 w-1 rounded-[2px] bg-white" />
                  </div>
                </div>
              </div>
              <div>
                <p className="max-w-[150px] text-[0.9rem] leading-7 text-secondary">
                  We design every project with long-term success in mind.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-[720px]">
            <h2 className="text-[2.2rem] font-medium leading-[1.06] tracking-[-0.055em] text-black md:text-[3.35rem]">
              Our approach is straightforward,
              <span className="inline text-black/90"> prioritizing functionality, speed, and </span>
              <span>clarity for solutions.</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)_230px]">
          <div className="rounded-[1.9rem] border border-black/6 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <div className="mb-6 flex items-start justify-between gap-3 border-b border-black/8 pb-5">
              <div>
                <div className="flex items-start">
                  <CountUp
                    to={25}
                    className="font-display text-[5.5rem] font-bold leading-none tracking-[-0.08em] text-black"
                  />
                  <span className="mt-2 text-4xl font-light text-black/12">+</span>
                </div>
                <p className="mt-2 text-xs text-secondary">Years of experience</p>
              </div>
            </div>
            <p className="text-[0.95rem] leading-8 text-secondary">
              Explore how we transform ideas into extraordinary digital experiences.
            </p>
            <div className="mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/120?u=intro-${i}`}
                    alt="User"
                    className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-black">1200+ happy users review</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.9rem] bg-[#0b0b0b] shadow-[0_24px_60px_rgba(15,23,42,0.14)] md:min-h-[430px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.05),transparent_34%)]" />
            <div className="absolute right-10 top-9 hidden text-right text-white md:block">
              <div className="space-y-7">
                <div className="leading-none">
                  <p className="text-[1.15rem] font-bold uppercase tracking-[-0.03em]">ULTRA</p>
                  <p className="mt-1 text-[0.42rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Prestigious
                  </p>
                  <p className="mt-0.5 text-[0.42rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Winner
                  </p>
                </div>
                <div className="leading-none">
                  <p className="text-[1.15rem] font-bold uppercase tracking-[-0.03em]">HYPER</p>
                  <p className="mt-1 text-[0.42rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Best award
                  </p>
                  <p className="mt-0.5 text-[0.42rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Winner
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 top-0 flex w-[63%] items-end justify-start overflow-hidden">
              <img
                src="/home1-author-img1.webp"
                alt="Floka featured author"
                className="h-[103%] w-auto max-w-none object-contain object-bottom"
              />
            </div>
            <div className="relative z-10 flex min-h-[430px] flex-col justify-end px-10 pb-9">
              <p className="max-w-[610px] text-[1.25rem] font-medium leading-[1.38] tracking-[-0.04em] text-white md:text-[1.55rem]">
                &ldquo;At Floka, we merge strategy, creativity, and technology to shape brands that people love.&rdquo;
              </p>
              <p className="mt-5 text-[0.95rem] font-semibold text-white">
                Merizo H. Yelso <span className="font-normal text-white/42">/CEO</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[1.9rem] border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm text-secondary">Follow us</p>
              <p className="mt-2 text-[1.85rem] font-medium leading-tight tracking-[-0.05em] text-black">
                For check updates
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['DRIBBBLE', 'BEHANCE', 'LINKEDIN', 'X', 'XING'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium tracking-[0.04em] text-black transition-colors hover:bg-black hover:text-white"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-black/6 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm text-secondary">Impressions</p>
              <div className="mt-8 space-y-3">
                {[
                  { name: 'Solutions', value: 100, shell: 'bg-[#f3f3f1]', fill: 'bg-[#ededeb] text-black' },
                  { name: 'UI/UX', value: 90, shell: 'bg-[#f3f3f1]', fill: 'bg-black text-white' },
                  { name: 'Explore', value: 72, shell: 'bg-white border border-black/10', fill: 'bg-white text-black' },
                ].map((stat) => (
                  <div key={stat.name} className="rounded-[0.8rem]">
                    <div className={cn("h-8 overflow-hidden rounded-[0.7rem]", stat.shell)}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15 }}
                        className={cn(
                          "flex h-full items-center justify-between rounded-[0.7rem] px-3 text-[0.72rem] font-medium",
                          stat.fill
                        )}
                      >
                        <span>{stat.name}</span>
                        <span>{stat.value}%</span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-20 overflow-hidden py-8">
          <div className="animate-marquee-right whitespace-nowrap text-[4.5rem] font-medium leading-none tracking-[-0.08em] text-black/18 blur-[0.5px] md:text-[7rem] lg:text-[8rem]">
            <span className="mr-10">
              Our team combines creativity, technology, and clarity for modern digital solutions.
            </span>
            <span className="mr-10">
              Our team combines creativity, technology, and clarity for modern digital solutions.
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
const About = () => {
  return (
    <section className="section-padding bg-accent/30">
      <div className="container-wide grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3">
          <div className="mb-12">
            <h3 className="text-7xl font-bold mb-2">25+</h3>
            <p className="text-secondary uppercase tracking-widest text-xs">Years of experience</p>
          </div>
          <p className="text-lg mb-8">
            Explore how we transform ideas into extraordinary digital experiences.
          </p>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/150?u=${i}`} 
                alt="User" 
                className="w-12 h-12 rounded-full border-4 border-white object-cover"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
          <p className="mt-4 text-sm font-medium">1200+ happy users review</p>
        </div>

        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
            alt="Quote" 
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8 text-white">
            <p className="text-xl font-medium mb-6 italic leading-relaxed">
              "At Floka, we merge strategy, creativity, and technology to shape brands that people love."
            </p>
            <div>
              <p className="font-bold">Mertoz H. Yaloz</p>
              <p className="text-sm text-white/70">CEO</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <p className="text-xs uppercase tracking-widest text-secondary mb-6">Follow us</p>
            <p className="text-lg font-medium mb-8">For check updates</p>
            <div className="grid grid-cols-2 gap-4">
              {['DRIBBBLE', 'BEHANCE', 'LINKEDIN', 'X', 'KING'].map((social) => (
                <a key={social} href="#" className="text-xs font-bold hover:underline">{social}</a>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm mt-8">
            <p className="text-xs uppercase tracking-widest text-secondary mb-6">Impressions</p>
            <div className="space-y-6">
              {[
                { name: 'Solutions', value: 100 },
                { name: 'UI/UX', value: 90 },
                { name: 'Explore', value: 72 },
              ].map((stat) => (
                <div key={stat.name}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>{stat.name}</span>
                    <span>{stat.value}%</span>
                  </div>
                  <div className="w-full h-1 bg-accent rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-black"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    { title: 'Aldan Branding', category: 'Branding', year: '2025', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop' },
    { title: 'Digital Solutions', category: 'Web Design', year: '2025', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop' },
    { title: 'Creative Agency', category: 'Marketing', year: '2025', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop' },
    { title: 'Mobile App', category: 'App Design', year: '2025', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Vision Product', category: 'Product Design', year: '2025', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <motion.section id="portfolio" className="section-padding bg-white overflow-hidden" {...sectionReveal}>
      <div className="container-wide">
        <SectionHeading 
          subtitle="Portfolio" 
          title="Strategy to build powerful digital solutions" 
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
                <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                  Logoipsum
                </div>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-[0_12px_32px_rgba(255,255,255,0.18)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
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
                className="flex items-center justify-between rounded-[10px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)]"
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
            <div className="w-10 h-10 bg-black group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-black transition-colors">
              <Plus size={18} />
            </div>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};

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
      className="relative bg-black bg-fixed text-white overflow-hidden"
      {...sectionReveal}
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
                              className="rounded-full bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/90"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="overflow-hidden rounded-[1.2rem] bg-white/4">
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

const FunFacts = () => {
  return (
    <motion.section className="section-padding bg-white" {...sectionReveal}>
      <div className="container-wide grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Team" 
              className="rounded-3xl h-64 w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Meeting" 
              className="rounded-3xl h-80 w-full object-cover -mt-16"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-secondary mb-4">Fun Facts</p>
          <h2 className="text-4xl md:text-5xl font-medium mb-12 leading-tight">
            Consistently delivering impactful results through a perfect blend of design and functionality.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-accent/30 p-8 rounded-3xl">
              <div className="flex justify-between items-start mb-8">
                <p className="text-sm font-medium max-w-[100px]">Successful projects completed</p>
                <span className="text-5xl font-bold">2k</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-40">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                  alt="Project" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Play size={16} fill="black" />
                  </div>
                </div>
              </div>
              <p className="mt-6 text-sm text-secondary">
                More than 2k+ projects completed—each crafted to deliver real-world results for ambitious brands.
              </p>
            </div>

            <div className="bg-accent/30 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => <div key={i} className="w-4 h-4 bg-orange-400 rounded-full" />)}
                </div>
                <h4 className="text-5xl font-bold mb-2">4.9/5</h4>
                <p className="text-sm text-secondary">We offer end-to-end creative solutions that make brands unforgettable.</p>
              </div>
              
              <div className="mt-8 space-y-4">
                <button className="w-full bg-white py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-black rounded-full" />
                  Hire us now
                </button>
                <div className="bg-black text-white p-6 rounded-2xl flex justify-between items-center">
                  <p className="text-xs font-medium">Worldwide base around the world</p>
                  <span className="text-2xl font-bold">5+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Logos = () => {
  return (
    <motion.section className="py-20 bg-white border-y border-accent" {...sectionReveal}>
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-40 grayscale">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex justify-center">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-sm rotate-45" />
                <span className="font-display font-bold text-lg">LOGOIPSUM</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const VideoSection = () => {
  return (
    <motion.section className="relative h-[600px] w-full overflow-hidden" {...sectionReveal}>
      <img 
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
        alt="Video BG" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <button className="flex flex-col items-center gap-4 group">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
            <Play size={32} fill="black" />
          </div>
          <span className="text-white font-bold uppercase tracking-widest text-xs">Play Reel</span>
        </button>
      </div>
    </motion.section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: 'Nicolas K. Ellington', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
    { name: 'Julian T. Beaumont', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
    { name: 'Felipe D. Hawthorne', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
  ];

  return (
    <motion.section className="section-padding bg-accent/10 overflow-hidden" {...sectionReveal}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeading 
            subtitle="Testimonials" 
            title="Accelerating growth, and unlocking new potential. Let's build your brand—together."
            className="mb-0"
          />
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => <img key={i} src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white" />)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow duration-500"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <div key={i} className="w-3 h-3 bg-orange-400 rounded-full" />)}
                </div>
                <p className="text-lg mb-8 leading-relaxed italic">"{t.text}"</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-secondary">{t.role}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Great Design Solutions</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Contact = () => {
  return (
    <motion.section id="contact" className="section-padding bg-black text-white overflow-hidden" {...sectionReveal}>
      <div className="container-wide grid lg:grid-cols-2 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4">Get in touch</p>
          <h2 className="text-4xl md:text-6xl font-medium mb-12 leading-tight">
            Tell us about your project—whether it's a website, SEO, or marketing.
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Talk to us</p>
                <p className="font-bold">Work and general inquiries</p>
                <p className="text-white/70">+1 23 456 789 00</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Post Address</p>
                <p className="font-bold">541 Melville Ave, Palo Alto, CA</p>
                <p className="text-white/70">94301, United States</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white text-black p-10 rounded-[3rem] shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-8">Have a project in mind?</h3>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full border-b border-accent py-4 outline-none focus:border-black transition-colors" />
              <input type="email" placeholder="Business Email" className="w-full border-b border-accent py-4 outline-none focus:border-black transition-colors" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <select className="w-full border-b border-accent py-4 outline-none focus:border-black transition-colors bg-transparent">
                <option>Budget</option>
                <option>$1000 - $5000</option>
                <option>$5000+</option>
              </select>
              <select className="w-full border-b border-accent py-4 outline-none focus:border-black transition-colors bg-transparent">
                <option>Service</option>
                <option>Web Design</option>
                <option>SEO</option>
              </select>
            </div>
            <textarea placeholder="Message" rows={4} className="w-full border-b border-accent py-4 outline-none focus:border-black transition-colors resize-none" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-4 group mt-8"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
                <ArrowRight size={20} />
              </div>
              <span className="font-bold uppercase tracking-widest text-xs">Let's Talk</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Awards = () => {
  const awards = [
    { title: 'Best Designer Awards', org: 'Awwwards', year: '2025' },
    { title: 'Peaky UI Designer', org: 'Google', year: '2024' },
    { title: 'Great in UX', org: 'Apple', year: '2023' },
    { title: 'Best Website Pick', org: 'Microsoft', year: '2022' },
    { title: 'Nelson UI & UX Designer', org: 'Samsung', year: '2021' },
  ];

  return (
    <motion.section className="section-padding bg-white" {...sectionReveal}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="flex items-center gap-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
              alt="Award" 
              className="w-32 h-40 rounded-3xl object-cover"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-4xl md:text-6xl font-medium max-w-md">Driven by passion and</h2>
          </div>
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-black rounded-full border-t-transparent animate-spin" />
          </div>
        </div>

        <div className="space-y-0">
          {awards.map((award, i) => (
            <div key={i} className="group border-b border-accent py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-accent/10 transition-colors px-4 rounded-xl">
              <h4 className="text-lg font-bold uppercase tracking-widest">{award.title}</h4>
              <span className="text-secondary uppercase text-xs font-bold">{award.org}</span>
              <span className="text-secondary font-medium">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Team = () => {
  const members = [
    { name: 'Nicolas K. Ellington', role: 'Founder', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Carlos E. Ashcroft', role: 'Founder', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Leonardo F. Ashton', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
    { name: 'Ricardo P. Winslow', role: 'UI Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  ];

  return (
    <motion.section className="section-padding bg-accent/20" {...sectionReveal}>
      <div className="container-wide">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-secondary mb-4">Our Avengers</p>
          <h2 className="text-4xl md:text-6xl font-medium mb-8">Meet with our team</h2>
          <div className="flex gap-8 border-b border-accent pb-8">
            <button className="font-bold text-sm border-b-2 border-black pb-8 -mb-8">DESIGN TEAM</button>
            <button className="font-bold text-sm text-secondary">DEVELOPMENT TEAM</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={m.img} 
                  alt={m.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-bold uppercase">X</div>
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-bold uppercase">In</div>
                </div>
              </div>
              <h4 className="font-bold">{m.name}</h4>
              <p className="text-xs text-secondary uppercase tracking-widest mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    { q: 'What is artificial intelligence (AI)?', a: 'AI is the simulation of human intelligence processes by machines, especially computer systems.' },
    { q: 'How does AI improve business efficiency?', a: 'AI can automate repetitive tasks, provide data-driven insights, and enhance customer experiences.' },
    { q: 'How long does AI implementation take?', a: 'Implementation time varies depending on the complexity of the solution, ranging from weeks to months.' },
    { q: 'What industries can benefit from AI?', a: 'Almost every industry, including healthcare, finance, retail, and manufacturing, can benefit from AI.' },
  ];

  return (
    <motion.section className="section-padding bg-white" {...sectionReveal}>
      <div className="container-wide grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-widest text-secondary mb-4">FAQ & Get Answer</p>
          <h2 className="text-4xl md:text-5xl font-medium mb-8">Have more questions?</h2>
          <p className="text-secondary mb-12">Don't found anything yet. Feel free to ask anything. <a href="#" className="text-black font-bold underline">Let's Talk</a></p>
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" 
            alt="FAQ" 
            className="rounded-3xl h-64 w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="lg:col-span-8 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-accent pb-4">
              <button 
                className="w-full flex justify-between items-center py-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="text-lg font-bold">{faq.q}</span>
                {openIndex === i ? <Minus /> : <Plus />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-secondary pb-6 max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const Blog = () => {
  const posts = [
    { title: 'Seamless user interfaces, crafted with intent.', date: 'NOV 07, 2025', category: 'WEB', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Creative web platforms, designed for growth.', date: 'NOV 07, 2025', category: 'WEB', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop' },
    { title: 'Immersive virtual journeys, built with precision', date: 'NOV 07, 2025', category: 'WEB', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <motion.section className="section-padding bg-accent/10" {...sectionReveal}>
      <div className="container-wide">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-widest text-secondary mb-4">Insights</p>
          <h2 className="text-4xl md:text-6xl font-medium">Company blog & updates</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-3xl mb-6">
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-black text-white px-4 py-2 rounded-full text-[10px] font-bold">
                  {post.category} — {post.date}
                </div>
              </div>
              <h4 className="text-xl font-bold leading-tight group-hover:underline">{post.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

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
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
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

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Intro />
      <Portfolio />
      <Expertise />
      <FunFacts />
      <Logos />
      <VideoSection />
      <Testimonials />
      <Contact />
      <Awards />
      <Team />
      <FAQ />
      <Blog />
      <Footer />
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-transform"
      >
        <ChevronRight className="-rotate-90" />
      </button>

      <style>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        @keyframes marquee-right {
          from { transform: translateX(-45%); }
          to { transform: translateX(0%); }
        }
        .animate-marquee-right {
          display: inline-block;
          min-width: max-content;
          animation: marquee-right 18s linear infinite alternate;
        }
        @keyframes marquee-left {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 24s linear infinite;
        }
      `}</style>
    </div>
  );
}
