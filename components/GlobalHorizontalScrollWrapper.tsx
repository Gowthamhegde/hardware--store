'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  heightClasses?: string; // e.g., 'h-[300vh]' or 'h-[400vh]'
  fixedOverlay?: React.ReactNode;
  contentClassName?: string;
}

export default function GlobalHorizontalScrollWrapper({ 
  children, 
  heightClasses = 'h-[300vh]',
  fixedOverlay,
  contentClassName = 'flex h-full w-max'
}: Props) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Shift the container to the left by exactly its width minus 100vw (the visible area)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  // On mobile, just stack everything vertically and skip horizontal scroll effects
  if (mounted && isMobile) {
    return (
      <section className="relative bg-enclosure flex flex-col">
        {fixedOverlay && (
          <div className="sticky top-0 z-10 pointer-events-auto">
            {fixedOverlay}
          </div>
        )}
        <div className="flex flex-col w-full">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className={`relative bg-enclosure ${heightClasses}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {fixedOverlay && (
          <div className="absolute top-0 left-0 h-full z-10 pointer-events-auto">
            {fixedOverlay}
          </div>
        )}
        <motion.div style={{ x }} className={contentClassName}>
          {children}
        </motion.div>
      </div>

      <motion.div 
        className="fixed bottom-0 left-0 h-1 bg-signal origin-left z-50 pointer-events-none"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
    </section>
  );
}
