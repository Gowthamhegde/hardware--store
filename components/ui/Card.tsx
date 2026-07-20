'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, rotateX: 2, rotateY: 2 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-[color:var(--glass-bg)] backdrop-blur-2xl border border-[color:var(--glass-border)] rounded-3xl shadow-glass overflow-hidden',
        hover && 'hover:border-signal/30 hover:shadow-[0_24px_80px_rgba(0,0,0,0.35)]',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}
