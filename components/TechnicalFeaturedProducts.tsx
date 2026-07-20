'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TechnicalProductCard from './TechnicalProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { ArrowRight } from 'lucide-react';

export default function TechnicalFeaturedProducts() {
  const featured = SAMPLE_PRODUCTS.slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-mono text-[10px] text-copper tracking-widest mb-1">{'// FEATURED'}</p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-cable-white"
          >
            Top sellers
          </motion.h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm text-aluminum hover:text-cable-white transition-colors font-display"
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((product, i) => (
          <TechnicalProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
