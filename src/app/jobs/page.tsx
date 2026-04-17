import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jobs',
  description: 'Offene Stellen und Ausbildungsplätze bei Salon Dueball in Hollenstedt – werde Teil unseres Teams.',
}

export default function JobsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="bg-salon-warm pt-32 pb-16 text-center">
        <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Werde Teil unseres Teams</p>
        <h1 className="font-serif text-5xl text-salon-dark mb-4">Jobs</h1>
        <div className="divider-gold" />
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-3xl mx-auto px-6">
          {/* Intro */}
          <div className="text-center mb-16">
            <p className="text-salon-gray leading-relaxed text-lg">
              Du liebst Haare, arbeitest gerne mit Menschen und bringst Herzblut in deinen Job?
              Dann bist du bei uns genau richtig.
            </p>
          </div>

          {/* Why us */}
          <div className="bg-white p-10 mb-8">
            <h2 className="font-serif text-2xl text-salon-dark mb-6">Warum Salon Dueball?</h2>
            <ul className="space-y-4">
              {[
                'Familiäres, wertschätzendes Team mit echter Gemeinschaft',
                'Moderner, frisch renovierter Salon in ruhiger Lage',
                'Weiterbildungen und Schulungen – wir investieren in dich',
                'Faire Bezahlung und geregelte Arbeitszeiten',
                'Premium-Produkte von Kérastase und L\'Oréal Professionnel',
                'Kurze Entscheidungswege und direkte Kommunikation mit der Inhaberin',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-salon-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-salon-gray text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Open positions */}
          <div className="bg-salon-dark text-white p-10 mb-8">
            <h2 className="font-serif text-2xl mb-6">Offene Stellen</h2>
            <div className="space-y-6">
              <div className="border-l-2 border-salon-gold pl-6">
                <h3 className="font-medium text-lg mb-1">Friseur / Friseurin (m/w/d)</h3>
                <p className="text-white/60 text-sm mb-2">Vollzeit oder Teilzeit · Hollenstedt</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Wir suchen eine/n leidenschaftliche/n Friseur/in mit abgeschlossener Ausbildung
                  und Freude am Umgang mit Kunden.
                </p>
              </div>
              <div className="border-l-2 border-salon-gold/40 pl-6">
                <h3 className="font-medium text-lg mb-1">Auszubildende/r Friseur/in (m/w/d)</h3>
                <p className="text-white/60 text-sm mb-2">Ausbildung · Hollenstedt</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  Du möchtest Friseur/in werden? Wir bieten eine fundierte, herzliche Ausbildung
                  in einem modernen Salon mit erfahrenem Team.
                </p>
              </div>
            </div>
          </div>

          {/* Application CTA */}
          <div className="bg-salon-warm p-10 text-center">
            <h2 className="font-serif text-2xl text-salon-dark mb-3">Interesse?</h2>
            <p className="text-salon-gray text-sm leading-relaxed mb-8">
              Schick uns einfach deine Bewerbung per E-Mail oder ruf uns direkt an.
              Wir freuen uns, von dir zu hören!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:salon.dueball@gmail.com?subject=Bewerbung%20Salon%20Dueball"
                className="inline-flex items-center justify-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-8 py-4 text-sm tracking-wide transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Per E-Mail bewerben
              </a>
              <a
                href="tel:+4941658833"
                className="inline-flex items-center justify-center gap-2 border border-salon-dark text-salon-dark hover:bg-salon-dark hover:text-white px-8 py-4 text-sm tracking-wide transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                04165 8833 anrufen
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
