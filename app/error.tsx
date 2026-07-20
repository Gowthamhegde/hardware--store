'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-enclosure text-cable-white">
      <div className="max-w-xl w-full glass-panel rounded-3xl p-8 md:p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-live-red/20 bg-live-red/10 text-live-red">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-aluminum mb-3">[ SYSTEM_FAULT ]</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-cable-white/70 mb-8">
          The storefront hit an unexpected error. You can retry this view or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-copper px-5 py-3 font-mono text-xs uppercase tracking-widest text-enclosure transition-colors hover:bg-copper/90"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-aluminum/30 px-5 py-3 font-mono text-xs uppercase tracking-widest text-cable-white transition-colors hover:border-signal hover:text-signal"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}