'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button';
import { STORE_CONFIG } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#070b0a] via-[#0b1211] to-[#070b0a]">
      <div className="absolute inset-0">
        {[...Array(72)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-signal/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.35 + 0.15,
            }}
            animate={{
              opacity: [Math.random() * 0.25 + 0.1, Math.random() * 0.45 + 0.2, Math.random() * 0.25 + 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-signal/15 rounded-full blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-enclosure/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative mb-12"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-signal/20 via-copper/15 to-live-red/15 rounded-full blur-3xl scale-150" />
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 shadow-glass">
                <Image
                  src="/logo.jpeg"
                  alt={STORE_CONFIG.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-cable-white mb-6 leading-[0.85] tracking-tighter uppercase"
            style={{ textShadow: '0 0 80px rgba(0, 243, 255, 0.18)' }}
          >
            VIGNESH<br />
            <span className="inline-block" style={{ letterSpacing: '-0.05em' }}>E</span>LECTRICAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-2xl md:text-3xl text-aluminum mb-12 font-light tracking-wide"
          >
            Switches, cables, home theatre, and electronic items under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-5 bg-cable-white/5 backdrop-blur-md border border-signal/15 rounded-full text-cable-white font-display font-semibold text-lg tracking-wide hover:bg-signal/10 transition-all duration-300 flex items-center gap-3 shadow-glass"
              >
                See products
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-aluminum text-sm"
          >
            Trusted since {STORE_CONFIG.established} • {STORE_CONFIG.yearsInBusiness}+ years of excellence
          </motion.div>
        </div>
      </div>
    </section>
  );
}
