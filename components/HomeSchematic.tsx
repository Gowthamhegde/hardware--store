'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plug, Cable, Speaker, Smartphone, Activity } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease },
});

export default function HomeSchematic() {
  const featuredSpec1 = SAMPLE_PRODUCTS.find(p => p.category === 'Cables & Wires');
  const featuredSpec2 = SAMPLE_PRODUCTS.find(p => p.category === 'Home Theatre & Audio');

  return (
    <div className="relative w-full overflow-hidden bg-enclosure scanline-bg">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 border-b border-aluminum/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
            
            {/* Left Column (55%) */}
            <div className="w-full lg:w-[55%] flex flex-col items-start">
              <motion.div {...fadeUp(0)} className="mb-6 flex items-center font-mono text-[10px] text-signal tracking-widest">
                <span>&gt; LIVE INVENTORY — 12,406 UNITS TRACKED</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block w-2 h-3 bg-signal ml-1 align-middle"
                />
              </motion.div>
              
              <motion.h1 
                {...fadeUp(0.1)}
                className="font-display text-5xl md:text-7xl font-bold text-cable-white leading-[1.1] tracking-tight mb-8"
              >
                Hardware for the <br />
                <span className="text-copper">modern schematic.</span>
              </motion.h1>

              <motion.p {...fadeUp(0.2)} className="font-mono text-sm text-aluminum/80 max-w-lg mb-10 leading-relaxed uppercase">
                Every switch, cable, and rating on the spec sheet. Searchable. Comparable. In hand by Thursday.
              </motion.p>

              <motion.div {...fadeUp(0.3)} className="flex items-center gap-6">
                {/* Rocker Switch Button */}
                <Link
                  href="/shop"
                  className="group relative inline-flex items-center justify-center w-48 h-14 bg-enclosure border-2 border-aluminum/30 shadow-[4px_4px_0_0_#8C8A85] hover:shadow-[2px_2px_0_0_#8C8A85] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                >
                  {/* Inner Rocker Switch Styling */}
                  <div className="absolute inset-[2px] bg-[#111614] border border-aluminum/10 group-active:bg-[#0B0F0E]" />
                  <div className="relative z-10 flex items-center gap-2 font-mono text-xs font-bold text-cable-white uppercase tracking-widest">
                    <span className="text-signal">⏻</span> Shop all
                  </div>
                </Link>

                <Link
                  href="/build-setup"
                  className="group font-mono text-xs text-aluminum hover:text-signal uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  Build a setup <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Column (45%) - SVG Line Art Schematic */}
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end relative h-80 lg:h-96">
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full max-w-md opacity-80"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                {/* Exploded Switch Line Art Animation */}
                <motion.g className="text-signal">
                  {/* Top Casing */}
                  <motion.path 
                    d="M 150 100 L 250 100 L 300 150 L 100 150 Z" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.path 
                    d="M 150 100 L 150 80 L 250 80 L 250 100" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                  />
                  {/* Internal Mechanism */}
                  <motion.path 
                    d="M 180 180 L 220 180 L 220 220 L 180 220 Z" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                  />
                  <motion.path 
                    d="M 200 180 L 200 150" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
                  />
                  <motion.path 
                    d="M 200 220 L 200 250" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 1.5 }}
                  />
                  {/* Bottom Casing */}
                  <motion.path 
                    d="M 150 300 L 250 300 L 300 250 L 100 250 Z" 
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 2 }}
                  />
                  <motion.path 
                    d="M 100 150 L 100 250 M 300 150 L 300 250 M 150 100 L 150 300 M 250 100 L 250 300" 
                    strokeDasharray="4 4"
                    className="text-aluminum/40"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.5 }}
                  />
                </motion.g>
              </svg>
            </div>

          </div>
        </div>

        {/* Live Ticker */}
        <div className="absolute bottom-0 left-0 w-full border-t border-aluminum/20 bg-[#0B0F0E] py-2 overflow-hidden flex items-center">
          <div className="marquee-track flex gap-8 whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="flex gap-8 items-center">
                <span className="font-mono text-[10px] text-aluminum/60 tracking-widest uppercase flex items-center gap-2">
                  <Activity className="w-3 h-3 text-signal" />
                  {featuredSpec1?.name.toUpperCase()} — IN STOCK
                </span>
                <span className="font-mono text-[10px] text-aluminum/60 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-live-red"></span>
                  {featuredSpec2?.name.toUpperCase()} — LOW STOCK
                </span>
                <span className="font-mono text-[10px] text-aluminum/60 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1 h-1 bg-signal"></span>
                  24 NEW COMPONENTS ADDED TODAY
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASYMMETRIC BENTO GRID ── */}
      <section className="container mx-auto px-4 py-20">
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-4 mb-10">
          <h2 className="font-mono text-xs text-aluminum tracking-widest uppercase border-l-2 border-signal pl-3">
            [ Categories ]
          </h2>
          <div className="h-[1px] flex-grow bg-aluminum/10"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {/* HOME THEATRE (Large tile) */}
          <Link href={`/shop?category=${CATEGORIES[2].slug}`} className="md:row-span-2 md:col-span-1 group relative bg-[#111614] border border-aluminum/15 p-6 hover:border-signal/50 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Speaker className="w-6 h-6 text-aluminum group-hover:text-signal transition-colors" />
              <span className="font-mono text-[9px] text-aluminum/40">SYS.01</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-cable-white mb-2">{CATEGORIES[2].name}</h3>
              <p className="font-mono text-[10px] text-aluminum/60 uppercase max-w-[200px] mb-6">
                {CATEGORIES[2].description}
              </p>
              <div className="border-t border-aluminum/10 pt-4">
                <span className="font-mono text-[9px] text-signal tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  LIVE PREVIEW: AVR-X2800H
                </span>
              </div>
            </div>
            {/* SVG Trace */}
            <svg className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none opacity-20" viewBox="0 0 100 100">
              <path d="M100 50 L50 50 L50 100" stroke="#6FE7C4" fill="none" strokeWidth="1" strokeDasharray="4 2" />
            </svg>
          </Link>

          {/* CABLES */}
          <Link href={`/shop?category=${CATEGORIES[1].slug}`} className="group relative bg-[#111614] border border-aluminum/15 p-6 hover:border-signal/50 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Cable className="w-5 h-5 text-aluminum group-hover:text-signal transition-colors" />
              <span className="font-mono text-[9px] text-aluminum/40">CBL.02</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-cable-white mb-1">{CATEGORIES[1].name}</h3>
              <div className="font-mono text-[10px] text-copper">GAUGE: {CATEGORIES[1].specs}</div>
            </div>
          </Link>

          {/* SMART HOME */}
          <Link href={`/shop?category=${CATEGORIES[3].slug}`} className="group relative bg-[#111614] border border-aluminum/15 p-6 hover:border-signal/50 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Smartphone className="w-5 h-5 text-aluminum group-hover:text-signal transition-colors" />
              <span className="font-mono text-[9px] text-aluminum/40">SMRT.03</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-cable-white mb-1">{CATEGORIES[3].name}</h3>
              <div className="font-mono text-[10px] text-aluminum/60 uppercase">Protocol: Zigbee / Matter</div>
            </div>
          </Link>

          {/* SWITCHES */}
          <Link href={`/shop?category=${CATEGORIES[0].slug}`} className="md:col-span-2 group relative bg-[#111614] border border-aluminum/15 p-6 hover:border-signal/50 transition-colors flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <Plug className="w-5 h-5 text-aluminum group-hover:text-signal transition-colors" />
              <span className="font-mono text-[9px] text-aluminum/40">SWT.04</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-display text-lg font-bold text-cable-white mb-1">{CATEGORIES[0].name}</h3>
              <div className="font-mono text-[10px] text-copper uppercase">{CATEGORIES[0].specs}</div>
            </div>
            {/* PCB Trace Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" preserveAspectRatio="none">
              <path d="M0 50 H30 V20 H100" stroke="#fff" fill="none" strokeWidth="2" />
              <path d="M0 80 H60 V40 H100" stroke="#fff" fill="none" strokeWidth="2" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
