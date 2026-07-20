import BentoGrid from '@/components/BentoGrid';
import BackgroundModel from '@/components/BackgroundModel';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* 3D Copper Cables Background */}
      <BackgroundModel />
      
      {/* Main Content Overlay */}
      <BentoGrid />
    </div>
  );
}
