'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function VideoBackground() {
  // Global scroll progress
  const { scrollY } = useScroll();

  // Scroll animations: as user scrolls down (e.g., 0 to 800px), apply dynamic effects
  const scale = useTransform(scrollY, [0, 800], [1, 1.4]);
  const containerOpacity = useTransform(scrollY, [0, 800], [0.8, 0.1]);
  const filter = useTransform(scrollY, [0, 800], ['blur(0px)', 'blur(20px)']);
  const y = useTransform(scrollY, [0, 800], [0, 200]);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    const handleTimeUpdate = (e: Event) => {
      // On mobile, to save battery and processing, skip the complex crossfade 
      // and just let a single video loop natively.
      if (isMobile) return;

      const video = e.target as HTMLVideoElement;
      const isV1 = video === v1;
      const isActive = (isV1 && activeVideo === 1) || (!isV1 && activeVideo === 2);
      
      // Start crossfade 1 second before the end to create a seamless loop
      if (isActive && video.duration > 0) {
        const timeLeft = video.duration - video.currentTime;
        if (timeLeft <= 1.0) {
          const nextVideoNum = isV1 ? 2 : 1;
          const nextVideo = isV1 ? v2 : v1;
          
          if (activeVideo !== nextVideoNum) {
            // Reset and play the other video
            nextVideo.currentTime = 0;
            nextVideo.play().catch(console.error);
            setActiveVideo(nextVideoNum);
          }
        }
      }
    };

    v1.addEventListener('timeupdate', handleTimeUpdate);
    v2.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      v1.removeEventListener('timeupdate', handleTimeUpdate);
      v2.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [activeVideo, isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        initial={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 0.8, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={
          mounted && isMobile
            ? { scale: 1, opacity: 0.8, filter: 'blur(0px)', y: 0 }
            : { scale, opacity: containerOpacity, filter, y }
        }
      >
        {/* Dual video setup for seamless crossfading loop on desktop */}
        <video
          ref={video1Ref}
          autoPlay
          muted
          playsInline
          loop={isMobile} // Loop natively on mobile
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            activeVideo === 1 || isMobile ? 'opacity-60 z-10' : 'opacity-0 z-0'
          }`}
        >
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
        
        {!isMobile && (
          <video
            ref={video2Ref}
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              activeVideo === 2 ? 'opacity-60 z-10' : 'opacity-0 z-0'
            }`}
          >
            <source src="/bgvid.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-20" />
      </motion.div>
    </div>
  );
}
