'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/app/providers';
import Image from 'next/image';

export default function PowerSwitch() {
  const { theme, toggleTheme } = useTheme();
  // We want: toggle ON -> Light Mode, toggle OFF -> Dark (black) mode.
  const isLight = theme === 'light';

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <motion.button
        onClick={toggleTheme}
        className="group relative flex items-center justify-center cursor-pointer p-2 rounded-xl transition-all duration-300"
        aria-label={`Toggle theme (current: ${theme})`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect behind the switch */}
        <div className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-500 ${isLight ? 'bg-yellow-200/50 opacity-100' : 'bg-white/10 opacity-50'}`} />

        {/* The actual photo of the switch */}
        <motion.div
          animate={{
            rotateX: isLight ? 180 : 0, // physically flip the switch photo to simulate it being toggled
          }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
          className="relative w-20 h-24 overflow-hidden rounded-md shadow-2xl z-10"
          style={{
            filter: isLight 
              ? 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1)) brightness(1.1)' 
              : 'drop-shadow(0px 10px 15px rgba(255,255,255,0.05)) brightness(0.9)',
          }}
        >
          <Image
            src="/switch.webp"
            alt="Hardware switch"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Status Text Indicator */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 font-mono text-[10px] text-foreground/60 font-bold tracking-widest z-20 whitespace-nowrap">
          {isLight ? 'THEME: LIGHT' : 'THEME: BLACK'}
        </div>
      </motion.button>
    </div>
  );
}
