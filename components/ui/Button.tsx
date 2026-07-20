'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'font-display font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-enclosure disabled:opacity-40 disabled:pointer-events-none active:scale-95';

  const variants = {
    primary: 'bg-copper text-enclosure hover:bg-copper/90',
    secondary: 'bg-circuit-green text-enclosure hover:bg-circuit-green/90',
    outline: 'border border-aluminum/30 text-cable-white hover:border-copper/60 hover:text-copper',
    ghost: 'text-cable-white hover:bg-cable-white/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
