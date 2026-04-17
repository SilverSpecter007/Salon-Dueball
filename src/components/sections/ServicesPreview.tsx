import Link from 'next/link'

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Carecut',
    description: 'Innovatives Haarpflege-System, das Schneiden und Pflegen vereint – für gesundes, glänzendes Haar.',
    detail: 'Haargesundheit · Pflege · Glanz',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
      </svg>
    ),
    title: 'Browlifting',
    description: 'Augenbrauen semi-permanent formen, laminieren und färben – für einen ausdrucksstarken Blick.',
    detail: 'Laminierung · Lifting · Tinting',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Haarverlängerung',
    description: 'Mehr Länge, Fülle und Volumen durch hochwertige Tressen und Extensions – für traumhaft schönes Haar.',
    detail: 'Tressen · Bondings · Haarverdichtung',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'K-Scan',
    description: 'Modernste Haaranalyse mit dem K-Scan – deine Kopfhaut und Haare genau untersucht für individuelle Pflege.',
    detail: 'Haaranalyse · Kopfhaut · Beratung',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
    title: 'Haarschnitt',
    description: 'Präzise Schnitte für Damen, Herren und Kinder – individuell auf deinen Typ abgestimmt.',
    detail: 'Damen · Herren · Kids',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Colorationen',
    description: 'Strahlendes Blond, tiefes Braun oder kühles Asch – Farbe, die zu dir passt. Balayage, Strähnchen und mehr.',
    detail: 'Balayage · Vollcoloration · Strähnchen',
  },
]

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-salon-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Was wir für dich tun</p>
          <h2 className="font-serif text-4xl md:text-5xl text-salon-dark mb-4">Unsere Leistungen</h2>
          <span className="divider-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 bg-white hover:bg-salon-dark transition-all duration-500 cursor-default"
            >
              <div className="text-salon-gold mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">
                {s.icon}
              </div>
              <h3 className="font-serif text-xl text-salon-dark group-hover:text-white mb-3 transition-colors duration-300">
                {s.title}
              </h3>
              <p className="text-salon-gray text-sm leading-relaxed group-hover:text-white/70 mb-4 transition-colors duration-300">
                {s.description}
              </p>
              <span className="text-xs tracking-wider text-salon-gold/80 group-hover:text-salon-gold uppercase">
                {s.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/preisliste"
            className="inline-flex items-center gap-2 border border-salon-dark text-salon-dark hover:bg-salon-dark hover:text-white px-8 py-4 text-sm tracking-wide transition-all duration-300"
          >
            Alle Leistungen &amp; Preise
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
