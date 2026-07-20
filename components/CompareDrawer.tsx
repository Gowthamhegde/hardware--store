'use client';

import { useCompareStore, useCartStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Scale } from 'lucide-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import { getStorePhotoByKey } from '@/lib/store-images';

export default function CompareDrawer() {
  const { compareItems, removeCompare, clearCompare } = useCompareStore();
  const addItem = useCartStore(s => s.addItem);

  // If nothing to compare, render nothing
  if (compareItems.length === 0) return null;

  // Extract all unique spec keys across the compared items
  const allSpecKeys = Array.from(
    new Set(
      compareItems.flatMap(p => 
        p.specifications ? Object.keys(p.specifications) : []
      )
    )
  );

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 pointer-events-none flex justify-center">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        className="bg-[#0B0F0E] border border-signal/50 pointer-events-auto max-w-6xl w-full shadow-[0_-10px_40px_rgba(111,231,196,0.15)] max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-signal/20 bg-signal/5">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-signal" />
            <span className="font-mono text-[10px] text-signal tracking-widest uppercase">
              COMPARISON_MATRIX : {compareItems.length} COMPONENTS
            </span>
          </div>
          <button
            onClick={clearCompare}
            className="font-mono text-[10px] text-aluminum hover:text-live-red transition-colors uppercase"
          >
            [ CLEAR_MATRIX ]
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 bg-[#0a0d0c]">
          <div className="flex gap-4 min-w-[800px]">
            {compareItems.map((product) => (
              <div key={product.id} className="flex-1 min-w-[250px] border border-aluminum/15 bg-[#111614] flex flex-col relative">
                <button
                  onClick={() => removeCompare(product.id)}
                  className="absolute top-2 right-2 p-1 text-aluminum hover:text-live-red bg-enclosure border border-aluminum/10 z-10"
                >
                  <X className="w-3 h-3" />
                </button>
                
                {/* Product Info */}
                <div className="p-4 border-b border-aluminum/10 text-center flex flex-col items-center">
                  <div className="w-24 h-24 relative mb-3">
                    <Image src={getStorePhotoByKey(product.id, product.image_url)} alt={product.name} fill className="object-contain" />
                  </div>
                  <div className="font-mono text-[9px] text-aluminum/50 uppercase mb-1">{product.id}</div>
                  <div className="font-display text-sm font-bold text-cable-white line-clamp-2 h-10 mb-2 uppercase">{product.name}</div>
                  <div className="font-mono text-sm font-bold text-signal mb-4">{formatPrice(product.price)}</div>
                  <button
                    onClick={() => { addItem(product); toast.success('ADDED TO CART'); }}
                    disabled={product.stock === 0}
                    className="w-full flex items-center justify-center gap-2 py-2 border border-signal text-signal text-[9px] font-mono tracking-widest hover:bg-signal/10 transition-colors uppercase disabled:opacity-50"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    {product.stock === 0 ? 'UNAVAILABLE' : 'ADD_TO_CART'}
                  </button>
                </div>

                {/* Specs */}
                <div className="flex-1 p-4 flex flex-col gap-3">
                  {allSpecKeys.map(key => {
                    const val = product.specifications?.[key];
                    // Check if this spec is different across the items
                    const valuesForThisSpec = compareItems.map(p => p.specifications?.[key] || 'N/A');
                    const isDifferent = new Set(valuesForThisSpec).size > 1;

                    return (
                      <div key={key} className={`border-b border-aluminum/5 pb-2 last:border-0 ${isDifferent ? 'bg-signal/5 -mx-2 px-2' : ''}`}>
                        <div className="font-mono text-[8px] text-aluminum/50 uppercase mb-1">{key}</div>
                        <div className={`font-mono text-[10px] uppercase ${isDifferent ? 'text-signal font-bold' : 'text-cable-white'}`}>
                          {val || '-'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - compareItems.length }).map((_, i) => (
              <div key={`empty-${i}`} className="flex-1 min-w-[250px] border border-aluminum/10 border-dashed bg-enclosure/30 flex items-center justify-center">
                <span className="font-mono text-[10px] text-aluminum/30 uppercase">
                  [ AWAITING_INPUT ]
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
