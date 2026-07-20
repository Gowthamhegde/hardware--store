'use client';

import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Shield } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We source only the best products from trusted manufacturers',
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority in everything we do',
    },
    {
      icon: TrendingUp,
      title: 'Industry Expertise',
      description: '25+ years of experience in electrical supplies',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'All products are certified and come with warranty',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-heading text-5xl font-bold text-primary mb-6 text-center">
          About {STORE_CONFIG.name}
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          {STORE_CONFIG.tagline}
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For over {STORE_CONFIG.yearsInBusiness} years, {STORE_CONFIG.name} has been the go-to destination for
            switches, cables, lighting, home theatre systems, and everyday electronic items. What started as a small family business has
            grown into a trusted supplier serving homeowners, electricians, and contractors across the region.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We pride ourselves on offering a practical selection of products from trusted brands,
            backed by hands-on advice and friendly local service. Whether you're wiring a room,
            upgrading a home theatre, or replacing a small electronic part, we have the stock and support to help.
          </p>
        </div>

        <h2 className="font-heading text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-charcoal mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
