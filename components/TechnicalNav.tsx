'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useTheme } from '@/app/providers';
import { STORE_CONFIG } from '@/lib/constants';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { formatPrice } from '@/lib/utils';
import { getStorePhotoByKey } from '@/lib/store-images';

const NAV_LINKS = [
  { href: '/shop', label: 'All products' },
  { href: '/home-theatre', label: 'Home theatre' },
  { href: '/shop?category=cables-wires', label: 'Cables & wires' },
  { href: '/build-setup', label: 'Build a setup' },
];

export default function TechnicalNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
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
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = query.trim().length >= 2
    ? SAMPLE_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.brand?.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const openSearch = useCallback(() => {
    setSearchOpen(true);
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* ── Main nav bar ── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl transition-all duration-300">
        <nav
          className={`transition-all duration-500 rounded-full border border-white/10 ${
            isScrolled
              ? 'bg-enclosure/60 backdrop-blur-3xl py-3 px-6 shadow-glass'
              : 'bg-white/5 backdrop-blur-2xl py-4 px-8 shadow-glass'
          }`}
          aria-label="Main navigation"
        >
        <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label={`${STORE_CONFIG.name} home`}>
              <div className="w-10 h-10 relative overflow-hidden rounded-full border border-white/20 bg-black/50 group-hover:border-signal/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300">
                <Image src="/logo.jpeg" alt="" fill className="object-cover" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-cable-white text-lg tracking-tight group-hover:text-signal transition-colors">
                  {STORE_CONFIG.name}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 rounded-full font-mono text-xs font-medium text-aluminum hover:text-cable-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal uppercase tracking-wider"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={openSearch}
                className="p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
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
                      className="absolute -top-1 -right-1 w-5 h-5 bg-signal text-enclosure text-[10px] font-mono font-bold flex items-center justify-center shadow-[0_0_10px_rgba(111,231,196,0.3)]"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                className="md:hidden p-2.5 text-aluminum hover:text-signal hover:bg-signal/10 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
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

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl bg-enclosure border border-aluminum/20 md:hidden overflow-hidden shadow-2xl"
          >
            <nav className="p-4 flex flex-col gap-2">
              <button
                onClick={openSearch}
                className="flex items-center gap-3 px-4 py-3 font-mono text-xs text-aluminum hover:text-signal hover:bg-signal/10 transition-all text-left uppercase tracking-wider"
              >
                <Search className="w-4 h-4" />
                [ Search schematic ]
              </button>
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 font-mono text-xs text-aluminum hover:text-signal hover:bg-signal/10 transition-all uppercase tracking-wider"
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
              className="fixed top-12 left-1/2 -translate-x-1/2 z-[70] w-full max-w-2xl px-4"
              role="dialog"
              aria-label="Search products"
              aria-modal="true"
            >
              <div className="bg-[#111614] border border-aluminum/20 overflow-hidden shadow-2xl">
                {/* Input row */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-aluminum/10 relative">
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal/50 to-transparent" />
                  <Search className="w-5 h-5 text-signal flex-shrink-0 animate-pulse-fast" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="QUERY: ENTER COMPONENT NAME OR SPEC..."
                    className="flex-1 bg-transparent font-mono text-sm text-cable-white placeholder:text-aluminum/40 focus:outline-none uppercase"
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
                          <p className="font-mono text-xs text-aluminum/50">NO SIGNAL MATCH FOR "{query}"</p>
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
                                  <Image src={getStorePhotoByKey(product.id, product.image_url)} alt="" fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-display text-sm text-cable-white group-hover:text-signal transition-colors truncate">
                                    {product.name}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="font-mono text-[9px] text-aluminum/60 uppercase tracking-wide">
                                      {product.category}
                                    </span>
                                    {product.brand && (
                                      <span className="font-mono text-[9px] text-aluminum/40">· {product.brand}</span>
                                    )}
                                  </div>
                                </div>
                                <span className="font-mono text-xs text-copper flex-shrink-0">
                                  {formatPrice(product.price)}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-aluminum/30 group-hover:text-signal group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* View all results link */}
                      {results.length > 0 && (
                        <div className="px-4 py-2 border-t border-aluminum/10 bg-[#0d1110]">
                          <Link
                            href={`/shop?search=${encodeURIComponent(query)}`}
                            onClick={() => setSearchOpen(false)}
                            className="flex items-center justify-between font-mono text-[10px] text-aluminum/60 hover:text-signal transition-colors tracking-widest"
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
              <p className="text-center font-mono text-[9px] text-aluminum/40 mt-3 tracking-widest">
                [ ESC TO TERMINATE ]
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
