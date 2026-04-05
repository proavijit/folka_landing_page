"use client";

import React from 'react';
import { motion } from 'framer-motion'; // Ensure you're using 'framer-motion' or 'motion/react'
import { sectionReveal } from '@/lib/animations';
import SectionHeading from '@/components/ui/SectionHeading';

const Testimonials = () => {
  const testimonials = [
    { name: 'Nicolas K. Ellington', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
    { name: 'Julian T. Beaumont', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
    { name: 'Felipe D. Hawthorne', role: 'IT Specialist', text: 'As we continued to use their tool and found more use cases, our feature requests quickly found their way into their backlog.', rating: 5 },
  ];

  return (
    <motion.section className="section-padding bg-[#f8f8f8] py-24 overflow-hidden" {...sectionReveal}>
      <div className="container-wide px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="uppercase tracking-widest text-[10px] font-bold mb-4 opacity-50">User Feedbacks</p>
            <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight">
              Accelerating growth, and unlocking new potential.
              <span className="inline-flex items-center mx-2 -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i + 20}`}
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                    alt="user"
                  />
                ))}
              </span>
              Let's build your brand—together.
            </h2>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col gap-2"
            >
              {/* Top Name Card */}
              <div className="bg-white rounded-t-[1.5rem] rounded-b-[0.5rem] p-6 border border-black/5 shadow-sm transition-colors duration-500 group-hover:bg-[#0a0a0a]">
                <p className="font-semibold text-black transition-colors duration-500 group-hover:text-white">{t.name}</p>
                <p className="text-xs text-black/40 transition-colors duration-500 group-hover:text-white/40">{t.role}</p>
              </div>

              {/* Bottom Quote Card */}
              <div className="relative overflow-hidden bg-white rounded-b-[1.5rem] rounded-t-[0.5rem] p-8 border border-black/5 shadow-sm min-h-[320px] flex flex-col justify-between transition-all duration-500">
                {/* Black Hover Overlay */}
                <div className="absolute inset-0 z-0 bg-[#0a0a0a] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />

                <div className="relative z-10">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, starIdx) => (
                      <span key={starIdx} className="text-orange-500 text-sm">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg leading-relaxed text-black transition-colors duration-500 group-hover:text-white">
                    &quot;{t.text}&quot;
                  </p>
                </div>

                {/* Footer Label */}
                <div className="relative z-10 mt-12">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/20 transition-colors duration-500 group-hover:text-white/20">
                    &quot; Great Design Solutions &quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;