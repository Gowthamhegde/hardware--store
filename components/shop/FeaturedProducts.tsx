'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';

export default function FeaturedProducts() {
  const featured = SAMPLE_PRODUCTS.slice(0, 6);

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-cable-white mb-4 uppercase tracking-tight">
            Featured Products
          </h2>
          <p className="text-aluminum max-w-2xl mx-auto">
            Discover our top-rated electrical supplies and hardware
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
