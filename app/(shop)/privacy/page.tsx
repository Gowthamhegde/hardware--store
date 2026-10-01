import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy | VIGNESH Electrical Power House',
  description: 'How VIGNESH Electrical Power House handles information from store visitors and customers.',
};

const sections = [
  {
    title: 'Information we receive',
    body: 'When you browse, contact us, or place an order, we may receive details such as your name, email address, phone number, delivery address, order details, and messages you choose to send us.',
  },
  {
    title: 'How we use it',
    body: 'We use this information to process orders, arrange delivery, answer questions, provide support, improve the store, and communicate about an order or service you requested. We do not sell customer information.',
  },
  {
    title: 'Payments and service providers',
    body: 'Payment details are handled by the payment provider used at checkout. We may share the minimum information needed with delivery, payment, hosting, and technical service providers so they can perform services for the store.',
  },
  {
    title: 'Cookies and local storage',
    body: 'The store may use essential browser storage to keep cart, theme, and session preferences working. Your browser may also provide basic technical information needed to deliver and protect the website.',
  },
  {
    title: 'Your choices',
    body: `You can ask what personal information we hold about you, request a correction, or ask us about deletion where applicable. Contact ${STORE_CONFIG.email} with your request and enough order detail for us to locate it.`,
  },
  {
    title: 'Contact and updates',
    body: `For privacy questions, contact ${STORE_CONFIG.email}. We may update this policy when our store or legal requirements change, and the latest version will always be published on this page.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-aluminum hover:text-signal uppercase transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Return to store
        </Link>
        <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-5">[ DATA PROTOCOL ]</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase text-cable-white mb-6">Privacy policy</h1>
        <p className="font-mono text-sm leading-7 text-aluminum/75 mb-14">A plain-language summary of how {STORE_CONFIG.name} handles information when you use this store.</p>

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
