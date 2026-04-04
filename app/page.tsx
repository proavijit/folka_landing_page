"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { 
  ArrowRight, 
  Plus, 
  Minus, 
  Play, 
  Menu, 
  X, 
  ChevronRight,
  Phone,
  MapPin,
  Trophy
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Custom Cursor ---

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body, a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      {/* Outer Circle */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(0,0,0,0.05)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
};

// --- Components ---

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

const sectionViewport = { once: true, margin: '-120px' };

const sectionReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } 
  },
  viewport: sectionViewport,
};

const staggerGrid = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  },
  whileInView: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  },
};

const revealItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }
  },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }
  }
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
    <section id="home" className="relative overflow-hidden bg-[#f5f5f5] px-4 pb-6 pt-24 md:px-6 md:pb-8 md:pt-28">
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

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative mx-auto flex min-h-[820px] max-w-[1680px] flex-col justify-between overflow-hidden rounded-[2rem] px-7 pb-12 pt-8 md:min-h-[860px] md:px-12 md:pb-16 md:pt-12"
      >
        <div className="flex justify-end">
          <div className="hidden rounded-full border border-white/20 bg-[#f5f5f5]/8 px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md md:block">
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
            <div className="w-full max-w-[340px] rounded-[2rem] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-5">
                <div className="shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                    alt="Almond D. Nelsi" 
                    className="h-24 w-24 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#A3B1C2]">Head of idea</p>
                  <p className="mt-0.5 text-xl font-bold leading-tight tracking-tight text-black">
                    Almond D. Nelsi
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </motion.button>
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black">
                      Let&apos;s talk
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <p className="text-[1.125rem] font-bold leading-tight text-white">
                No cookie-cutter websites. No fluff.
              </p>
              <p className="max-w-[320px] text-[0.95rem] leading-snug text-white/40">
                Just real tools and smart strategies to grow your business and elevate your brand.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

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
      className="overflow-hidden bg-[#f5f5f5] px-4 py-20 md:px-6 md:py-28"
      {...sectionReveal}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div className="max-w-[220px] pt-2">
            <div className="mb-5 flex flex-col gap-4">
              <div className="relative flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-full border border-black/8 bg-[#f5f5f5]">
                <div className="absolute inset-[-8px] rounded-full border border-black/5" />
                <div className="flex h-8 w-8 items-center justify-center rounded-[0.8rem] bg-black text-white">
                  <div className="grid grid-cols-2 gap-0.5">
                    <span className="h-1 w-1 rounded-[2px] bg-[#f5f5f5]" />
                    <span className="h-1 w-2.5 rounded-[2px] bg-[#f5f5f5]" />
                    <span className="h-2.5 w-1 rounded-[2px] bg-[#f5f5f5]" />
                    <span className="h-1 w-1 rounded-[2px] bg-[#f5f5f5]" />
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
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-[1.9rem] border border-black/6 bg-[#f5f5f5] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)]"
          >
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
                  <motion.img
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    src={`https://i.pravatar.cc/120?u=intro-${i}`}
                    alt="User"
                    className="h-11 w-11 rounded-full border-2 border-white object-cover"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-black">1200+ happy users review</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.99 }}
            className="relative overflow-hidden rounded-[1.9rem] bg-[#0b0b0b] shadow-[0_24px_60px_rgba(15,23,42,0.14)] md:min-h-[430px]"
          >
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
          </motion.div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[1.9rem] border border-black/6 bg-[#f5f5f5] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
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

            <div className="rounded-[1.9rem] border border-black/6 bg-[#f5f5f5] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
              <p className="text-sm text-secondary">Impressions</p>
              <div className="mt-8 space-y-3">
                {[
                  { name: 'Solutions', value: 100, shell: 'bg-[#f3f3f1]', fill: 'bg-[#ededeb] text-black' },
                  { name: 'UI/UX', value: 90, shell: 'bg-[#f3f3f1]', fill: 'bg-black text-white' },
                  { name: 'Explore', value: 72, shell: 'bg-[#f5f5f5] border border-black/10', fill: 'bg-[#f5f5f5] text-black' },
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
    <motion.section 
      variants={sectionReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="section-padding bg-[#f5f5f5]"
    >
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
          <div className="bg-[#f5f5f5] p-8 rounded-3xl shadow-sm">
            <p className="text-xs uppercase tracking-widest text-secondary mb-6">Follow us</p>
            <p className="text-lg font-medium mb-8">For check updates</p>
            <div className="grid grid-cols-2 gap-4">
              {['DRIBBBLE', 'BEHANCE', 'LINKEDIN', 'X', 'KING'].map((social) => (
                <a key={social} href="#" className="text-xs font-bold hover:underline">{social}</a>
              ))}
            </div>
          </div>

          <div className="bg-[#f5f5f5] p-8 rounded-3xl shadow-sm mt-8">
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
    </motion.section>
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

const FunFacts = () => {
  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)] xl:gap-18">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[360px]"
          >
            <motion.div
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[1.2rem] shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full bg-black/10 blur-3xl" />
              <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/50 bg-[#f5f5f5]/55 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black/65 backdrop-blur-md">
                Real stories
              </div>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
                alt="Fun facts team"
                className="h-[430px] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>

          <div className="max-w-[760px]">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-secondary"
            >
              Fun facts
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[620px] text-4xl font-medium leading-[1.15] tracking-[-0.05em] text-black md:text-[3.4rem]"
            >
              Consistently delivering impactful results through a perfect blend of design and functionality.
            </motion.h2>

            <motion.div
              className="mt-10 grid gap-4 md:grid-cols-[1.05fr_0.95fr]"
              variants={staggerGrid}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.div variants={staggerItem} className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex items-end justify-between rounded-[1rem] border border-black/5 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f3eb_100%)] px-5 py-5"
                >
                  <p className="max-w-[130px] text-[0.82rem] leading-5 text-secondary">
                    Successful projects completed
                  </p>
                  <p className="text-[2.6rem] font-medium tracking-[-0.06em] text-black">
                    2k<span className="text-black/20">+</span>
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="relative overflow-hidden rounded-[1rem] bg-black p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                >
                  <div className="pointer-events-none absolute inset-x-10 bottom-0 h-16 rounded-full bg-[#f5f5f5]/10 blur-2xl" />
                  <div className="relative flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
                      alt="Project detail one"
                      className="h-16 w-18 rounded-[0.8rem] object-cover -rotate-12 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
                      alt="Project detail two"
                      className="h-16 w-18 rounded-[0.8rem] object-cover rotate-6 shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="relative mt-10 max-w-[270px] text-sm leading-7 text-white/75">
                    More than 2k+ projects completed, each crafted to deliver real-world results for ambitious brands.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={staggerItem} className="space-y-4">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-[1rem] border border-black/5 bg-[linear-gradient(180deg,#fffdf8_0%,#f7f3eb_100%)] p-5"
                >
                  <div className="mb-3 flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.28)]" />
                    ))}
                  </div>
                  <h4 className="text-[3.4rem] font-medium leading-none tracking-[-0.07em] text-black">4.9/5</h4>
                  <div className="my-6 h-px bg-black/10" />
                  <p className="max-w-[220px] text-sm leading-7 text-secondary">
                    We offer end-to-end creative solutions that make brands unforgettable.
                  </p>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className="mt-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300">
                      <Plus size={14} />
                    </span>
                    Hire us now
                  </motion.button>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="relative overflow-hidden rounded-[1rem] bg-black text-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop"
                    alt="Worldwide base"
                    className="h-[84px] w-full object-cover opacity-45"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/20" />
                  <div className="absolute inset-0 flex items-end justify-between px-4 py-3">
                    <p className="max-w-[130px] text-[0.72rem] font-medium leading-5 text-white/90">
                      Worldwide base around the world
                    </p>
                    <span className="text-[2rem] font-medium tracking-[-0.05em]">5+</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Logos = () => {
  const logoItems = [
    { name: 'Logoipsum', color: 'bg-blue-600' },
    { name: 'Logoipsum', color: 'bg-lime-500' },
    { name: 'Logoipsum', color: 'bg-violet-500' },
    { name: 'Logoipsum', color: 'bg-sky-500' },
    { name: 'logoipsum', color: 'bg-lime-400' },
    { name: 'Logoipsum', color: 'bg-pink-600' },
    { name: 'Logoipsum', color: 'bg-red-500' },
    { name: 'Next can be you', color: 'bg-black' },
  ];

  return (
    <motion.section className="py-20 bg-[#f5f5f5] border-y border-accent" {...sectionReveal}>
      <div className="container-wide">
        <div className="mb-5 flex items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-black/55">
          <span>Happy users</span>
          <span>©2025 CaseThemes studio</span>
        </div>

        <motion.div
          className="overflow-hidden rounded-[1.1rem] border border-black/6 bg-[#f5f5f5]"
          variants={staggerGrid}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {logoItems.map((item, i) => (
              <motion.div
                key={`${item.name}-${i}`}
                variants={staggerItem}
                whileHover={{ y: -2, backgroundColor: 'rgba(249,246,239,0.9)' }}
                className="group flex min-h-[100px] items-center justify-center border-b border-r border-black/6 px-6 py-8 text-center last:border-r-0 md:min-h-[108px]"
              >
                {i === 7 ? (
                  <div className="space-y-2 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-black/60">
                    <p>Next can be you</p>
                    <p className="text-black">Let&apos;s talk</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 transition-transform duration-300 group-hover:scale-105">
                    <span className={cn("h-4 w-4 rounded-[4px] rotate-12", item.color)} />
                    <span className="font-display text-lg font-bold text-black">{item.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const VideoSection = () => {
  return (
    <motion.section className="bg-[#f5f5f5] pb-16" {...sectionReveal}>
      <div className="container-wide">
        <motion.div
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group relative overflow-hidden rounded-[1.2rem]"
        >
          <motion.img
            variants={{
              rest: { scale: 1, filter: 'blur(0px)' },
              hover: { scale: 1.04, filter: 'blur(3px)' },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
            alt="Video BG"
            className="h-[560px] w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <motion.div
            variants={{
              rest: { backgroundColor: 'rgba(0,0,0,0.18)' },
              hover: { backgroundColor: 'rgba(0,0,0,0.32)' },
            }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          />
          <motion.button
            variants={{
              rest: {
                scale: 1,
                left: '1.5rem',
                top: 'calc(100% - 1.5rem)',
                x: '0%',
                y: '-100%',
              },
              hover: {
                scale: 1.06,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              },
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center gap-3 rounded-full bg-[#f5f5f5] px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-black shadow-[0_12px_30px_rgba(15,23,42,0.16)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
              <Play size={14} fill="currentColor" />
            </span>
            Play reel
          </motion.button>

          <motion.div
            variants={{
              rest: { opacity: 0, scale: 0.94 },
              hover: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="rounded-full border border-white/40 bg-[#f5f5f5]/10 p-4 backdrop-blur-md">
              <div className="h-3 w-3 rounded-full border border-black/40" />
            </div>
          </motion.div>
        </motion.div>
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
    <motion.section className="section-padding bg-[#f5f5f5] overflow-hidden" {...sectionReveal}>
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <SectionHeading 
            subtitle="Testimonials" 
            title="Accelerating growth, and unlocking new potential. Let's build your brand—together."
            className="mb-0"
          />
          <div className="flex -space-x-3 rounded-full border border-black/10 bg-[#f5f5f5]/75 px-3 py-2 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
            {[1, 2, 3].map((i) => (
              <motion.img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i + 10}`}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -10, scale: 1.015 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative flex min-h-[280px] flex-col gap-6 overflow-hidden rounded-[2rem] border border-black/5 bg-[#f5f5f5] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] transition-all duration-500 hover:border-transparent hover:shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
            >
              <div className="absolute inset-0 z-0 translate-y-[-102%] bg-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-black/12 to-transparent transition-colors duration-500 group-hover:via-white/20" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_38%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-orange-400 rounded-full transition-transform duration-300 group-hover:scale-110" />
                  ))}
                </div>
                <p className="text-lg mb-8 leading-relaxed text-black/80 transition-colors duration-500 group-hover:text-white/92">
                  &quot;{t.text}&quot;
                </p>
              </div>
              <div className="relative z-10 mt-auto flex justify-between items-end">
                <div>
                  <p className="font-bold text-black transition-colors duration-500 group-hover:text-white">{t.name}</p>
                  <p className="text-xs text-secondary transition-colors duration-500 group-hover:text-white/55">{t.role}</p>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-secondary font-bold transition-colors duration-500 group-hover:text-white/35">Great Design Solutions</p>
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

const Team = () => {
  const members = [
    { name: 'Nicolas K. Ellington', role: 'CEO', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Carlos E. Ashcroft', role: 'Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Leonardo F. Ashton', role: 'UX Designer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
    { name: 'Ricardo P. Winslow', role: 'UI Designer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' },
  ];

  return (
    <motion.section className="section-padding bg-[#f5f5f5]" {...sectionReveal}>
      <div className="container-wide max-w-[1220px]">
        <div className="rounded-[1.6rem] bg-[#f5f5f5] p-5 shadow-[0_26px_60px_rgba(15,23,42,0.06)] md:p-6">
          <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="flex flex-col justify-between rounded-[1.25rem] bg-[#f5f5f5] p-4 md:p-5">
              <div>
                <p className="mb-4 text-[9px] font-medium uppercase tracking-[0.16em] text-black/48">Our Avengers</p>
                <h2 className="max-w-[8.3ch] font-[family-name:var(--font-space-grotesk)] text-[1.92rem] font-medium leading-[1.04] tracking-[-0.055em] text-black md:text-[2.7rem]">
                  Meet with our team member
                </h2>

                <div className="mt-7 flex gap-5 border-b border-black/8 pb-4">
                  <button className="border-b border-black pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black">
                    Design team
                  </button>
                  <button className="pb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/28">
                    Development team
                  </button>
                </div>

                <p className="mt-5 max-w-[34ch] text-[12.5px] leading-[1.75] text-black/58">
                  What began over coffee-fueled brainstorming sessions has grown into a thriving digital agency dedicated to helping brands stand out.
                </p>

                <motion.button
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-7 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-black"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                    <ArrowRight size={12} />
                  </span>
                  Join with us
                </motion.button>
              </div>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
                className="group relative mt-9 overflow-hidden rounded-[1.05rem]"
              >
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team group"
                  className="h-[14.75rem] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {members.map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-[0.95rem] border border-black/4 bg-[#f5f3ef] p-2.5 shadow-[0_14px_34px_rgba(15,23,42,0.035)]"
                >
                  <div className="relative overflow-hidden rounded-[0.85rem] bg-[#dcc095]">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-[11.35rem] w-full object-contain object-center pt-2 transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#dcc095] via-[#dcc095]/75 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/8 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="px-2 pb-2 pt-4">
                    <h4 className="font-[family-name:var(--font-space-grotesk)] text-[13px] font-medium tracking-[-0.045em] text-black">{m.name}</h4>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-black/38">{m.role}</p>

                    <div className="mt-4 flex gap-2">
                      {['f', 'x', 'in'].map((social) => (
                        <span
                          key={social}
                          className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-[#f5f5f5] text-[9px] font-bold uppercase text-black shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5"
                        >
                          {social}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

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
};const Footer = () => {
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

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <CustomCursor />
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



