'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plug, Cable, Speaker, Smartphone, Tag, ArrowRight, Zap } from 'lucide-react';
import { CATEGORIES, STORE_CONFIG } from '@/lib/constants';
import TechnicalProductCard from './TechnicalProductCard';
import type { Product } from '@/types';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { STORE_PHOTOS } from '@/lib/store-images';
import { useCartStore } from '@/lib/store';

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0, reducedMotion = false) => {
  if (reducedMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0, delay: 0, ease: [0, 0, 0, 0] },
    };
  }
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease },
  };
};

const BRANDS = ['APPLE', 'SONY', 'YAMAHA', 'KLIPSCH', 'SONOS', 'DENON', 'SVS', 'AUDIOQUEST', 'BELKIN', 'PHILIPS', 'AQARA', 'SONOFF'];

const STATS = [
  { value: '2,400+', label: 'Products stocked' },
  { value: '12', label: 'Years trading' },
  { value: '48h', label: 'Dispatch window' },
  { value: '4.9★', label: 'Customer rating' },
];

// ── 3D Tilt Card Component ──────────────────────────────────────────────────
function TiltCard({ children, className, href, reducedMotion = false }: { children: React.ReactNode; className?: string; href?: string; reducedMotion?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (reducedMotion) return; // Skip mouse tracking if reduced motion
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  const CardContent = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`spatial-glass rounded-3xl overflow-hidden group ${className}`}
    >
      {/* Interactive hover glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${useTransform(mouseX, (v) => v + 200)}px ${useTransform(mouseY, (v) => v + 200)}px,
              var(--glass-hover, rgba(150, 150, 150, 0.08)),
              transparent 40%
            )
          `,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{CardContent}</Link>;
  }

  return CardContent;
}

export default function BentoGrid() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '-20%']);
  const headlineScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.95]);

  const ht = CATEGORIES[2];
  const sw = CATEGORIES[0];
  const cb = CATEGORIES[1];
  const sh = CATEGORIES[3];
  const dl = CATEGORIES[4];
  
  // Get products from cart instead of static featured list
  const cartItems = useCartStore((s) => s.items);
  const productsInCart = cartItems.map(item => item.product);
  const [defaultFeatured, setDefaultFeatured] = useState<Product[]>([]);
  const featuredSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (productsInCart.length > 0 || !featuredSectionRef.current) return;

    let active = true;
    const loadFeaturedProducts = () => {
      import('@/lib/sample-data')
        .then(({ SAMPLE_PRODUCTS }) => {
          if (active) {
            setDefaultFeatured(
              SAMPLE_PRODUCTS.filter((product) => product.category === 'Home Theatre & Audio').slice(0, 3)
            );
          }
        })
        .catch(() => {
          if (active) setDefaultFeatured([]);
        });
    };

    if (typeof IntersectionObserver === 'undefined') {
      loadFeaturedProducts();
      return () => { active = false; };
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      loadFeaturedProducts();
    }, { rootMargin: '240px' });

    observer.observe(featuredSectionRef.current);
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [productsInCart.length]);

  const featured = productsInCart.length > 0 ? productsInCart.slice(0, 6) : defaultFeatured;

  return (
    <div className="relative z-10 w-full overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative container mx-auto px-4 pt-24 sm:pt-28 pb-12 sm:pb-16 flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0, prefersReducedMotion)} className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 font-display text-[10px] sm:text-xs font-semibold text-foreground tracking-widest border border-foreground/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-foreground/5 backdrop-blur-md shadow-spatial">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </span>
            <span className="hidden sm:inline">LOCAL STORE EDITION · LIVE INVENTORY</span>
            <span className="sm:hidden">LIVE INVENTORY</span>
          </span>
        </motion.div>

        {/* Headline with parallax */}
        <motion.div style={{ y: headlineY, scale: headlineScale }} className="relative z-20 w-full">
          <motion.h1
            {...fadeUp(0.04, prefersReducedMotion)}
            className="gradient-text font-display text-[clamp(2.8rem,12vw,6.5rem)] md:text-8xl lg:text-[100px] font-black leading-[0.9] tracking-tighter mb-4 sm:mb-6 pb-2 break-words"
            style={{
              backgroundImage: 'linear-gradient(to bottom right, var(--foreground), rgba(150, 150, 150, 0.4))',
            }}
          >
            VIGNESH
            <br />
            <span className="spatial-text-glow text-foreground">
              electrical space.
            </span>
          </motion.h1>
        </motion.div>

        <motion.p {...fadeUp(0.1, prefersReducedMotion)} className="mt-2 text-foreground/60 text-base sm:text-xl max-w-2xl leading-relaxed font-display px-2">
          Hardware, switches, cables, home theatre, and electronic items curated for homes and contractors.
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.14, prefersReducedMotion)} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 mb-6 sm:mb-8 w-full px-4 sm:px-0">
          <Link
            href="/shop"
            className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-foreground text-background font-display font-bold rounded-full hover:scale-105 transition-transform text-base sm:text-lg shadow-[0_0_40px_rgba(150,150,150,0.3)] w-full sm:w-auto justify-center"
          >
            Shop all products
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/build-setup"
            className="group flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 spatial-glass text-foreground font-display font-bold rounded-full hover:bg-foreground/10 transition-colors text-base sm:text-lg w-full sm:w-auto justify-center"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-foreground shrink-0" />
            Build a setup
          </Link>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-6 sm:py-8 relative z-20">
        <motion.div {...fadeUp(0.08, prefersReducedMotion)} className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-foreground">Inside the store</h2>
            <p className="font-display text-sm text-foreground/55 max-w-2xl">Real showroom and product photos from the shop floor.</p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground hover:text-signal transition-colors shrink-0">
            Browse catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
          {STORE_PHOTOS.slice(0, 6).map((photo, index) => (
            <motion.div
              key={photo}
              {...fadeUp(0.04 * index, prefersReducedMotion)}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl border border-foreground/10 bg-foreground/5 ${
                index === 0
                  ? 'md:col-span-2 md:row-span-2 min-h-[220px] sm:min-h-[280px] md:min-h-[420px]'
                  : 'min-h-[140px] sm:min-h-[180px]'
              }`}
            >
              <Image
                src={photo}
                alt={`VIGNESH Electrical Power House photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BENTO GRID ──────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-6 sm:py-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">

          {/* HOME THEATRE — hero tile, 7/12 wide, 2 rows tall */}
          <motion.div {...fadeUp(0.08, prefersReducedMotion)} className="md:col-span-7 md:row-span-2">
            <TiltCard href={`/shop?category=${ht.slug}`} className="h-full min-h-[380px] sm:min-h-[500px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shadow-lg shrink-0">
                      <Speaker className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-xs text-foreground/80 tracking-widest block uppercase mb-1">Spatial Audio</span>
                      <span className="font-mono text-[10px] text-foreground/50 tracking-widest uppercase">IMMERSIVE SOUNDSCAPES</span>
                    </div>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-3 sm:mb-4">
                    {ht.name}
                  </h2>
                  <p className="text-foreground/60 text-sm sm:text-lg leading-relaxed max-w-md mb-5 sm:mb-8 font-display">
                    {ht.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Spatial Audio', 'Dolby Atmos', 'Soundbars', 'Projectors'].map((tag) => (
                      <span key={tag} className="font-display font-medium text-[10px] sm:text-xs text-foreground border border-foreground/20 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 bg-foreground/5 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 sm:mt-10">
                  <div className="flex items-center gap-2 sm:gap-3 text-foreground font-display text-base sm:text-lg font-bold transition-colors">
                    Explore collection
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* SWITCHES & SOCKETS */}
          <motion.div {...fadeUp(0.15, prefersReducedMotion)} className="md:col-span-5">
            <TiltCard href={`/shop?category=${sw.slug}`} className="h-full min-h-[180px] sm:min-h-[240px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-5 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shrink-0">
                    <Plug className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                  </div>
                  <span className="font-display font-medium text-[10px] text-foreground border border-foreground/30 rounded-full px-2 sm:px-3 py-1 bg-foreground/10 uppercase tracking-wider text-right">
                    {sw.specs}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">{sw.name}</h3>
                  <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed max-w-xs font-display">{sw.description}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* CABLES & WIRES */}
          <motion.div {...fadeUp(0.22, prefersReducedMotion)} className="md:col-span-5">
            <TiltCard href={`/shop?category=${cb.slug}`} className="h-full min-h-[180px] sm:min-h-[240px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-5 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shrink-0">
                    <Cable className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                  </div>
                  <span className="font-display font-medium text-[10px] text-foreground border border-foreground/30 rounded-full px-2 sm:px-3 py-1 bg-foreground/10 uppercase tracking-wider text-right">
                    {cb.specs}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">{cb.name}</h3>
                  <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed max-w-xs font-display">{cb.description}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* SMART HOME */}
          <motion.div {...fadeUp(0.29, prefersReducedMotion)} className="md:col-span-6">
            <TiltCard href={`/shop?category=${sh.slug}`} className="h-full min-h-[120px] sm:min-h-[160px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-4 sm:p-6 flex items-center gap-4 sm:gap-6 bg-gradient-to-r from-foreground/[0.05] to-transparent">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-1">{sh.name}</h3>
                  <p className="text-foreground/60 text-xs sm:text-sm truncate font-display">{sh.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </TiltCard>
          </motion.div>

          {/* DEALS */}
          <motion.div {...fadeUp(0.36, prefersReducedMotion)} className="md:col-span-6">
            <TiltCard href={`/shop?category=${dl.slug}`} className="h-full min-h-[120px] sm:min-h-[160px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-4 sm:p-6 flex items-center gap-4 sm:gap-6 bg-gradient-to-r from-foreground/[0.05] to-transparent">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shrink-0 relative">
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground" />
                    </span>
                  </div>
                  <Tag className="w-6 h-6 sm:w-7 sm:h-7 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-1">{dl.name}</h3>
                  <p className="text-foreground/60 text-xs sm:text-sm truncate font-display">{dl.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="relative container mx-auto px-4 py-6 sm:py-10 z-20">
        <motion.div
          {...fadeUp(0, prefersReducedMotion)}
          className="grid grid-cols-2 md:grid-cols-4 divide-y-2 divide-x-0 sm:divide-y md:divide-y-0 md:divide-x divide-foreground/10 rounded-2xl sm:rounded-3xl spatial-glass overflow-hidden"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-6 sm:py-8 px-3 sm:px-4 gap-1 sm:gap-2 bg-foreground/[0.02]">
              <span className="gradient-text font-display text-2xl sm:text-3xl md:text-5xl font-black bg-gradient-to-b from-foreground to-foreground/50">{value}</span>
              <span className="font-display text-[10px] sm:text-xs font-semibold text-foreground/50 tracking-widest text-center uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── BUILD A SETUP CTA ─────────────────────────────────── */}
      <section className="relative container mx-auto px-4 py-6 sm:py-10 z-20">
        <motion.div
          {...fadeUp(0, prefersReducedMotion)}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-10 spatial-glass"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-foreground/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </div>
              <span className="font-display font-semibold text-[10px] sm:text-xs text-foreground/80 tracking-widest uppercase">Intelligent Setup Builder</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-foreground mb-3 sm:mb-4">Design your next installation</h2>
            <p className="text-foreground/70 text-sm sm:text-lg leading-relaxed max-w-lg font-display">
              Pick your core components, we seamlessly match the cables and smart controls.
            </p>
          </div>

          <Link
            href="/build-setup"
            className="relative z-10 group flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-foreground text-background font-display font-bold rounded-full hover:scale-105 transition-transform text-base sm:text-lg shadow-[0_0_30px_rgba(150,150,150,0.2)] w-full sm:w-auto justify-center"
          >
            Start building
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* ── FEATURED HOME THEATRE PRODUCTS ───────────────────── */}
      <section ref={featuredSectionRef} className="relative container mx-auto px-4 py-10 sm:py-16 z-20">
        <motion.div {...fadeUp(0, prefersReducedMotion)} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <p className="font-display font-semibold text-[10px] sm:text-xs text-foreground/60 tracking-widest mb-2 uppercase">
              {productsInCart.length > 0 ? 'Your Cart Items' : 'Curated Collection'}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-foreground">
              {productsInCart.length > 0 ? 'Added Products' : 'Spatial Audio'}
            </h2>
          </div>
          <Link
            href={productsInCart.length > 0 ? '/cart' : '/shop?category=home-theatre-audio'}
            className="flex items-center gap-2 text-sm font-bold text-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest font-display shrink-0"
          >
            {productsInCart.length > 0 ? 'View cart' : 'View collection'} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featured.map((p, i) => (
            <div key={p.id} className="relative z-10">
              <TechnicalProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── SCROLLING BRAND MARQUEE ───────────────────────────── */}
      <section className="container mx-auto px-4 py-6 sm:py-10 relative z-20">
        <div className="relative rounded-2xl sm:rounded-3xl spatial-glass py-6 sm:py-8 overflow-hidden flex items-center">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

          {/* Scrolling track */}
          <div className="marquee-track" aria-hidden="true">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} className="font-display font-bold text-base sm:text-xl text-foreground/20 tracking-[0.3em] mx-8 sm:mx-12 flex-shrink-0">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
