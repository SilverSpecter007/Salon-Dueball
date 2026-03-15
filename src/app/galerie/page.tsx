import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Galerie',
  description: 'Galerie von Salon Dueball in Hollenstedt – Haarschnitte, Colorationen, Balayage und Styling-Kreationen.',
}

const images = [
  {
    src: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80&auto=format',
    alt: 'Balayage Coloration – natürliche Farbverläufe',
    category: 'Coloration',
  },
  {
    src: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=800&q=80&auto=format',
    alt: 'Moderner Damenhaarschnitt',
    category: 'Schnitte',
  },
  {
    src: 'https://images.unsplash.com/photo-1605497787639-4c2b56efac8f?w=800&q=80&auto=format',
    alt: 'Haare waschen – entspannte Atmosphäre',
    category: 'Salon',
  },
  {
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80&auto=format',
    alt: 'Strähnchen Technik mit Folie',
    category: 'Coloration',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format',
    alt: 'Professionelles Styling',
    category: 'Styling',
  },
  {
    src: 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=80&auto=format',
    alt: 'Coloration – warme Töne',
    category: 'Coloration',
  },
  {
    src: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80&auto=format',
    alt: 'Herrenhaarschnitt klassisch',
    category: 'Schnitte',
  },
  {
    src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80&auto=format',
    alt: 'Hochsteckfrisur elegant',
    category: 'Styling',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80&auto=format',
    alt: 'Haarpflege Treatment',
    category: 'Pflege',
  },
  {
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80&auto=format',
    alt: 'Föhnen und Stylen',
    category: 'Styling',
  },
  {
    src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&q=80&auto=format',
    alt: 'Balayage – helle Strähnen',
    category: 'Coloration',
  },
  {
    src: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fb6b8?w=800&q=80&auto=format',
    alt: 'Moderner Langhaarschnitt',
    category: 'Schnitte',
  },
]

const categories = ['Alle', 'Coloration', 'Schnitte', 'Styling', 'Pflege', 'Salon']

export default function GaleriePage() {
  return (
    <>
      {/* Page Hero */}
      <div className="bg-salon-dark pt-32 pb-16 text-center">
        <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Unsere Arbeit</p>
        <h1 className="font-serif text-5xl text-white mb-4">Galerie</h1>
        <div className="divider-gold" />
        <p className="text-white/60 mt-6 max-w-lg mx-auto px-6">
          Lassen Sie sich von unseren Kreationen inspirieren –
          von natürlichen Alltagslooks bis zu aufwändigen Stylings.
        </p>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-6xl mx-auto px-6">
          {/* Filter categories (static display) */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 text-xs tracking-wide cursor-default transition-colors ${
                  cat === 'Alle'
                    ? 'bg-salon-dark text-white'
                    : 'bg-white text-salon-gray border border-salon-gray-light hover:border-salon-gold hover:text-salon-gold'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden break-inside-avoid group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white text-sm">{img.alt}</span>
                  <span className="text-salon-gold text-xs tracking-widest uppercase mt-1">{img.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div className="mt-16 text-center bg-salon-warm p-12">
            <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Mehr entdecken</p>
            <h3 className="font-serif text-3xl text-salon-dark mb-4">
              Folgen Sie uns auf Instagram
            </h3>
            <p className="text-salon-gray mb-8 max-w-md mx-auto">
              Für die neuesten Looks, Farbtrends und Einblicke in den Salon-Alltag.
            </p>
            <a
              href="https://www.instagram.com/salon_dueball_hollenstedt/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-8 py-4 text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @salon_dueball_hollenstedt
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
