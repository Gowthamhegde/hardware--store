'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, ChevronRight, Activity, Share2 } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import TechnicalProductCard from '@/components/TechnicalProductCard';
import toast from 'react-hot-toast';
import GlobalHorizontalScrollWrapper from '@/components/GlobalHorizontalScrollWrapper';
import { getStorePhotoByKey } from '@/lib/store-images';

// What's in the box — derive from category if not set on product
function getWhatsInBox(category: string): string[] {
  const map: Record<string, string[]> = {
    'Home Theatre & Audio': ['Main unit', 'Power cable (IEC)', 'Remote control + batteries', 'Quick start guide', 'Warranty card'],
    'Switches & Sockets': ['Switch/socket module', 'Mounting screws (×2)', 'Installation guide'],
    'Cables & Wires': ['Cable', 'Velcro tie', 'Specification sheet'],
    'Smart Home': ['Device', 'Mounting hardware', 'USB power cable', 'App guide'],
    'Deals': ['Bundle contents as described', 'Individual manuals', 'Warranty cards'],
  };
  return map[category] ?? ['Main unit', 'Documentation'];
}

// Compatibility notes derived from category
function getCompatibility(category: string, specs: Record<string, string>): string[] {
  if (category === 'Home Theatre & Audio') {
    const hasHDMI = Object.values(specs).some((v) => v.toLowerCase().includes('hdmi'));
    const notes = ['Requires standard IEC C13 power outlet'];
    if (hasHDMI) notes.push('HDMI 2.1 port required for 4K@120Hz / 8K passthrough');
    notes.push('Firmware updates via USB-A or network (if supported)');
    return notes;
  }
  if (category === 'Switches & Sockets') return ['Fits standard 60mm modular box', 'Compatible with IS 1293 modular plates'];
  if (category === 'Cables & Wires') return ['Verify connector type before purchase', 'Check length against your room layout'];
  if (category === 'Smart Home') return ['Requires 2.4GHz WiFi or Zigbee hub', 'Check hub compatibility in product description'];
  return ['See product documentation for system requirements'];
}

