'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useTheme } from '@/app/providers';
import { STORE_CONFIG } from '@/lib/constants';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { getStorePhotoByKey } from '@/lib/store-images';

const NAV_LINKS = [
  { href: '/shop', label: 'All products' },
  { href: '/home-theatre', label: 'Home theatre' },
  { href: '/shop?category=cables-wires', label: 'Cables & wires' },
  { href: '/build-setup', label: 'Build a setup' },
];

export default function TechnicalNav() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemCount = useCartStore((state) => state.getItemCount());
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
        setLogoOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!searchOpen || normalizedQuery.length < 2) {
      setResults([]);
      return;
    }

    let active = true;
    const timeoutId = window.setTimeout(() => {
      import('@/lib/sample-data')
        .then(({ SAMPLE_PRODUCTS }) => {
          if (!active) return;
          setResults(
            SAMPLE_PRODUCTS.filter((product) =>
              product.name.toLowerCase().includes(normalizedQuery) ||
              product.category.toLowerCase().includes(normalizedQuery) ||
              product.brand?.toLowerCase().includes(normalizedQuery) ||
              product.description.toLowerCase().includes(normalizedQuery)
            ).slice(0, 6)
          );
        })
        .catch(() => {
          if (active) setResults([]);
        });
    }, 180);

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
    };
  }, [query, searchOpen]);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMobileOpen(false);
  }, []);

  const prefetchRoute = useCallback((href: string) => {
    router.prefetch(href);
  }, [router]);

  return (
    <>
      {/* ── Main nav bar ── */}
      <div className="fixed top-3 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300">
        <nav
          className={`glass-panel transition-all duration-500 rounded-full px-2 sm:px-0 overflow-visible ${
            isScrolled
              ? 'py-2.5 px-4 sm:py-3 sm:px-6'
              : 'py-3 px-4 sm:py-4 sm:px-8'
          }`}
          aria-label="Main navigation"
        >
        <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setLogoOpen(true)}
                className="group relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full border border-white/30 bg-transparent group-hover:border-signal/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                aria-label={`View ${STORE_CONFIG.name} logo`}
              >
                <Image src="/logo.jpeg" alt="" fill sizes="48px" className="object-contain p-1" priority />
              </button>
              <Link href="/" className="min-w-0 font-serif font-bold text-cable-white tracking-tight hover:text-signal transition-colors" aria-label={`${STORE_CONFIG.name} home`}>
                <span className="sm:hidden text-xs leading-tight">VIGNESH ELECTRICALS</span>
                <span className="hidden sm:block text-lg">{STORE_CONFIG.name}</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden lg:flex min-w-0 flex-1 items-center justify-center gap-1 lg:gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onMouseEnter={() => prefetchRoute(href)}
                  onFocus={() => prefetchRoute(href)}
                  onTouchStart={() => prefetchRoute(href)}
                  className="group relative inline-flex items-center justify-center gap-2 px-3 py-2 lg:px-4 rounded-full font-display text-sm font-semibold text-aluminum hover:text-cable-white hover:bg-white/10 transition-all duration-200 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal whitespace-nowrap touch-target motion-reduce:transition-none"
                >
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">{label}</span>
                  <span aria-hidden="true" className="absolute bottom-2 left-4 right-4 h-px origin-left scale-x-0 bg-signal transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={openSearch}
                className="touch-target rounded-full p-2 sm:p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTheme}
                className="hidden sm:inline-flex touch-target rounded-full p-2 sm:p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative touch-target rounded-full p-2 sm:p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                aria-label={`Cart, ${mounted ? itemCount : 0} item${mounted && itemCount !== 1 ? 's' : ''}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <AnimatePresence>
                  {mounted && itemCount > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-signal text-enclosure text-mono-responsive-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.3)] rounded-full"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className="lg:hidden touch-target rounded-full p-2 sm:p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Enlarged logo preview ── */}
      <AnimatePresence>
        {logoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${STORE_CONFIG.name} logo`}
            onClick={() => setLogoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-sm rounded-2xl border border-signal/40 bg-enclosure p-5 shadow-[0_0_45px_rgba(0,243,255,0.35)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setLogoOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-black/10 p-2 text-black/70 transition-colors hover:bg-black/20 hover:text-black"
                aria-label="Close logo preview"
              >
                <X className="h-5 w-5" />
              </button>
              <Image
                src="/logo.jpeg"
                alt={STORE_CONFIG.name}
                width={640}
                height={640}
                className="h-auto w-full rounded-xl object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-sm bg-enclosure border border-aluminum/20 lg:hidden overflow-hidden shadow-2xl rounded-2xl"
          >
            <nav className="p-3 flex flex-col gap-1">
              <button
                onClick={openSearch}
                className="flex items-center gap-3 px-4 py-3 font-display text-sm font-semibold text-aluminum hover:text-signal hover:bg-signal/10 transition-all text-left rounded-xl touch-target"
              >
                <Search className="w-4 h-4 shrink-0" />
                Search products
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 px-4 py-3 font-display text-sm font-semibold text-aluminum hover:text-signal hover:bg-signal/10 transition-all text-left rounded-xl touch-target"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
                {theme === 'dark' ? 'Light theme' : 'Dark theme'}
              </button>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={() => prefetchRoute(href)}
                  onFocus={() => prefetchRoute(href)}
                  onTouchStart={() => prefetchRoute(href)}
                  className="group flex items-center justify-between px-4 py-3 font-display text-sm font-semibold text-aluminum hover:text-signal hover:bg-signal/10 hover:translate-x-1 transition-all rounded-xl touch-target motion-reduce:transition-none"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-[60] bg-enclosure/90 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              key="search-panel"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-4 left-2 right-2 z-[70] w-auto sm:top-12 sm:left-1/2 sm:right-auto sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:px-4"
              role="dialog"
              aria-label="Search products"
              aria-modal="true"
            >
              <div className="bg-enclosure border border-aluminum/20 overflow-hidden shadow-2xl transition-colors duration-500 rounded-2xl">
                {/* Input row */}
                <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 border-b border-aluminum/10 bg-black/20 relative">
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
                  <Search className="w-5 h-5 text-signal flex-shrink-0 animate-pulse-fast" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 min-w-0 rounded-lg border border-aluminum/20 bg-enclosure/80 px-3 py-2.5 font-mono text-base text-cable-white placeholder:text-aluminum/60 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20 sm:text-sm"
                    aria-label="Search query"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-2 hover:bg-aluminum/10 text-aluminum hover:text-cable-white transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Results */}
                <AnimatePresence mode="wait">
                  {query.trim().length >= 2 && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {results.length === 0 ? (
                        <div className="px-4 py-6 text-center">
                          <p className="text-mono-responsive-xs text-aluminum/70">NO SIGNAL MATCH FOR &quot;{query}&quot;</p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-aluminum/10">
                          {results.map((product) => (
                            <li key={product.id}>
                              <Link
                                href={`/product/${product.slug}`}
                                onClick={() => setSearchOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-aluminum/5 transition-colors group"
                              >
                                <div className="relative w-10 h-10 rounded bg-enclosure flex-shrink-0 border border-aluminum/10 group-hover:border-signal/50 transition-colors">
                                  <Image src={getStorePhotoByKey(product.id, product.image_url, product.brand)} alt="" fill sizes="40px" className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-sm text-cable-white group-hover:text-signal transition-colors truncate">
                                    {product.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-mono-responsive-xs text-aluminum/80 uppercase tracking-wide">
                                      {product.category}
                                    </span>
                                    {product.brand && (
                                      <span className="text-mono-responsive-xs text-aluminum/60">· {product.brand}</span>
                                    )}
                                  </div>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-aluminum/30 group-hover:text-signal group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* View all results link */}
                      {results.length > 0 && (
                        <div className="px-4 py-2 border-t border-aluminum/10 bg-black/5 dark:bg-white/5 transition-colors duration-500">
                          <Link
                            href={`/shop?search=${encodeURIComponent(query)}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between text-xs text-aluminum/80 hover:text-signal transition-colors tracking-widest min-h-[44px]"
                          >
                            [ VIEW_ALL_SIGNALS ]
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Keyboard hint */}
              <p className="text-center text-xs text-aluminum/60 mt-3 tracking-widest">
                [ ESC TO TERMINATE ]
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
