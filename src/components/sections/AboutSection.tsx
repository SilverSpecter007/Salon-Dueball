import Image from 'next/image'
import Link from 'next/link'

export default function AboutSection() {
  return (
    <section className="section-padding bg-salon-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85&auto=format"
                alt="Salon Dueball – Friseurin bei der Arbeit"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-salon-dark text-white p-6 shadow-xl w-40 text-center">
              <span className="font-serif text-4xl text-salon-gold block">12+</span>
              <span className="text-xs tracking-widest uppercase text-white/60 mt-1 block">Jahre<br/>Erfahrung</span>
            </div>
          </div>

          {/* Text */}
          <div className="lg:pl-8">
            <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Über uns</p>
            <h2 className="font-serif text-4xl md:text-5xl text-salon-dark leading-tight mb-6">
              Wo Handwerk<br />auf Leidenschaft trifft
            </h2>
            <span className="divider-gold-left mb-6" />
            <p className="text-salon-gray leading-relaxed mb-5">
              Seit 2013 führt <strong className="text-salon-dark font-medium">Annika Dueball</strong>,
              Inhaberin und Meisterin des Friseurhandwerks, den Salon Dueball in Hollenstedt.
              Was als Übernahme des traditionsreichen Friseurgeschäfts „Christina Aldag"
              begann, hat sich zu einem modernen Wohlfühlsalon entwickelt.
            </p>
            <p className="text-salon-gray leading-relaxed mb-5">
              Nach der kompletten Renovierung im Sommer 2023 erstrahlt der Salon in neuem Glanz –
              und das Team ist mit noch mehr Begeisterung dabei. Kreativität, Fachwissen und
              herzliche Atmosphäre zeichnen jeden Besuch aus.
            </p>
            <p className="text-salon-gray leading-relaxed mb-8">
              Dass Stammkunden sogar regelmäßig aus Hamburg anreisen, ist das schönste
              Kompliment, das Annika und ihr Team bekommen können.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: '2013', label: 'Gegründet' },
                { value: '10+', label: 'Teammitglieder' },
                { value: '2023', label: 'Renoviert' },
                { value: '100%', label: 'Leidenschaft' },
              ].map(({ value, label }) => (
                <div key={label} className="border-l-2 border-salon-gold pl-4">
                  <span className="font-serif text-2xl text-salon-dark block">{value}</span>
                  <span className="text-xs text-salon-gray tracking-wide">{label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-8 py-4 text-sm tracking-wide transition-all duration-300"
            >
              Unser Team kennenlernen
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
