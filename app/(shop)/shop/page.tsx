'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';
import TechnicalProductCard from '@/components/TechnicalProductCard';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import GlobalHorizontalScrollWrapper from '@/components/GlobalHorizontalScrollWrapper';

const PRICE_RANGES = [
  { label: 'Any', value: 'all' },
  { label: 'Under $25', value: '0-25' },
  { label: '$25–$100', value: '25-100' },
  { label: '$100–$500', value: '100-500' },
  { label: 'Over $500', value: '500+' },
];

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'stock-desc';
const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Price: low → high', value: 'price-asc' },
  { label: 'Price: high → low', value: 'price-desc' },
  { label: 'Name A–Z', value: 'name-asc' },
  { label: 'In stock first', value: 'stock-desc' },
];

const ALL_BRANDS = Array.from(
  new Set(SAMPLE_PRODUCTS.map((p) => p.brand).filter((b): b is string => Boolean(b)))
).sort();

// ── Chip button ────────────────────────────────────────────────────────────
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-wide rounded border transition-all whitespace-nowrap focus-visible:outline-none px-2 py-1 ${
        active
          ? 'bg-signal/20 text-signal border-signal/50 font-semibold'
          : 'bg-transparent text-aluminum border-aluminum/20 hover:border-signal/30 hover:text-cable-white'
      }`}
    >
      {children}
    </button>
  );
}

// ── Collapsible filter section ─────────────────────────────────────────────
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-aluminum/10 pb-4 last:border-0 last:pb-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-2 focus-visible:outline-none"
        aria-expanded={open}
      >
        <span className="font-mono text-[10px] text-aluminum/50 tracking-widest uppercase">{title}</span>
        {open ? (
          <ChevronUp className="w-3 h-3 text-aluminum/40" />
        ) : (
          <ChevronDown className="w-3 h-3 text-aluminum/40" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('default');
  const [sortOpen, setSortOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Grid vs List view
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const addItem = useCartStore(s => s.addItem);

  // Sync URL params on load / navigation
  useEffect(() => {
    const cat = searchParams.get('category') ?? 'all';
    const match = CATEGORIES.find((c) => c.slug === cat);
    setSelectedCategory(match ? match.slug : cat === 'all' ? 'all' : cat);

    const sq = searchParams.get('search') ?? '';
    setSearchQuery(sq);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all') {
        const catSlug = CATEGORIES.find((c) => c.name === p.category)?.slug;
        if (catSlug !== selectedCategory) return false;
      }
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (priceRange !== 'all') {
        if (priceRange.endsWith('+')) {
          if (p.price < 500) return false;
        } else {
          const [min, max] = priceRange.split('-').map(Number);
          if (p.price < min || p.price > max) return false;
        }
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    switch (sortKey) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'name-asc': list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'stock-desc': list = [...list].sort((a, b) => b.stock - a.stock); break;
    }
    return list;
  }, [selectedCategory, selectedBrand, priceRange, inStockOnly, sortKey, searchQuery]);

  const activeCategory = CATEGORIES.find((c) => c.slug === selectedCategory);
  const activeFilters = [
    selectedCategory !== 'all',
    selectedBrand !== 'all',
    priceRange !== 'all',
    inStockOnly,
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSortKey('default');
    setSearchQuery('');
  };

  const currentSort = SORT_OPTIONS.find((s) => s.value === sortKey)!;

  const FilterPanel = () => (
    <div className="space-y-0">
      <FilterSection title="Category">
        <div className="flex flex-col gap-1">
          <CategoryRow value="all" label="All products" selected={selectedCategory === 'all'} onSelect={setSelectedCategory} count={SAMPLE_PRODUCTS.length} />
          {CATEGORIES.map((cat) => (
            <CategoryRow
              key={cat.slug}
              value={cat.slug}
              label={cat.name}
              selected={selectedCategory === cat.slug}
              onSelect={setSelectedCategory}
              count={SAMPLE_PRODUCTS.filter((p) => CATEGORIES.find((c) => c.name === p.category)?.slug === cat.slug).length}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price range">
        <div className="flex flex-wrap gap-1.5">
          {PRICE_RANGES.map((r) => (
            <Chip key={r.value} active={priceRange === r.value} onClick={() => setPriceRange(r.value)}>
              {r.label}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Brand" defaultOpen={false}>
        <div className="flex flex-wrap gap-1.5">
          <Chip active={selectedBrand === 'all'} onClick={() => setSelectedBrand('all')}>All</Chip>
          {ALL_BRANDS.map((b) => (
            <Chip key={b} active={selectedBrand === b} onClick={() => setSelectedBrand(b)}>{b}</Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-8 h-4 rounded-sm transition-colors border ${inStockOnly ? 'bg-signal/20 border-signal' : 'bg-aluminum/10 border-aluminum/30'}`} />
            <div className={`absolute top-[1px] left-[1px] w-3.5 h-3.5 bg-cable-white rounded-sm transition-transform ${inStockOnly ? 'translate-x-4' : ''}`} />
          </div>
          <span className={`font-mono text-[10px] uppercase tracking-wide transition-colors ${inStockOnly ? 'text-signal' : 'text-aluminum group-hover:text-cable-white'}`}>
            In stock only
          </span>
        </label>
      </FilterSection>

      {activeFilters > 0 && (
        <button
          onClick={resetFilters}
          className="w-full font-mono text-[9px] text-live-red border border-live-red/25 py-2 hover:bg-live-red/10 transition-colors tracking-widest mt-4"
        >
          [ RESET_FILTERS ]
        </button>
      )}
    </div>
  );

  return (
    <div className="-mt-24 -mb-12">
      <GlobalHorizontalScrollWrapper 
        heightClasses="h-[500vh]"
        contentClassName="flex h-full w-max pt-32 pb-12 pl-[320px]"
        fixedOverlay={
          <aside className="hidden lg:flex w-[320px] h-full flex-col border-r border-white/10 glass-panel p-6 overflow-hidden mt-24">
            <div className="mb-6 pb-4 border-b border-white/10 shrink-0">
              <h1 className="font-display text-2xl font-bold text-cable-white mb-2 drop-shadow-md">
                {searchQuery ? `RESULTS: "${searchQuery}"` : 'CATALOG'}
              </h1>
              <p className="font-mono text-[9px] text-signal tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                {activeCategory ? activeCategory.name : 'MASTER_INDEX'} — {filtered.length} COMPONENTS
              </p>
            </div>
            
            {/* Top Bar for View/Sort */}
            <div className="flex items-center gap-2 mb-6 shrink-0 border border-white/10 p-2 bg-black/20 rounded-lg">
              <div className="relative flex-1">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  className="flex items-center justify-between w-full px-3 py-1.5 font-mono text-[9px] text-aluminum hover:text-cable-white transition-colors uppercase bg-[#111614]"
                >
                  <span className="flex items-center gap-2"><ArrowUpDown className="w-3 h-3" /> {currentSort.label}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute left-0 right-0 top-full mt-1 border border-aluminum/15 bg-[#141918] shadow-2xl z-20 overflow-hidden"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortKey(opt.value); setSortOpen(false); }}
                          className={`w-full text-left px-3 py-2 font-mono text-[9px] uppercase transition-colors ${
                            sortKey === opt.value ? 'text-signal bg-signal/10' : 'text-aluminum hover:text-cable-white hover:bg-aluminum/10'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <FilterPanel />
            </div>
          </aside>
        }
      >
        <div className="flex gap-8 h-full items-center px-12">
          {filtered.length === 0 ? (
             <div className="flex flex-col items-center justify-center w-[50vw] h-[50vh] glass-panel rounded-2xl">
               <p className="font-mono text-white/50 text-xs mb-2 uppercase drop-shadow-md">[ ERR: NO_SIGNALS_FOUND ]</p>
               <button onClick={resetFilters} className="font-mono text-[10px] text-copper hover:text-signal hover:shadow-signal uppercase transition-colors">CLEAR_PARAMETERS</button>
             </div>
          ) : (
             filtered.map((product, i) => (
               <div key={product.id} className="w-[320px] md:w-[380px] shrink-0 h-full max-h-[70vh]">
                 <TechnicalProductCard product={product} index={i} />
               </div>
             ))
          )}
        </div>
      </GlobalHorizontalScrollWrapper>

      {/* ── Mobile filter drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-enclosure/90 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.22 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0B0F0E] border-r border-signal/20 p-5 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between mb-6 border-b border-aluminum/10 pb-4">
                <span className="font-mono text-[10px] text-signal tracking-widest uppercase">PARAMETERS</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-aluminum/10 text-aluminum"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterPanel />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Row for category filter with count badge
function CategoryRow({
  value, label, selected, onSelect, count,
}: {
  value: string; label: string; selected: boolean; onSelect: (v: string) => void; count: number;
}) {
  return (
    <button
      onClick={() => onSelect(value)}
      className={`flex items-center justify-between w-full px-2 py-1.5 text-left transition-all focus-visible:outline-none ${
        selected
          ? 'bg-signal/10 text-signal border border-signal/30'
          : 'text-aluminum hover:bg-aluminum/5 hover:text-cable-white border border-transparent'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] tracking-wide uppercase">{label}</span>
      </div>
      <span className="font-mono text-[9px] opacity-50">{count}</span>
    </button>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-20 font-mono text-aluminum/40 text-[10px] uppercase">
        [ LOADING_INDEX... ]
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
