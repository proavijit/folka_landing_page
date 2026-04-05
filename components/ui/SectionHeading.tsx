"use client";

import { motion } from "motion/react";
import { cn } from "@/app/lib/utils";

interface SectionHeadingProps {
  subtitle: string;
  title: React.ReactNode;
  className?: string;
}

const SectionHeading = ({ subtitle, title, className }: SectionHeadingProps) => (
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

export default SectionHeading;
