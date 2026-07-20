'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export default function CircuitCategoryGrid() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-background to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-l from-accent/5 to-transparent rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-r from-blue-500/5 to-transparent rounded-tr-full" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 bg-gradient-to-r from-accent/10 to-blue-500/10 rounded-full mb-6 border border-accent/20"
          >
            <span className="font-display font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent text-sm tracking-widest uppercase">
              Shop By Category
            </span>
          </motion.div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-primary mb-6 tracking-tight leading-none">
            Explore Our
            <br />
            <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">Complete Range</span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Premium electrical components for every project and application
          </p>
        </motion.div>

        {/* Circuit board pegboard layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, index) => {
            const IconComponent = (Icons as any)[category.icon.split('-').map((word: string) => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('')] || Icons.Box;

            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="block group relative"
                >
                  {/* Modern glassmorphic card */}
                  <motion.div
                    whileHover={{ y: -12, scale: 1.03 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50"
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-accent/10 via-blue-500/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Glow effect on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                    {/* Icon */}
                    <div className="relative mb-6 z-10">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-20 bg-gradient-to-br from-accent via-blue-500 to-accent rounded-2xl flex items-center justify-center shadow-lg"
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 relative z-10">
                      <h3 className="font-display text-2xl font-bold text-primary group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-charcoal/70 leading-relaxed text-sm">
                        {category.description}
                      </p>
                      
                      {/* CTA Arrow */}
                      <motion.div
                        className="flex items-center gap-2 text-accent font-display font-semibold pt-4 group-hover:text-blue-600 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm uppercase tracking-wider">View More</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
