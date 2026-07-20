import Link from 'next/link';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-enclosure text-cable-white">
      <div className="max-w-xl w-full glass-panel rounded-3xl p-8 md:p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-copper/20 bg-copper/10 text-copper">
          <SearchX className="h-8 w-8" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-aluminum mb-3">[ 404 / SIGNAL LOST ]</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-cable-white/70 mb-8">
          The route you requested does not exist. Return to the catalog or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 font-mono text-xs uppercase tracking-widest text-enclosure transition-colors hover:bg-copper/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-aluminum/30 px-5 py-3 font-mono text-xs uppercase tracking-widest text-cable-white transition-colors hover:border-signal hover:text-signal"
          >
            <Home className="h-4 w-4" />
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}