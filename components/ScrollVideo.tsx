'use client';

import { useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // This effect links the scroll position to the video's current time.
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (videoRef.current && videoRef.current.readyState >= 2) {
        // Calculate the target time based on scroll percentage (latest is 0 to 1)
        const duration = videoRef.current.duration;
        if (duration) {
          // Use a slight offset so we don't hit exactly the end of the video,
          // which can cause playback state issues on some browsers.
          const targetTime = latest * (duration - 0.1);
          videoRef.current.currentTime = targetTime;
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-background overflow-hidden">
      {/* We use a generic royalty-free placeholder video url here for demonstration.
          The user can replace this url with their own premium video. */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover opacity-60 dark:opacity-40"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
        muted
        playsInline
        preload="auto"
      />
      {/* A theme-aware overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
    </div>
  );
}
