'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, ChevronRight, Settings2, Zap, Activity } from 'lucide-react';
import Image from 'next/image';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getStorePhotoByKey } from '@/lib/store-images';

const STEPS = [
  { id: 'core', title: 'CORE COMPONENT', category: 'home-theatre-audio' },
  { id: 'cabling', title: 'CABLING / SIGNAL', category: 'cables-wires' },
  { id: 'control', title: 'CONTROL SYSTEM', category: 'smart-home' },
  { id: 'power', title: 'POWER DELIVERY', category: 'switches-sockets' },
];

export default function BuildSetupPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, string>>({});
  
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const step = STEPS[currentStep];
  const availableProducts = SAMPLE_PRODUCTS.filter(
    (p) => CATEGORIES.find(c => c.name === p.category)?.slug === step.category
  );

  const totalSelected = Object.keys(selectedItems).length;
  const totalPrice = Object.values(selectedItems).reduce((sum, id) => {
    const p = SAMPLE_PRODUCTS.find(p => p.id === id);
    return sum + (p?.price || 0);
  }, 0);

  const handleSelect = (productId: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [step.id]: productId
    }));
    
    // Auto advance if not the last step
    if (currentStep < STEPS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 400);
    }
  };

  const handleComplete = () => {
    Object.values(selectedItems).forEach(id => {
      const p = SAMPLE_PRODUCTS.find(p => p.id === id);
      if (p) addItem(p);
    });
    toast.success('System configuration saved to cart');
    router.push('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-10 border-b border-aluminum/20 pb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Settings2 className="w-4 h-4 text-signal" />
            <span className="font-mono text-[10px] text-signal tracking-widest uppercase">
              SYSTEM CONFIGURATOR V1.0
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-cable-white">Build a setup</h1>
        </div>
        <div className="hidden md:flex font-mono text-[10px] text-aluminum/50">
          STATUS: <span className="text-signal ml-1">ONLINE</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Main Configurator Area */}
        <div className="flex-1">
          {/* Progress Tabs */}
          <div className="flex mb-8 overflow-x-auto hide-scrollbar pb-2">
            {STEPS.map((s, idx) => {
              const isActive = idx === currentStep;
              const isCompleted = !!selectedItems[s.id];
              const isFuture = idx > currentStep && !isCompleted;
              
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`flex items-center gap-3 px-4 py-2 border-b-2 whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'border-signal text-signal' 
                      : isCompleted 
                        ? 'border-copper text-cable-white' 
                        : 'border-aluminum/20 text-aluminum/50'
                  }`}
                >
                  <span className="font-mono text-[9px] opacity-60">0{idx + 1}</span>
                  <span className="font-mono text-xs uppercase tracking-wider">{s.title}</span>
                  {isCompleted && !isActive && <CheckCircle2 className="w-3.5 h-3.5 text-copper" />}
                </button>
              );
            })}
          </div>

          {/* Selection Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {availableProducts.map((product) => {
                const isSelected = selectedItems[step.id] === product.id;
                
                return (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(product.id)}
                    className={`text-left relative flex flex-col bg-[#111614] border overflow-hidden transition-all duration-300 ${
                      isSelected 
                        ? 'border-signal ring-1 ring-signal' 
                        : 'border-aluminum/15 hover:border-aluminum/50'
                    }`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 w-5 h-5 bg-signal text-enclosure flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    )}

                    <div className="relative h-32 bg-enclosure border-b border-aluminum/10 p-4 flex items-center justify-center">
                      <div className="relative w-full h-full opacity-80 hover:opacity-100 transition-opacity">
                        <Image src={getStorePhotoByKey(product.id, product.image_url)} alt={product.name} fill className="object-contain" />
                      </div>
                    </div>
                    
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="font-mono text-[9px] text-aluminum/50 tracking-widest uppercase mb-1">
                        {product.id}
                      </div>
                      <h3 className="font-display text-sm font-semibold text-cable-white leading-tight mb-2 flex-grow">
                        {product.name}
                      </h3>
                      
                      {product.specifications && (
                        <div className="mb-3">
                          <div className="font-mono text-[9px] text-aluminum">
                            {Object.entries(product.specifications)[0]?.[0]}: <span className="text-cable-white">{Object.entries(product.specifications)[0]?.[1]}</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="font-mono text-xs text-signal font-bold pt-3 border-t border-aluminum/10">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-aluminum/20">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="font-mono text-xs px-4 py-2 text-aluminum disabled:opacity-30 uppercase hover:text-cable-white"
            >
              [ PREVIOUS ]
            </button>
            
            {currentStep < STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="font-mono text-xs px-4 py-2 border border-signal text-signal hover:bg-signal/10 transition-colors uppercase flex items-center gap-2"
              >
                NEXT_STEP <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={totalSelected === 0}
                className="font-mono text-xs px-6 py-2 bg-signal text-enclosure font-bold hover:bg-signal/80 transition-colors uppercase disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                FINALIZE_SYSTEM <Zap className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* HUD Sidebar (Sticky) */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24 bg-[#0a0d0c] border border-aluminum/20 p-5 font-mono">
            <div className="flex items-center gap-2 border-b border-aluminum/20 pb-3 mb-4">
              <Activity className="w-4 h-4 text-signal animate-pulse-fast" />
              <h2 className="text-xs text-cable-white tracking-widest uppercase">HUD Readout</h2>
            </div>

            <div className="space-y-4 mb-6">
              {STEPS.map((s) => {
                const selectedId = selectedItems[s.id];
                const selectedProduct = SAMPLE_PRODUCTS.find(p => p.id === selectedId);
                
                return (
                  <div key={s.id} className="relative">
                    <div className="text-[9px] text-aluminum/50 mb-1">{s.title}</div>
                    {selectedProduct ? (
                      <div className="border border-signal/30 bg-signal/5 p-2 flex justify-between items-start gap-2">
                        <div>
                          <div className="text-[10px] text-cable-white leading-tight truncate max-w-[160px]">
                            {selectedProduct.name}
                          </div>
                          <div className="text-[9px] text-signal mt-1">
                            {formatPrice(selectedProduct.price)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const newItems = {...selectedItems};
                            delete newItems[s.id];
                            setSelectedItems(newItems);
                          }}
                          className="text-aluminum/40 hover:text-live-red text-[9px]"
                        >
                          [X]
                        </button>
                      </div>
                    ) : (
                      <div className="text-[10px] text-aluminum/30 italic">Awaiting input...</div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-aluminum/20 pt-4 mb-6">
              <div className="flex justify-between items-center text-[10px] text-aluminum mb-1">
                <span>COMPONENTS:</span>
                <span>{totalSelected} / {STEPS.length}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-aluminum">TOTAL_SYS_VALUE:</span>
                <span className="text-lg font-bold text-copper">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            {totalSelected === STEPS.length && (
              <div className="bg-signal/10 border border-signal/30 p-2 rounded text-[9px] text-signal text-center uppercase tracking-widest">
                System configuration optimal. Ready to deploy.
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
