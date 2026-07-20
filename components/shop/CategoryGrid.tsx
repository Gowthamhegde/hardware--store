'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import * as Icons from 'lucide-react';

export default function CategoryGrid() {
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
            Shop by Category
          </h2>
          <p className="text-aluminum max-w-2xl mx-auto">
            Browse our comprehensive selection of electrical supplies and hardware
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => {
            const IconComponent = (Icons as any)[category.icon.split('-').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('')] || Icons.Box;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="block group"
                >
                  <div className="bg-[color:var(--glass-bg)] backdrop-blur-2xl rounded-3xl p-8 border border-[color:var(--glass-border)] hover:border-signal/30 hover:shadow-glass transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-signal/10 rounded-2xl flex items-center justify-center group-hover:bg-signal/20 group-hover:scale-110 transition-all duration-300 border border-signal/10">
                        <IconComponent className="w-8 h-8 text-signal transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-cable-white group-hover:text-signal transition-colors mb-1 uppercase">
                          {category.name}
                        </h3>
                        <p className="text-sm text-aluminum">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
