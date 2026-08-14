'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

// Circuit board corner bracket — SVG path for an L-shaped PCB corner
function CornerBracket({
  position,
  size = 120,
  color,
  delay = 0,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  color: string;
  delay?: number;
}) {
  const flip = {
    tl: 'scale(1,1)',
    tr: 'scale(-1,1)',
    bl: 'scale(1,-1)',
    br: 'scale(-1,-1)',
  }[position];

  const corner = {
    tl: 'top-0 left-0',
    tr: 'top-0 right-0',
    bl: 'bottom-0 left-0',
    br: 'bottom-0 right-0',
  }[position];

  const t = size;
  const s = size * 0.18; // stroke width scale

  return (
    <motion.div
      className={`absolute ${corner} pointer-events-none`}
      style={{ width: t, height: t }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <svg width={t} height={t} viewBox={`0 0 ${t} ${t}`} fill="none" style={{ transform: flip, transformOrigin: '50% 50%' }}>
        {/* Outer corner arm — horizontal */}
        <motion.line
          x1={t * 0.12} y1={t * 0.12}
          x2={t * 0.72} y2={t * 0.12}
          stroke={color}
          strokeWidth={s * 0.7}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
        />
        {/* Outer corner arm — vertical */}
        <motion.line
          x1={t * 0.12} y1={t * 0.12}
          x2={t * 0.12} y2={t * 0.72}
          stroke={color}
          strokeWidth={s * 0.7}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: delay + 0.4, ease: 'easeOut' }}
        />
        {/* Inner tick on horizontal arm */}
        <motion.line
          x1={t * 0.3} y1={t * 0.12}
          x2={t * 0.3} y2={t * 0.22}
          stroke={color}
          strokeWidth={s * 0.45}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: delay + 1.2 }}
        />
        {/* Inner tick on vertical arm */}
        <motion.line
          x1={t * 0.12} y1={t * 0.3}
          x2={t * 0.22} y2={t * 0.3}
          stroke={color}
          strokeWidth={s * 0.45}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4, delay: delay + 1.4 }}
        />
        {/* Corner dot */}
        <motion.circle
          cx={t * 0.12} cy={t * 0.12}
          r={s * 0.9}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        />
        {/* Pad dot on horizontal arm */}
        <motion.circle
          cx={t * 0.3} cy={t * 0.12}
          r={s * 0.55}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.3, delay: delay + 1.3 }}
        />
        {/* Pad dot on vertical arm */}
        <motion.circle
          cx={t * 0.12} cy={t * 0.3}
          r={s * 0.55}
          fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.3, delay: delay + 1.5 }}
        />
      </svg>
    </motion.div>
  );
}

// Animated scan line that travels along an edge
function EdgeScanLine({
  axis,
  side,
  color,
  duration = 4,
  delay = 0,
}: {
  axis: 'x' | 'y';
  side: 'start' | 'end';
  color: string;
  duration?: number;
  delay?: number;
}) {
  const posClass =
    axis === 'x'
      ? side === 'start'
        ? 'top-0 left-0 w-full h-px'
        : 'bottom-0 left-0 w-full h-px'
      : side === 'start'
      ? 'top-0 left-0 h-full w-px'
      : 'top-0 right-0 h-full w-px';

  return (
    <div className={`absolute ${posClass} overflow-hidden pointer-events-none opacity-30`}>
      <motion.div
        className="absolute"
        style={
          axis === 'x'
            ? { height: '1px', width: '15%', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }
            : { width: '1px', height: '15%', background: `linear-gradient(180deg, transparent, ${color}, transparent)` }
        }
        animate={
          axis === 'x'
            ? { x: ['-15%', '115%'] }
            : { y: ['-15%', '115%'] }
        }
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: duration * 0.6,
        }}
      />
    </div>
  );
}

// Mid-screen horizontal PCB trace lines (decorative)
function PCBTrace({
  y,
  width,
  color,
  delay = 0,
  opacity = 0.08,
}: {
  y: string;
  width: string;
  color: string;
  delay?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: y, left: '50%', translateX: '-50%', width, height: '1px', backgroundColor: color, opacity }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
    />
  );
}

export default function AnimatedBackground() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0.4]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const copper = 'var(--copper)';
  const green = 'var(--circuit-green)';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-enclosure transition-colors duration-500">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        src="/back_video.mp4"
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={mounted ? { opacity } : {}}
      >
        {/* ── Subtle glow pools ── */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[15%] -left-[5%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: `radial-gradient(circle, color-mix(in srgb, ${green} 22%, transparent) 0%, transparent 70%)`, filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-[20%] -right-[5%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: `radial-gradient(circle, color-mix(in srgb, ${copper} 10%, transparent) 0%, transparent 70%)`, filter: 'blur(100px)' }}
        />

        {/* ── Fine grid / dot matrix ── */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${green} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ── Horizontal PCB traces (mid-screen decoration) ── */}
        <PCBTrace y="25%" width="40%" color={green} delay={1.0} opacity={0.07} />
        <PCBTrace y="50%" width="55%" color={copper} delay={1.4} opacity={0.05} />
        <PCBTrace y="75%" width="35%" color={green} delay={1.8} opacity={0.06} />

        {/* ── Edge scan lines ── */}
        <EdgeScanLine axis="x" side="start" color={green}  duration={5}   delay={2}   />
        <EdgeScanLine axis="x" side="end"   color={copper} duration={6}   delay={4}   />
        <EdgeScanLine axis="y" side="start" color={green}  duration={7}   delay={1}   />
        <EdgeScanLine axis="y" side="end"   color={copper} duration={5.5} delay={3.5} />

        {/* ── Corner brackets ── */}
        <CornerBracket position="tl" size={140} color={green}  delay={0.2} />
        <CornerBracket position="tr" size={140} color={copper} delay={0.5} />
        <CornerBracket position="bl" size={140} color={copper} delay={0.8} />
        <CornerBracket position="br" size={140} color={green}  delay={1.1} />

        {/* ── Vignette so content stays readable ── */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, var(--enclosure) 100%)',
          }}
        />
      </motion.div>
    </div>
  );
}
