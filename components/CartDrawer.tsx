'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/store';
import { X, Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { getStorePhotoByKey } from '@/lib/store-images';

export default function CartDrawer() {
  const { isCartOpen, setCartOpen, items, updateQuantity, removeItem, getTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-enclosure/60 backdrop-blur-sm"
          />

          {/* Drawer - Exclusive Glassmorphism */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-md glass-panel flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-aluminum/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-cable-white" />
                <h2 className="font-display text-xl font-bold text-cable-white tracking-tight uppercase">
                  Active Cart
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-aluminum hover:text-live-red transition-colors hover:bg-aluminum/5 border border-transparent hover:border-live-red/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <ShoppingCart className="w-12 h-12 text-aluminum mb-4" />
                  <p className="font-mono text-[10px] text-aluminum tracking-widest uppercase">
                    [ NO_ITEMS_DETECTED ]
                  </p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-enclosure/50 border border-aluminum/20 flex-shrink-0">
                        <Image src={getStorePhotoByKey(item.product.id, item.product.image_url)} alt={item.product.name} fill className="object-contain p-2" />
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <Link href={`/product/${item.product.slug}`} onClick={() => setCartOpen(false)} className="font-display text-sm font-semibold text-cable-white line-clamp-2 hover:text-signal transition-colors uppercase">
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-aluminum/50 hover:text-live-red transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="font-mono text-[10px] text-signal font-bold mb-3">
                          {formatPrice(item.product.price)}
                        </div>

                        <div className="flex items-center gap-3 mt-auto">
                          <div className="flex items-center border border-aluminum/20 bg-enclosure/50">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-aluminum hover:text-cable-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-mono text-[10px] text-cable-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-aluminum hover:text-cable-white"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-aluminum/10 bg-enclosure/40">
                <div className="flex justify-between items-end mb-6">
                  <span className="font-mono text-[10px] text-aluminum tracking-widest uppercase">TOTAL_SYS_VALUE</span>
                  <span className="font-display text-2xl font-bold text-cable-white">{formatPrice(getTotal())}</span>
                </div>
                <button
                  onClick={() => { setCartOpen(false); /* route to checkout */ }}
                  className="w-full py-4 bg-signal text-enclosure font-mono text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-signal/90 transition-colors shadow-signal"
                >
                  INITIALIZE_CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
