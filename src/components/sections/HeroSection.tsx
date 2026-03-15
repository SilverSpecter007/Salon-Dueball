import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85&auto=format"
          alt="Salon Dueball – moderner Friseursalon in Hollenstedt"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <p className="text-salon-gold-light text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Seit 2013 in Hollenstedt
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight mb-6 animate-fade-in-up">
          Ihr Friseur<br />mit Herz &amp; Know-how
        </h1>
        <div className="divider-gold mb-6" />
        <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 animate-fade-in-up">
          Balayage · Colorationen · Browlifting · Heiße Schere<br className="hidden md:block" />
          Für Damen, Herren &amp; Kids
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <a
            href="https://connect.shore.com/bookings/friseur-christina-aldag/services?locale=de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-8 py-4 text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-salon-gold/25"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Jetzt Termin buchen
          </a>
          <Link
            href="/leistungen"
            className="inline-flex items-center justify-center gap-2 border border-white/60 hover:border-white text-white hover:bg-white/10 px-8 py-4 text-sm tracking-wide transition-all duration-300"
          >
            Unsere Leistungen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-xs tracking-widest uppercase">Entdecken</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