// Signature visual indicator based on category
function SignatureIndicator({ category }: { category: string }) {
  if (category === 'Home Theatre & Audio') {
    // Waveform
    return (
      <div className="flex items-end gap-1 h-6">
        {[40, 70, 40, 90, 60, 80, 50, 100, 60, 40].map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 bg-signal"
            initial={{ height: '10%' }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }
  if (category === 'Cables & Wires') {
    // Bandwidth bar
    return (
      <div className="w-full h-2 bg-aluminum/20 rounded overflow-hidden">
        <motion.div
          className="h-full bg-signal"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
        />
      </div>
    );
  }
  
  // Default: scanning line
  return (
    <div className="w-full h-1 bg-aluminum/20 relative overflow-hidden">
      <motion.div
        className="absolute top-0 bottom-0 w-1/4 bg-signal"
        initial={{ left: '-25%' }}
        animate={{ left: '100%' }}
        transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'compat'>('specs');
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="font-mono text-[10px] text-aluminum/50 uppercase">[ ERR: PRODUCT_NOT_FOUND ]</p>
        <Link href="/shop" className="mt-4 inline-block font-mono text-[10px] text-signal hover:underline uppercase">
          [ RETURN_TO_CATALOG ]
        </Link>
      </div>
    );
  }

  const catSlug = CATEGORIES.find((c) => c.name === product.category)?.slug ?? 'shop';
  const related = SAMPLE_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const whatsInBox = getWhatsInBox(product.category);
  const compat = getCompatibility(product.category, product.specifications ?? {});

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${qty} × ${product.name} ADDED TO CART`);
  };

  const stockStatus =
    product.stock === 0 ? 'out' : product.stock < 10 ? 'low' : 'in';

  return (
    <div className="-mt-24 -mb-12">
      <GlobalHorizontalScrollWrapper 
        heightClasses="h-[400vh]"
        contentClassName="flex h-full w-max pt-32 pb-12 pl-[60px]"
        fixedOverlay={
          <div className="absolute top-24 left-10 z-20 pointer-events-none hidden md:block">
            {/* Floating Breadcrumb */}
            <nav className="flex items-center gap-1.5 font-mono text-[9px] text-aluminum/50 uppercase pointer-events-auto bg-[#0a0d0c]/80 backdrop-blur-sm p-2 border border-aluminum/10" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-signal transition-colors">HOME</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/shop" className="hover:text-signal transition-colors">CATALOG</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/shop?category=${catSlug}`} className="hover:text-signal transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-signal truncate max-w-[160px]">{product.name}</span>
            </nav>
          </div>
        }
      >
        <div className="flex gap-16 h-full items-center px-12">
          
          {/* Chamber 1: Image */}
          <div className="w-[80vw] md:w-[60vw] lg:w-[45vw] shrink-0 h-[80vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative w-full h-full overflow-hidden glass-card rounded-3xl flex items-center justify-center p-8"
            >
              {/* Inner ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-signal/10 pointer-events-none" />
              <Image src={getStorePhotoByKey(product.id, product.image_url)} alt={product.name} fill className="object-contain p-12 opacity-80 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-700" />

              {/* HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none border-[0.5px] border-signal/10 m-4">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-signal/50" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-signal/50" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-signal/50" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-signal/50" />
              </div>

              {/* Stock badge overlay */}
              <div className="absolute top-8 right-8 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-glass">
                <motion.span
                  className={`block w-2 h-2 rounded-full ${stockStatus === 'out' ? 'bg-aluminum' : stockStatus === 'low' ? 'bg-live-red shadow-magenta' : 'bg-signal shadow-signal'}`}
                  animate={stockStatus !== 'out' ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[9px] text-cable-white tracking-widest uppercase">
                  {stockStatus === 'out' ? 'OFFLINE' : stockStatus === 'low' ? `LOW_STOCK : ${product.stock}` : `ONLINE : ${product.stock}`}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Chamber 2: Details */}
          <div className="w-[85vw] md:w-[65vw] lg:w-[45vw] shrink-0 h-[80vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-6 glass-panel p-10 rounded-3xl"
            >
              <div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-aluminum/20 bg-background/50 hover:text-signal transition-colors font-mono text-[10px] uppercase mb-4">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Config</span>
                </button>
                <div className="flex items-center gap-3 mb-3 border-b border-aluminum/10 pb-2">
                  <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">ID: {product.id}</span>
                  {product.brand && (
                    <span className="font-mono text-[10px] text-signal bg-signal/10 px-2 py-0.5 rounded tracking-widest uppercase border border-signal/20">
                      MFR: {product.brand}
                    </span>
                  )}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cable-white leading-tight uppercase tracking-tight drop-shadow-md">
                  {product.name}
                </h1>
                
                <div className="mt-6 mb-2">
                  <SignatureIndicator category={product.category} />
                </div>

                <p className="mt-4 font-mono text-[11px] text-aluminum/80 leading-relaxed uppercase max-w-2xl">
                  {product.long_description ?? product.description}
                </p>
              </div>

              <div className="flex items-center justify-between border border-white/10 bg-black/20 p-4 rounded-xl max-w-xl">
                <div>
                  <div className="font-mono text-[9px] text-signal/70 tracking-widest mb-1 uppercase">SYS_VALUE</div>
                  <div className="font-mono text-4xl font-bold text-cable-white text-gradient">{formatPrice(product.price)}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
                <div className="flex items-center justify-between border border-white/10 bg-black/20 h-14 w-36 shrink-0 rounded-full">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 h-full text-white/50 hover:text-signal hover:bg-white/5 transition-colors rounded-l-full">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-sm text-cable-white select-none">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} disabled={qty >= product.stock} className="px-4 h-full text-white/50 hover:text-signal hover:bg-white/5 transition-colors rounded-r-full">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 h-14 rounded-full bg-copper text-white font-mono text-sm font-bold tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-copper/80 transition-all shadow-magenta hover:shadow-[0_0_30px_rgba(255,0,234,0.6)]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.stock === 0 ? 'UNAVAILABLE' : 'INITIALIZE_TRANSFER'}
                </button>
              </div>

              {/* Tabs */}
              <div className="mt-4 border border-aluminum/20 bg-[#111614] max-w-xl">
                <div className="flex border-b border-aluminum/20 bg-[#0a0d0c]" role="tablist">
                  {([{ id: 'specs', label: 'SPECS' }, { id: 'box', label: "CONTENTS" }, { id: 'compat', label: 'COMPAT' }] as const).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 font-mono text-[9px] px-4 py-3 transition-colors uppercase ${
                        activeTab === tab.id ? 'bg-[#111614] text-signal border-t-2 border-t-signal' : 'text-aluminum/60 hover:text-cable-white border-t-2 border-t-transparent'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-5 h-48 overflow-y-auto custom-scrollbar">
                  {activeTab === 'specs' && product.specifications && (
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-end border-b border-aluminum/10 pb-1">
                          <span className="font-mono text-[10px] text-aluminum uppercase tracking-wide">{key}</span>
                          <span className="font-mono text-[10px] text-cable-white uppercase text-right max-w-[60%] truncate">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'box' && (
                    <ul className="space-y-3">
                      {whatsInBox.map((item) => (
                        <li key={item} className="flex items-center gap-3 font-mono text-[10px] text-aluminum uppercase">
                          <span className="w-1.5 h-1.5 bg-signal flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'compat' && (
                    <ul className="space-y-3">
                      {compat.map((note) => (
                        <li key={note} className="flex items-start gap-3 font-mono text-[10px] text-aluminum uppercase">
                          <span className="w-1.5 h-1.5 bg-copper flex-shrink-0 mt-1" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chamber 3: Related Products */}
          {related.length > 0 && (
            <div className="w-[85vw] md:w-[60vw] lg:w-[45vw] shrink-0 h-[80vh] flex flex-col justify-center border-l border-aluminum/10 pl-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-mono text-xl font-bold text-cable-white uppercase">
                  [ RELATED_SIGNALS ]
                </h2>
                <Link
                  href={`/shop?category=${catSlug}`}
                  className="font-mono text-[10px] text-signal hover:underline transition-colors uppercase"
                >
                  EXPAND_VIEW →
                </Link>
              </div>
              <div className="flex gap-4 overflow-visible h-[450px] items-center">
                {related.map((p, i) => (
                  <div key={p.id} className="w-[300px] shrink-0 h-full max-h-[400px]">
                    <TechnicalProductCard product={p} index={i} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </GlobalHorizontalScrollWrapper>
    </div>
  );
}
