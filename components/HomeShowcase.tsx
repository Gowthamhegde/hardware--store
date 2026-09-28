'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Cable, ChevronRight, PlugZap, ShieldCheck, Wrench } from 'lucide-react';
import { CATEGORIES, STORE_CONFIG } from '@/lib/constants';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { getStorePhotoByIndex } from '@/lib/store-images';
import TechnicalProductCard from './TechnicalProductCard';

const categoryIcons = [Wrench, Cable, PlugZap, ShieldCheck];

export default function HomeShowcase() {
  const featured = SAMPLE_PRODUCTS.filter((product) => product.stock > 0).slice(0, 6);
  const categories = CATEGORIES.filter((category) => category.slug !== 'deals').slice(0, 4);

  return (
    <div className="pb-16">
      <section className="border-b border-aluminum/15 bg-enclosure">
        <div className="container mx-auto grid min-h-[540px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-28 lg:grid-cols-[1.05fr_.95fr] lg:pt-36">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-copper">
              <span className="h-px w-10 bg-copper" />
              Local trade counter · online catalog
            </div>
            <h1 className="max-w-xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-cable-white md:text-7xl">
              The right parts for the job.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-aluminum md:text-lg">
              Switchgear, cable, audio and everyday electrical hardware, selected for homeowners, installers and working contractors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 bg-copper px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-copper/85">
                Shop the catalog <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/shop?category=switches-sockets" className="inline-flex items-center gap-2 border border-aluminum/30 px-5 py-3 text-sm font-bold text-cable-white transition-colors hover:border-copper hover:text-copper">
                Browse switches
              </Link>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-aluminum/20 pt-5">
              <div><strong className="block font-display text-xl text-cable-white">{SAMPLE_PRODUCTS.length}+</strong><span className="text-xs text-aluminum">catalog items</span></div>
              <div><strong className="block font-display text-xl text-cable-white">{STORE_CONFIG.yearsInBusiness} yrs</strong><span className="text-xs text-aluminum">serving the trade</span></div>
              <div><strong className="block font-display text-xl text-cable-white">90 days</strong><span className="text-xs text-aluminum">returns window</span></div>
            </div>
          </div>
          <div className="relative min-h-[360px] overflow-hidden border border-aluminum/20 bg-[#202822] lg:min-h-[470px]">
            <Image src={getStorePhotoByIndex(0)} alt="Products on the Vignesh Electrical showroom floor" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 to-transparent p-6 pt-20 text-white">
              <div><p className="text-xs uppercase tracking-[0.18em] text-white/70">Counter pick</p><p className="mt-1 font-display text-xl font-semibold">Built for daily use</p></div>
              <span className="border border-white/40 px-2 py-1 text-[10px] uppercase tracking-widest">01 / 04</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-7 flex items-end justify-between border-b border-aluminum/20 pb-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">Shop by application</p><h2 className="mt-2 font-display text-3xl font-bold text-cable-white">Find your section</h2></div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-semibold text-aluminum hover:text-copper sm:flex">View all <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-aluminum/20 bg-aluminum/20 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = categoryIcons[index] ?? Wrench;
            return <Link key={category.slug} href={`/shop?category=${category.slug}`} className="group bg-background p-6 transition-colors hover:bg-white">
              <Icon className="h-6 w-6 text-copper" />
              <h3 className="mt-12 font-display text-lg font-semibold text-cable-white">{category.name}</h3>
              <p className="mt-2 text-sm leading-6 text-aluminum">{category.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-copper">Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
            </Link>;
          })}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mb-7 flex items-end justify-between border-b border-aluminum/20 pb-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">From the counter</p><h2 className="mt-2 font-display text-3xl font-bold text-cable-white">Popular right now</h2></div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm font-semibold text-aluminum hover:text-copper sm:flex">See all products <ChevronRight className="h-4 w-4" /></Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{featured.map((product, index) => <TechnicalProductCard key={product.id} product={product} index={index} />)}</div>
      </section>
    </div>
  );
}
