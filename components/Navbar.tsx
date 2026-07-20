'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { STORE_CONFIG } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Using logo.jpeg */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-glass bg-enclosure/80 border border-signal/15"
            >
              <Image
                src="/logo.jpeg"
                alt={STORE_CONFIG.name}
                fill
                className="object-contain p-1"
                priority
              />
            </motion.div>
            <div className="hidden md:block">
              <span className="font-display font-bold text-xl block leading-none text-cable-white">
                {STORE_CONFIG.name}
              </span>
              <span className="text-[10px] tracking-widest text-aluminum">
                EST. {STORE_CONFIG.established}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="font-display text-sm text-aluminum hover:text-signal transition-colors uppercase tracking-wide">
              Shop
            </Link>
            <Link href="/about" className="font-display text-sm text-aluminum hover:text-signal transition-colors uppercase tracking-wide">
              About
            </Link>
            <Link href="/contact" className="font-display text-sm text-aluminum hover:text-signal transition-colors uppercase tracking-wide">
              Contact
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="p-2 hover:bg-signal/10 rounded-xl transition-colors text-aluminum hover:text-signal">
              <Search className="w-5 h-5" />
            </button>
            
            <Link aria-label="Cart" href="/cart" className="relative p-2 hover:bg-signal/10 rounded-xl transition-colors text-aluminum hover:text-signal">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-signal text-enclosure text-xs w-5 h-5 rounded-full flex items-center justify-center font-display font-bold shadow-signal"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            <Link aria-label="Admin" href="/admin" className="hidden md:block p-2 hover:bg-signal/10 rounded-xl transition-colors text-aluminum hover:text-signal">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              aria-label="Mobile Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-signal/10 rounded-xl transition-colors text-aluminum hover:text-signal"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-aluminum/10 bg-enclosure/90 backdrop-blur-2xl rounded-b-2xl"
          >
            <Link href="/shop" className="block py-3 font-mono text-sm text-charcoal hover:text-accent uppercase tracking-wide">
              Catalog
            </Link>
            <Link href="/about" className="block py-3 font-mono text-sm text-charcoal hover:text-accent uppercase tracking-wide">
              About
            </Link>
            <Link href="/contact" className="block py-3 font-mono text-sm text-charcoal hover:text-accent uppercase tracking-wide">
              Contact
            </Link>
            <Link href="/admin" className="block py-3 font-mono text-sm text-charcoal hover:text-accent uppercase tracking-wide">
              Admin
            </Link>
          </motion.div>
        )}
      </div>

      {/* Technical indicator line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="h-0.5 bg-gradient-to-r from-transparent via-signal to-transparent"
        style={{ transformOrigin: 'left' }}
      />
    </motion.nav>
  );
}
