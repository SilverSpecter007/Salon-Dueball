import Image from 'next/image'
import Link from 'next/link'

const BASE = 'https://friseur-hollenstedt.de/wp-content/uploads'

const galleryImages = [
  {
    src: `${BASE}/2025/01/IMG_0636-768x1024.jpeg`,
    alt: 'Haarstyling Salon Dueball',
    span: 'row-span-2',
  },
  {
    src: `${BASE}/2025/01/IMG_0637-768x1024.jpeg`,
    alt: 'Colorationen & Balayage',
    span: '',
  },
  {
    src: `${BASE}/2025/01/IMG_0638-768x1024.jpeg`,
    alt: 'Haarschnitt & Styling',
    span: '',
  },
  {
    src: `${BASE}/2025/01/IMG_0650-768x1024.jpeg`,
    alt: 'Strähnchen Technik',
    span: 'col-span-2',
  },
]

export default function GalleryPreview() {
  return (
    <section className="section-padding bg-salon-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Unsere Arbeit</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Galerie</h2>
          <span className="divider-gold" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-light tracking-wide">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 border border-white/40 text-white hover:border-salon-gold hover:text-salon-gold px-8 py-4 text-sm tracking-wide transition-all duration-300"
          >
            Mehr Bilder ansehen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
