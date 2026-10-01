import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Cable, Home, Speaker } from 'lucide-react';

const projects = [
  {
    number: '01',
    category: 'HOME THEATRE',
    title: 'A room built around the sound',
    description:
      'We help turn a living room into a focused listening space, pairing the right speakers, receiver, and low-end response for a clear, immersive setup.',
    image: '/images/Home theater/klipsch-reference-5-2-home-theater-system-620.jpg',
    imageAlt: 'Klipsch home theatre speaker system',
    href: '/home-theatre',
    icon: Speaker,
  },
  {
    number: '02',
    category: 'ELECTRICAL INSTALLATION',
    title: 'The infrastructure behind the finish',
    description:
      'From dependable cable runs to the final connection, we help homeowners and installers choose practical electrical hardware that is ready for daily use.',
    image: '/images/anchor wires and cables/images (2).jfif',
    imageAlt: 'Electrical wires and cables',
    href: '/shop?category=wires-cables',
    icon: Cable,
  },
  {
    number: '03',
    category: 'SMART HOME',
    title: 'Useful technology, quietly fitted',
    description:
      'We select smart lighting, locks, and home electronics that make a space easier to live in without making the technology the whole story.',
    image: '/images/luker fans,lights,smart locker/images (12).jfif',
    imageAlt: 'Smart home lighting and electronics',
    href: '/shop?category=smart-home',
    icon: Home,
  },
];

export const metadata = {
  title: 'Our Work | VIGNESH Electrical Power House',
  description: 'See the home theatre, electrical, and smart-home projects our products help bring together.',
};

export default function OurWorkPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <section className="max-w-5xl mb-20 md:mb-28">
        <p className="font-mono text-xs tracking-[0.3em] text-signal uppercase mb-6">[ FIELD NOTES / 2026 ]</p>
        <h1 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tight text-cable-white max-w-4xl">
          Our work, in the real world.
        </h1>
        <p className="font-mono text-base md:text-lg leading-relaxed text-aluminum/80 max-w-2xl mt-8">
          A good installation is more than a list of products. It is a room that sounds right, wiring that stays dependable, and technology that feels natural to use. Here are a few of the spaces and systems we help put together.
        </p>
      </section>

      <section aria-labelledby="projects-heading" className="space-y-20 md:space-y-28">
        <div className="flex items-end justify-between border-b border-aluminum/15 pb-5">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] text-aluminum/50 uppercase mb-2">[ SELECTED PROJECTS ]</p>
            <h2 id="projects-heading" className="font-display text-3xl md:text-4xl font-bold uppercase text-cable-white">Built with intention</h2>
          </div>
          <span className="hidden md:block font-mono text-xs text-aluminum/50">03 CASE NOTES</span>
        </div>

        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <article key={project.number} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <div className={`relative aspect-[4/3] overflow-hidden border border-aluminum/15 bg-black/30 lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-5 bottom-4 font-mono text-xs tracking-[0.25em] text-white/80">PROJECT {project.number}</span>
              </div>

              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 text-signal mb-5">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase">{project.category}</span>
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold uppercase leading-tight text-cable-white mb-5">{project.title}</h3>
                <p className="font-mono text-sm leading-7 text-aluminum/75 mb-7">{project.description}</p>
                <Link href={project.href} className="inline-flex items-center gap-2 border-b border-signal pb-2 font-mono text-xs tracking-[0.16em] text-signal uppercase hover:text-white hover:border-white transition-colors">
                  Explore the range <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-24 md:mt-32 border-y border-aluminum/15 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-signal uppercase mb-3">[ START A PROJECT ]</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-cable-white">Tell us what you are building.</h2>
          <p className="font-mono text-sm text-aluminum/70 mt-4 max-w-xl">Bring us a room, a plan, or simply a problem. We will help you find the right components and a sensible next step.</p>
        </div>
        <Link href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 bg-signal px-6 py-4 font-mono text-xs font-bold tracking-[0.16em] text-enclosure uppercase hover:bg-white transition-colors">
          Talk to our team <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
