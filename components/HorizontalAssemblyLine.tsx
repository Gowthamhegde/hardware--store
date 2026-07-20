'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Plug, Cable, Speaker, Smartphone, Activity } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import BackgroundModel from './BackgroundModel';

export default function HorizontalAssemblyLine() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  
  // We make the section 400vh tall to allow for plenty of vertical scroll space,
  // which will be translated into horizontal scroll distance.
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress to horizontal translation.
  // Using percentages allows us to scroll the flex container based on its width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-transparent">
      <BackgroundModel />
      
      {/* Sticky container that stays in the viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden z-10">
        <motion.div style={{ x }} className="flex gap-20 px-[10vw]">
          
          {/* HERO CHAMBER */}
          <div className="w-[80vw] shrink-0 flex flex-col justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex items-center font-mono text-xs text-signal tracking-widest">
                <span>&gt; INITIATING HORIZONTAL SCROLL ALGORITHM</span>
                <span className="inline-block w-2 h-4 bg-signal ml-2 animate-pulse" />
              </div>
              <h1 className="font-display text-[8vw] leading-[0.9] font-bold text-cable-white tracking-tighter mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                HARDWARE <br />
                <span className="text-gradient">ASSEMBLY.</span>
              </h1>
              <p className="font-mono text-lg text-aluminum max-w-xl mb-12 uppercase leading-relaxed">
                Scroll to navigate the assembly line. Every switch, cable, and rating on the spec sheet. 
                Searchable. Comparable. In hand by Thursday.
              </p>
              
              <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center w-64 h-16 rounded-full glass-card hover:border-signal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              >
                <div className="absolute inset-0 bg-signal opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
                <div className="flex items-center gap-3 font-mono text-sm font-bold text-signal uppercase tracking-widest drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]">
                  <Activity className="w-5 h-5" /> Bypass to Shop
                </div>
              </Link>
            </motion.div>
          </div>

          {/* CATEGORY CHAMBER 1: Switches & Sockets */}
          <CategoryChamber 
            category={CATEGORIES[0]} 
            icon={<Plug className="w-20 h-20 text-copper opacity-20" />}
            index={1} 
          />

          {/* CATEGORY CHAMBER 2: Cables & Wires */}
          <CategoryChamber 
            category={CATEGORIES[1]} 
            icon={<Cable className="w-20 h-20 text-copper opacity-20" />}
            index={2} 
          />

          {/* CATEGORY CHAMBER 3: Home Theatre */}
          <CategoryChamber 
            category={CATEGORIES[2]} 
            icon={<Speaker className="w-20 h-20 text-copper opacity-20" />}
            index={3} 
            href="/home-theatre"
          />

          {/* CATEGORY CHAMBER 4: Smart Home */}
          <CategoryChamber 
            category={CATEGORIES[3]} 
            icon={<Smartphone className="w-20 h-20 text-copper opacity-20" />}
            index={4} 
          />
          
          {/* END CHAMBER */}
          <div className="w-[60vw] shrink-0 flex flex-col justify-center items-center text-center h-full border-l border-aluminum/10 pl-20">
             <h2 className="font-display text-5xl font-bold text-cable-white mb-6">READY TO BUILD?</h2>
             <p className="font-mono text-aluminum mb-10 max-w-md">Browse our complete technical catalog and secure your loadout.</p>
             <Link
                href="/shop"
                className="group relative inline-flex items-center justify-center w-64 h-16 rounded-full glass-card border border-copper hover:border-copper/100 hover:shadow-magenta transition-all font-mono font-bold text-copper uppercase tracking-widest"
              >
                <div className="absolute inset-0 bg-copper opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
                <span className="drop-shadow-[0_0_8px_rgba(255,0,234,0.8)] z-10 relative">Enter Database</span>
              </Link>
          </div>

        </motion.div>
      </div>

      {/* Decorative Progress Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 h-1 bg-signal origin-left z-50"
        style={{ scaleX: scrollYProgress, width: '100%' }}
      />
    </section>
  );
}

function CategoryChamber({ category, icon, index, href }: { category: any, icon: React.ReactNode, index: number, href?: string }) {
  return (
    <div className="w-[60vw] shrink-0 flex flex-col justify-center h-full relative group p-8">
      <div className="absolute inset-0 glass-card rounded-[2rem] p-16 flex flex-col justify-between overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute -right-20 -bottom-20 scale-150 transform transition-transform group-hover:scale-[2] duration-700 ease-out opacity-40">
          {icon}
        </div>

        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-8 mb-12">
           <span className="font-mono text-3xl font-bold text-white/20">0{index}</span>
           <span className="font-mono text-xs text-signal tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">[{category.slug}]</span>
        </div>

        <div className="relative z-10 max-w-2xl">
          <h3 className="font-display text-5xl md:text-7xl font-bold text-cable-white mb-6 leading-tight group-hover:text-signal transition-colors duration-300">
            {category.name}
          </h3>
          <p className="font-mono text-xl text-aluminum mb-8">
            {category.description}
          </p>
          <div className="inline-block font-mono text-sm text-copper border border-copper/30 px-4 py-2 uppercase">
            SPEC: {category.specs}
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-12">
          <Link
            href={href || `/shop?category=${category.slug}`}
            className="inline-flex items-center gap-4 font-mono text-sm text-cable-white hover:text-signal transition-colors tracking-widest uppercase drop-shadow-md"
          >
            Access Inventory <span className="group-hover:translate-x-3 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
