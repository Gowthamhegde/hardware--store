'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { Plug, Cable, Speaker, Smartphone, Tag, ArrowRight, Zap } from 'lucide-react';
import { CATEGORIES, STORE_CONFIG } from '@/lib/constants';
import TechnicalProductCard from './TechnicalProductCard';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { STORE_PHOTOS } from '@/lib/store-images';

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
    initial: { opacity: 0, y: 32 },
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

  const rotateX = useTransform(mouseY, [-200, 200], reducedMotion ? [0, 0] : [5, -5]);
  const rotateY = useTransform(mouseX, [-200, 200], reducedMotion ? [0, 0] : [-5, 5]);

  const CardContent = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
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
  const featured = SAMPLE_PRODUCTS.filter((p) => p.category === 'Home Theatre & Audio').slice(0, 3);

  return (
    <div className="relative z-10 overflow-hidden">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative container mx-auto px-4 pt-20 pb-16 flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <motion.div {...fadeUp(0, prefersReducedMotion)} className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 font-display text-xs font-semibold text-foreground tracking-widest border border-foreground/20 rounded-full px-4 py-2 bg-foreground/5 backdrop-blur-md shadow-spatial">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
            </span>
            LOCAL STORE EDITION · LIVE INVENTORY
          </span>
        </motion.div>

        {/* Headline with parallax */}
        <motion.div style={{ y: headlineY, scale: headlineScale }} className="relative z-20">
          <motion.h1
            {...fadeUp(0.04, prefersReducedMotion)}
            className="font-display text-6xl md:text-8xl lg:text-[100px] font-black text-transparent bg-clip-text leading-[0.9] tracking-tighter mb-6 pb-2"
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

        <motion.p {...fadeUp(0.1, prefersReducedMotion)} className="mt-2 text-foreground/60 text-xl max-w-2xl leading-relaxed font-display">
          Hardware, switches, cables, home theatre, and electronic items curated for homes and contractors.
        </motion.p>

        {/* CTA row */}
        <motion.div {...fadeUp(0.14, prefersReducedMotion)} className="flex flex-wrap items-center justify-center gap-4 mt-10 mb-8">
          <Link
            href="/shop"
            className="group flex items-center gap-2 px-8 py-4 bg-foreground text-background font-display font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_40px_rgba(150,150,150,0.3)]"
          >
            Shop all products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/build-setup"
            className="group flex items-center gap-2 px-8 py-4 spatial-glass text-foreground font-display font-bold rounded-full hover:bg-foreground/10 transition-colors text-lg"
          >
            <Zap className="w-5 h-5 text-foreground" />
            Build a setup
          </Link>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-8 relative z-20">
        <motion.div {...fadeUp(0.08, prefersReducedMotion)} className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-black text-foreground">Inside the store</h2>
            <p className="font-display text-sm md:text-base text-foreground/55 max-w-2xl">Real showroom and product photos from the shop floor.</p>
          </div>
          <Link href="/shop" className="hidden md:inline-flex items-center gap-2 font-display text-sm font-semibold text-foreground hover:text-signal transition-colors">
            Browse catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
          {STORE_PHOTOS.slice(0, 6).map((photo, index) => (
            <motion.div
              key={photo}
              {...fadeUp(0.04 * index, prefersReducedMotion)}
              className={`relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 ${index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[420px]' : 'min-h-[180px]'}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${photo})` }}
                aria-label={`VIGNESH Electrical Power House photo ${index + 1}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BENTO GRID ──────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* HOME THEATRE — hero tile, 7/12 wide, 2 rows tall */}
          <motion.div {...fadeUp(0.08, prefersReducedMotion)} className="md:col-span-7 md:row-span-2">
            <TiltCard href={`/shop?category=${ht.slug}`} className="h-full min-h-[500px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full flex flex-col justify-between p-10 bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center shadow-lg">
                      <Speaker className="w-7 h-7 text-foreground" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-xs text-foreground/80 tracking-widest block uppercase mb-1">Spatial Audio</span>
                      <span className="font-mono text-[10px] text-foreground/50 tracking-widest uppercase">IMMERSIVE SOUNDSCAPES</span>
                    </div>
                  </div>

                  <h2 className="font-display text-4xl md:text-6xl font-black text-foreground leading-tight mb-4">
                    {ht.name}
                  </h2>
                  <p className="text-foreground/60 text-lg leading-relaxed max-w-md mb-8 font-display">
                    {ht.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['Spatial Audio', 'Dolby Atmos', 'Soundbars', 'Projectors'].map((tag) => (
                      <span key={tag} className="font-display font-medium text-xs text-foreground border border-foreground/20 rounded-full px-4 py-1.5 bg-foreground/5 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10">
                  <div className="flex items-center gap-3 text-foreground font-display text-lg font-bold transition-colors">
                    Explore collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* SWITCHES & SOCKETS */}
          <motion.div {...fadeUp(0.15, prefersReducedMotion)} className="md:col-span-5">
            <TiltCard href={`/shop?category=${sw.slug}`} className="h-full min-h-[240px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center">
                    <Plug className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="font-display font-medium text-[10px] text-foreground border border-foreground/30 rounded-full px-3 py-1 bg-foreground/10 uppercase tracking-wider">
                    {sw.specs}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">{sw.name}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed max-w-xs font-display">{sw.description}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* CABLES & WIRES */}
          <motion.div {...fadeUp(0.22, prefersReducedMotion)} className="md:col-span-5">
            <TiltCard href={`/shop?category=${cb.slug}`} className="h-full min-h-[240px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-8 flex flex-col justify-between bg-gradient-to-br from-foreground/[0.05] to-transparent">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center">
                    <Cable className="w-6 h-6 text-foreground" />
                  </div>
                  <span className="font-display font-medium text-[10px] text-foreground border border-foreground/30 rounded-full px-3 py-1 bg-foreground/10 uppercase tracking-wider">
                    {cb.specs}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">{cb.name}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed max-w-xs font-display">{cb.description}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* SMART HOME */}
          <motion.div {...fadeUp(0.29, prefersReducedMotion)} className="md:col-span-6">
            <TiltCard href={`/shop?category=${sh.slug}`} className="h-full min-h-[160px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-6 flex items-center gap-6 bg-gradient-to-r from-foreground/[0.05] to-transparent">
                <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-7 h-7 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{sh.name}</h3>
                  <p className="text-foreground/60 text-sm truncate font-display">{sh.description}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </TiltCard>
          </motion.div>

          {/* DEALS */}
          <motion.div {...fadeUp(0.36, prefersReducedMotion)} className="md:col-span-6">
            <TiltCard href={`/shop?category=${dl.slug}`} className="h-full min-h-[160px]" reducedMotion={prefersReducedMotion}>
              <div className="h-full p-6 flex items-center gap-6 bg-gradient-to-r from-foreground/[0.05] to-transparent">
                <div className="w-14 h-14 rounded-2xl bg-foreground/10 backdrop-blur-md border border-foreground/20 flex items-center justify-center flex-shrink-0 relative">
                  <div className="absolute -top-1 -right-1">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-foreground" />
                    </span>
                  </div>
                  <Tag className="w-7 h-7 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{dl.name}</h3>
                  <p className="text-foreground/60 text-sm truncate font-display">{dl.description}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="relative container mx-auto px-4 py-10 z-20">
        <motion.div
          {...fadeUp(0, prefersReducedMotion)}
          className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-foreground/10 rounded-3xl spatial-glass overflow-hidden"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-8 px-4 gap-2 bg-foreground/[0.02]">
              <span className="font-display text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">{value}</span>
              <span className="font-display text-xs font-semibold text-foreground/50 tracking-widest text-center uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── BUILD A SETUP CTA ─────────────────────────────────── */}
      <section className="relative container mx-auto px-4 py-10 z-20">
        <motion.div
          {...fadeUp(0, prefersReducedMotion)}
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 spatial-glass"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-display font-semibold text-xs text-foreground/80 tracking-widest uppercase">Intelligent Setup Builder</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-4">Design your next installation</h2>
            <p className="text-foreground/70 text-lg leading-relaxed max-w-lg font-display">
              Pick your core components, we seamlessly match the cables and smart controls. Build an immersive spatial environment in minutes.
            </p>
          </div>

          <Link
            href="/build-setup"
            className="relative z-10 group flex items-center gap-3 px-8 py-5 bg-foreground text-background font-display font-bold rounded-full hover:scale-105 transition-transform text-lg shadow-[0_0_30px_rgba(150,150,150,0.2)]"
          >
            Start building
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* ── FEATURED HOME THEATRE PRODUCTS ───────────────────── */}
      <section className="relative container mx-auto px-4 py-16 z-20">
        <motion.div {...fadeUp(0, prefersReducedMotion)} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-display font-semibold text-xs text-foreground/60 tracking-widest mb-2 uppercase">Curated Collection</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-foreground">Spatial Audio</h2>
          </div>
          <Link
            href="/shop?category=home-theatre-audio"
            className="flex items-center gap-2 text-sm font-bold text-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest font-display"
          >
            View collection <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <div key={p.id} className="relative z-10">
              <TechnicalProductCard product={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── SCROLLING BRAND MARQUEE ───────────────────────────── */}
      <section className="container mx-auto px-4 py-10 relative z-20">
        <div className="relative rounded-3xl spatial-glass py-8 overflow-hidden flex items-center">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" aria-hidden="true" />

          {/* Scrolling track */}
          <div className="marquee-track" aria-hidden="true">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} className="font-display font-bold text-xl text-foreground/20 tracking-[0.3em] mx-12 flex-shrink-0">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
