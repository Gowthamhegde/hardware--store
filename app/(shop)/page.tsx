import BentoGrid from '@/components/BentoGrid';
import dynamic from 'next/dynamic';
const BackgroundModel = dynamic(() => import('@/components/BackgroundModel'), { ssr: false });

import BrandGrid from '@/components/BrandGrid';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-enclosure transition-colors duration-500">
      {/* Animated Background */}
      <BackgroundModel />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <BentoGrid />
        
        {/* Brand Showcase Section */}
        <div className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-8">
          <BrandGrid />
        </div>
      </div>
    </div>
  );
}
