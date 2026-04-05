"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

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

export default CountUp;
