import Link from 'next/link';
import { STORE_CONFIG, CATEGORIES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="border-t border-aluminum/15 bg-enclosure/95 backdrop-blur-2xl mt-20 pb-8 pt-16">
      <div className="container mx-auto px-4">
        {/* PCB Trace decorative line */}
        <div className="w-full h-[1px] bg-aluminum/10 mb-12 relative">
          <div className="absolute left-0 top-0 w-24 h-[1px] bg-signal/50" />
          <div className="absolute left-24 -top-1 w-2 h-2 rounded-full border border-signal/50 bg-enclosure" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-display font-bold text-cable-white text-xl mb-4">
              {STORE_CONFIG.name}
            </h3>
            <p className="font-mono text-xs text-aluminum/60 max-w-sm mb-6 leading-relaxed">
              A hardware and electrical store for switches, cables, home theatre, and everyday electronic needs.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse-fast"></span>
              <span className="font-mono text-[9px] text-signal tracking-widest uppercase">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Links: Categories */}
          <div>
            <h4 className="font-mono text-[10px] text-aluminum/40 tracking-widest uppercase mb-4">
              [ COMPONENTS ]
            </h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    className="font-mono text-xs text-aluminum/80 hover:text-signal transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links: Company */}
          <div>
            <h4 className="font-mono text-[10px] text-aluminum/40 tracking-widest uppercase mb-4">
              [ PROTOCOLS ]
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Shipping Specs', 'Return Policy'].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="font-mono text-xs text-aluminum/80 hover:text-signal transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-mono text-[10px] text-aluminum/40 tracking-widest uppercase mb-4">
              [ TERMINAL ]
            </h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${STORE_CONFIG.email}`} className="font-mono text-xs text-aluminum/80 hover:text-signal transition-colors">
                  {STORE_CONFIG.email}
                </a>
              </li>
              <li>
                <p className="font-mono text-xs text-aluminum/80">
                  {STORE_CONFIG.phone}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-aluminum/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-aluminum/40">
            &copy; {new Date().getFullYear()} {STORE_CONFIG.name}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="font-mono text-[10px] text-aluminum/40 hover:text-signal">TERMS</Link>
            <Link href="#" className="font-mono text-[10px] text-aluminum/40 hover:text-signal">PRIVACY</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
