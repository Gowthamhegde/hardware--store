'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'framer-motion';
import { ShoppingCart, Scale } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useCompareStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { getStorePhotoByKey } from '@/lib/store-images';

interface Props {
  product: Product;
  index?: number;
}

// Stock LED — animated, colour-coded
function StockLED({ stock }: { stock: number }) {
  const color =
    stock === 0 ? 'bg-aluminum/20' : stock < 10 ? 'bg-live-red shadow-magenta' : 'bg-signal shadow-signal';
  const label = stock === 0 ? 'OUT' : stock < 10 ? 'LOW' : 'STOCKED';
  return (
    <div className="flex items-center gap-1.5">
      <motion.span
        className={`block w-1.5 h-1.5 ${color}`}
        animate={stock > 0 ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="font-mono text-[9px] text-aluminum/50 tracking-widest">{label}</span>
    </div>
  );
}

export default function TechnicalProductCard({ product, index = 0 }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleCompare, compareItems } = useCompareStore();
  const [pulsing, setPulsing] = useState(false);

  const isComparing = compareItems.some(p => p.id === product.id);

  // Connection-pulse: progress along the SVG trace line
  const pathProgress = useMotionValue(0);
  const strokeDashoffset = useTransform(pathProgress, [0, 1], [200, 0]);

  const handleHoverStart = () => {
    setPulsing(true);
    animate(pathProgress, 1, { duration: 0.6, ease: 'easeInOut' });
  };
  const handleHoverEnd = () => {
    setPulsing(false);
    animate(pathProgress, 0, { duration: 0.3 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`ADDED TO CART`);
  };

  // First two specs become the visible strip
  const specEntries = product.specifications ? Object.entries(product.specifications).slice(0, 3) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <Link href={`/product/${product.slug}`}>
        <motion.div
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className="group relative flex flex-col glass-card h-full"
        >
          {/* SKU header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
            <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
              {product.id.toUpperCase()}
            </span>
            <StockLED stock={product.stock} />
          </div>

          {/* Image */}
          <div className="relative h-48 overflow-hidden p-4">
            {/* Ambient inner glow for image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-0" />
            <Image
              src={getStorePhotoByKey(product.id, product.image_url)}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(0,243,255,0.4)]"
            />
          </div>

          {/* Spec strip — monospace datasheet row */}
          <div className="relative px-4 pt-3 pb-2 border-t border-white/5 bg-black/40">
            {/* ── The signature connection-pulse trace ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1="0" y1="50%" x2="100%" y2="50%"
                stroke="currentColor"
                className="text-signal"
                strokeWidth="1"
                strokeDasharray="200"
                style={{ strokeDashoffset: strokeDashoffset as any }}
                strokeOpacity={pulsing ? 1 : 0}
              />
            </svg>

            <div className="relative flex flex-wrap gap-x-4 gap-y-1">
              {specEntries.map(([key, val]) => (
                <span key={key} className="font-mono text-[9px] uppercase tracking-wide">
                  <span className="text-foreground/40">{key}: </span>
                  <span className="text-cable-white">{val}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Name + price + add to cart */}
          <div className="flex flex-col gap-3 px-4 pt-4 pb-5 flex-1 bg-gradient-to-b from-transparent to-background/60">
            {product.brand && (
              <span className="font-mono text-[9px] text-signal/70 uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                {product.brand}
              </span>
            )}
            <h3 className="font-display text-base font-semibold text-cable-white leading-snug group-hover:text-signal transition-colors line-clamp-2 uppercase drop-shadow-md">
              {product.name}
            </h3>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-foreground/10">
              <div>
                <div className="font-mono text-[9px] text-foreground/40 tracking-widest mb-0.5 uppercase">SYS_VALUE</div>
                <div className="font-mono text-lg font-bold text-cable-white text-gradient">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCompare(product);
                  }}
                  className={`relative flex items-center justify-center p-2 rounded-full border transition-all duration-300 uppercase ${
                    isComparing
                      ? 'bg-signal/20 border-signal text-signal shadow-signal'
                      : 'bg-background/50 border-foreground/20 text-foreground/50 hover:border-signal hover:text-signal hover:shadow-signal'
                  }`}
                  aria-label="Compare"
                >
                  <Scale className="w-4 h-4" />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`relative flex items-center justify-center p-2 rounded-full border transition-all duration-300 uppercase ${
                    product.stock === 0
                      ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-black/50 border-white/20 text-white/50 hover:border-copper hover:text-copper hover:shadow-magenta'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
