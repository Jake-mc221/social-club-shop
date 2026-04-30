'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  translateY?: number;
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.6,
  translateY = 24,
}: FadeInProps) {
  const [resetKey, setResetKey] = useState(0);
  const wasAboveZero = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 0) {
        wasAboveZero.current = true;
      } else if (wasAboveZero.current) {
        wasAboveZero.current = false;
        setResetKey(k => k + 1);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.div
      key={resetKey}
      className={className}
      initial={{ opacity: 0, y: translateY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
