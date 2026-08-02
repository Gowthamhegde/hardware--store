import BentoGrid from '@/components/BentoGrid';
import VideoBackground from '@/components/VideoBackground';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Video Background with Scroll Animations */}
      <VideoBackground />
      
      {/* Main Content Overlay */}
      <BentoGrid />
    </div>
  );
}
