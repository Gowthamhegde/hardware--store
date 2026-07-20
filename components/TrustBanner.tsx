'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Truck, Wrench } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';

const features = [
  { 
    icon: Shield, 
    title: 'ISI Certified', 
    desc: 'All products tested',
    code: '// QUALITY_VERIFIED' 
  },
  { 
    icon: Award, 
    title: `${STORE_CONFIG.yearsInBusiness}+ Years`, 
    desc: 'Industry experience',
    code: '// ESTABLISHED_1999'
  },
  { 
    icon: Truck, 
    title: 'Fast Dispatch', 
    desc: 'Same-day shipping',
    code: '// LOGISTICS_READY'
  },
  { 
    icon: Wrench, 
    title: 'Tech Support', 
    desc: 'Expert guidance',
    code: '// SUPPORT_ACTIVE'
  },
];

export default function TrustBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-enclosure via-[#111614] to-enclosure relative overflow-hidden">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="trust-circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="#C9A227" />
            <line x1="10" y1="0" x2="10" y2="20" stroke="#C9A227" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#trust-circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon container - glassmorphic */}
              <div className="relative mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-signal/10 group-hover:border-signal/20 transition-all shadow-glass"
                >
                  <feature.icon className="w-8 h-8 text-signal" />
                </motion.div>
              </div>

              {/* Text */}
              <h3 className="font-display text-lg font-semibold text-cable-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-aluminum mb-2">{feature.desc}</p>
              <span className="font-mono text-[10px] text-signal/70 tracking-wider">
                {feature.code}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
