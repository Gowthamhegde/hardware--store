import Link from 'next/link';
import Image from 'next/image';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Speaker, ArrowLeft } from 'lucide-react';
import TechnicalProductCard from '@/components/TechnicalProductCard';

export const metadata = {
  title: 'Home Theatre Systems | VIGNESH Electrical Power House',
  description: 'Premium home theatre and audio setups for immersive experiences.',
};

export default function HomeTheatrePage() {
  const products = SAMPLE_PRODUCTS.filter((p) => p.category === 'Home Theatre & Audio');

  return (
    <div className="min-h-screen bg-black text-cable-white font-sans selection:bg-live-red selection:text-white">
      {/* Cinematic Hero */}
      <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {/* Deep ambient glow representing a dark room with a screen */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[50vh] bg-live-red/20 blur-[150px] z-0 pointer-events-none rounded-[100%]" />
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-aluminum hover:text-white transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Return to Store
          </Link>
          <div className="flex justify-center mb-6 opacity-50">
            <Speaker className="w-16 h-16 text-live-red" />
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 drop-shadow-[0_0_30px_rgba(255,0,85,0.4)]">
            CINEMATIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-live-red to-copper">IMMERSION.</span>
          </h1>
          <p className="font-mono text-aluminum/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Engineered for acoustic perfection. Build the ultimate home theatre setup with our hand-picked, premium audio components.
          </p>
        </div>
      </div>

      {/* Cinematic Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <TechnicalProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
