import BentoGrid from '@/components/BentoGrid';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-enclosure transition-colors duration-500">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content Overlay */}
      <BentoGrid />
    </div>
  );
}
