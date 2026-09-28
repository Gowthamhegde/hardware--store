'use client';

import { BRANDS } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BrandGrid() {
  return (
    <div className="w-full py-10 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-signal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-cable-white mb-3 tracking-wide drop-shadow-md">
          SHOP BY BRAND
        </h2>
        <div className="w-12 h-1 bg-signal mx-auto mb-4 rounded-full shadow-signal" />
        <p className="font-mono text-xs text-aluminum uppercase tracking-widest">
          Premium partners & authentic hardware
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={`brand-${brand.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link
                href={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group relative flex flex-col items-center justify-center p-6 h-full glass-card hover:bg-white/10 hover:border-signal/50 rounded-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-signal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="w-14 h-14 relative grayscale group-hover:grayscale-0 transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className="object-contain"
                    sizes="56px"
                  />
                </div>
                <span className="font-mono text-[10px] text-aluminum/80 group-hover:text-signal uppercase text-center transition-colors font-semibold tracking-wider z-10">
                  {brand.name}
                </span>
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-signal/50 transition-colors m-2" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-signal/50 transition-colors m-2" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
