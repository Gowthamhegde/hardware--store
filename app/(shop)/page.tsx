import BentoGrid from '@/components/BentoGrid';
import AnimatedBackground from '@/components/AnimatedBackground';
import BrandCarousel from '@/components/BrandCarousel';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-enclosure transition-colors duration-500">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <BentoGrid />
        
        {/* Brand Showcase Section */}
        <div className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-8">
          <BrandCarousel />
        </div>
      </div>
    </div>
  );
}
