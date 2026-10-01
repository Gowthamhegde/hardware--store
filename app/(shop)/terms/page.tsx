import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Use | VIGNESH Electrical Power House',
  description: 'Terms for using the VIGNESH Electrical Power House online store.',
};

const sections = [
  {
    title: 'Using this store',
    body: 'Use this website for lawful shopping and product research. Product descriptions, images, prices, and availability may change as stock and supplier information are updated.',
  },
  {
    title: 'Orders and payment',
    body: 'An order is accepted only after we confirm availability and payment. We may contact you if an item is unavailable, incorrectly priced, or needs a delivery detail confirmed. Prices are shown in the currency displayed at checkout and applicable taxes or delivery charges are shown before payment.',
  },
  {
    title: 'Delivery and returns',
    body: 'Delivery timing depends on the destination, stock status, and carrier. Please inspect products when they arrive and contact us promptly about damage, missing items, or an incorrect product. Returns are handled according to the product and order conditions communicated at purchase.',
  },
  {
    title: 'Product information',
    body: 'Electrical products must be installed and used according to their ratings and the manufacturer instructions. When a job involves mains electricity, use a qualified professional. We are happy to help you choose components, but product guidance does not replace professional installation advice.',
  },
  {
    title: 'Contact and changes',
    body: `Questions about an order or these terms can be sent to ${STORE_CONFIG.email} or ${STORE_CONFIG.phone}. We may update these terms when our services or legal requirements change; the latest version will be published on this page.`,
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aluminum hover:text-signal uppercase transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Return to store
        </Link>
        <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-5">[ STORE PROTOCOL ]</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-cable-white mb-6">Terms of use</h1>
        <p className="font-mono text-sm leading-7 text-aluminum/75 mb-14">These terms explain the basic rules for using {STORE_CONFIG.name}&apos;s online store and placing an order.</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-aluminum/15 pt-6">
              <h2 className="font-display text-2xl font-bold uppercase text-cable-white mb-3">{section.title}</h2>
              <p className="font-mono text-sm leading-7 text-aluminum/80">{section.body}</p>
            </section>
          ))}
        </div>

        <p className="font-mono text-xs text-aluminum/50 mt-14">Last updated: October 1, 2026</p>
      </div>
    </div>
  );
}
