'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export default function DeferredBackgroundModel() {
  const [BackgroundModel, setBackgroundModel] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let active = true;
    let timeoutId: number | undefined;
    let idleId: number | undefined;
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const loadBackground = () => {
      void import('./BackgroundModel')
        .then(({ default: Model }) => {
          if (active) setBackgroundModel(() => Model);
        })
        .catch(() => undefined);
    };

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(loadBackground, { timeout: 2000 });
    } else {
      timeoutId = window.setTimeout(loadBackground, 800);
    }

    return () => {
      active = false;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
    };
  }, []);

  return BackgroundModel ? <BackgroundModel /> : null;
}
