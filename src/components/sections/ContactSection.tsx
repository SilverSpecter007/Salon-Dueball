const hours = [
  { day: 'Montag',     hours: 'Geschlossen', closed: true },
  { day: 'Dienstag',   hours: '08:00 – 18:00' },
  { day: 'Mittwoch',   hours: '09:00 – 19:00' },
  { day: 'Donnerstag', hours: '08:00 – 18:00' },
  { day: 'Freitag',    hours: '08:00 – 18:00' },
  { day: 'Samstag',    hours: '08:00 – 13:00' },
]

export default function ContactSection() {
  return (
    <section className="section-padding bg-salon-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Besuchen Sie uns</p>
          <h2 className="font-serif text-4xl md:text-5xl text-salon-dark mb-4">Kontakt & Anfahrt</h2>
          <span className="divider-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Info */}
          <div className="space-y-10">
            {/* Address */}
            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-salon-gold mb-4">Adresse</h3>
              <address className="not-italic text-salon-dark">
                <p className="font-medium text-lg">Salon Dueball</p>
                <p className="text-salon-gray mt-1">Jahnstraße 3</p>
                <p className="text-salon-gray">21279 Hollenstedt</p>
              </address>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-salon-gold mb-4">Kontakt</h3>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+494165 8833" className="flex items-center gap-3 text-salon-dark hover:text-salon-gold transition-colors group">
                    <span className="w-8 h-8 bg-salon-gold/10 group-hover:bg-salon-gold/20 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <span>04165 8833</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+494165 8898" className="flex items-center gap-3 text-salon-gray hover:text-salon-gold transition-colors group">
                    <span className="w-8 h-8 bg-salon-gray/5 flex items-center justify-center">
                      <svg className="w-4 h-4 text-salon-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </span>
                    <span>Fax: 04165 8898</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:salon.dueball@gmail.com" className="flex items-center gap-3 text-salon-dark hover:text-salon-gold transition-colors group">
                    <span className="w-8 h-8 bg-salon-gold/10 group-hover:bg-salon-gold/20 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-salon-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <span>salon.dueball@gmail.com</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <h3 className="text-xs tracking-[0.25em] uppercase text-salon-gold mb-4">Öffnungszeiten</h3>
              <ul className="space-y-2">
                {hours.map(({ day, hours: h, closed }) => (
                  <li key={day} className="flex justify-between items-center py-2 border-b border-salon-gray-light last:border-0">
                    <span className={`text-sm ${closed ? 'text-salon-gray/50' : 'text-salon-dark font-medium'}`}>{day}</span>
                    <span className={`text-sm ${closed ? 'text-salon-gray/40' : 'text-salon-gray'}`}>{h}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-salon-gray/70 mt-3 italic">
                * Terminbuchung bevorzugt – mind. 24h Vorabsage bei Absagen
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://connect.shore.com/bookings/friseur-christina-aldag/services?locale=de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-8 py-4 text-sm tracking-wide transition-all duration-300 w-full justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Termin online buchen
            </a>
          </div>

          {/* Right: Map */}
          <div className="relative">
            <div className="w-full h-full min-h-[450px] bg-salon-gray-light overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2384.5!2d9.745!3d53.373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zSmFobnN0cmHDn2UgMywgMjEyNzkgSG9sbGVuc3RlZHQ!5e0!3m2!1sde!2sde!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Salon Dueball Standort – Jahnstraße 3, Hollenstedt"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>

            {/* Map overlay card */}
            <div className="absolute bottom-6 left-6 bg-white shadow-lg p-4 max-w-[220px]">
              <p className="font-serif text-sm text-salon-dark font-medium">Salon Dueball</p>
              <p className="text-xs text-salon-gray mt-1">Jahnstraße 3 · 21279 Hollenstedt</p>
              <a
                href="https://maps.google.com/?q=Jahnstra%C3%9Fe+3,+21279+Hollenstedt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-salon-gold hover:underline mt-2 block"
              >
                In Google Maps öffnen →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
