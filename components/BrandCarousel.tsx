'use client';

import { BRANDS } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandCarousel() {
  return (
    <div className="w-full py-16 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="font-display text-2xl font-bold text-cable-white mb-2">SHOP BY BRAND</h2>
        <p className="font-mono text-xs text-aluminum uppercase tracking-widest">
          Premium partners & authentic hardware
        </p>
      </div>

      <div className="relative w-full flex items-center">
        {/* Left gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-enclosure to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-full overflow-hidden">
          <div className="marquee-track flex gap-8 py-4 items-center pl-8">
            {/* Double the array for seamless infinite scroll effect */}
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <Link
                key={`brand-${brand.name}-${i}`}
                href={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group relative flex-shrink-0 flex items-center justify-center w-32 h-20 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-signal/50 rounded-xl transition-all duration-300"
              >
                <div className="w-12 h-12 relative grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                  <Image 
                    src={brand.logo} 
                    alt={brand.name} 
                    fill 
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="font-mono text-[9px] text-signal uppercase whitespace-nowrap bg-black/80 px-2 py-1 rounded">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-enclosure to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
