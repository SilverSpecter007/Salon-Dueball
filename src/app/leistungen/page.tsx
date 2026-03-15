import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Leistungen & Preise',
  description: 'Alle Leistungen und Preise von Salon Dueball in Hollenstedt – Haarschnitte, Colorationen, Balayage, Browlifting, Extensions und mehr.',
}

const categories = [
  {
    category: 'Damen',
    icon: '💁‍♀️',
    items: [
      { service: 'Haarschnitt inkl. Waschen & Föhnen',  price: 'ab 39 €' },
      { service: 'Haarschnitt inkl. Waschen (nur schneiden)', price: 'ab 29 €' },
      { service: 'Föhnen (kurz)',                        price: 'ab 20 €' },
      { service: 'Föhnen (lang)',                        price: 'ab 28 €' },
      { service: 'Waschen & Föhnen',                     price: 'ab 25 €' },
    ],
  },
  {
    category: 'Herren',
    icon: '💈',
    items: [
      { service: 'Herrenhaarschnitt inkl. Waschen',     price: 'ab 25 €' },
      { service: 'Herrenhaarschnitt ohne Waschen',      price: 'ab 20 €' },
      { service: 'Maschinenschnitt',                    price: 'ab 18 €' },
      { service: 'Bartpflege',                          price: 'ab 12 €' },
      { service: 'Haarschnitt & Bartpflege',            price: 'ab 32 €' },
    ],
  },
  {
    category: 'Kids',
    icon: '🧒',
    items: [
      { service: 'Kinderhaarschnitt (bis 12 J.)',       price: 'ab 18 €' },
      { service: 'Kinderhaarschnitt inkl. Waschen',     price: 'ab 22 €' },
    ],
  },
  {
    category: 'Colorationen',
    icon: '🎨',
    items: [
      { service: 'Ansatzcolorations (kurz)',            price: 'ab 42 €' },
      { service: 'Ansatzcoloration (mittel)',           price: 'ab 52 €' },
      { service: 'Vollcoloration (kurz)',               price: 'ab 55 €' },
      { service: 'Vollcoloration (lang)',               price: 'ab 75 €' },
      { service: 'Tönungen',                            price: 'ab 35 €' },
    ],
  },
  {
    category: 'Balayage & Strähnchen',
    icon: '✨',
    items: [
      { service: 'Balayage (kurz)',                     price: 'ab 75 €' },
      { service: 'Balayage (lang)',                     price: 'ab 110 €' },
      { service: 'Strähnchen (Folientechnik)',          price: 'ab 55 €' },
      { service: 'Schattenansatz',                      price: 'ab 45 €' },
      { service: 'Ombré / Grombré',                     price: 'ab 80 €' },
    ],
  },
  {
    category: 'Treatments & Pflege',
    icon: '🌿',
    items: [
      { service: 'Haarkur (kurz)',                      price: 'ab 15 €' },
      { service: 'Haarkur (lang)',                      price: 'ab 25 €' },
      { service: 'Olaplex Behandlung',                  price: 'ab 20 €' },
      { service: 'Heiße Schere',                        price: '+ 10 €' },
      { service: 'Extensions (Beratung erforderlich)',  price: 'auf Anfrage' },
    ],
  },
  {
    category: 'Browlifting',
    icon: '👁️',
    items: [
      { service: 'Browlifting / Brow Lamination',      price: 'ab 45 €' },
      { service: 'Browlifting inkl. Tinting',          price: 'ab 55 €' },
      { service: 'Brow Tinting',                       price: 'ab 18 €' },
    ],
  },
  {
    category: 'Hochsteckfrisuren',
    icon: '👑',
    items: [
      { service: 'Hochsteckfrisur (einfach)',          price: 'ab 40 €' },
      { service: 'Hochsteckfrisur (aufwändig)',        price: 'ab 65 €' },
      { service: 'Brautfrisur inkl. Probe',            price: 'auf Anfrage' },
      { service: 'Flechtfrisur',                       price: 'ab 35 €' },
    ],
  },
]

export default function LeistungenPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="bg-salon-dark pt-32 pb-16 text-center">
        <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Salon Dueball</p>
        <h1 className="font-serif text-5xl text-white mb-4">Leistungen & Preise</h1>
        <div className="divider-gold" />
        <p className="text-white/60 mt-6 max-w-lg mx-auto text-sm px-6">
          Alle Preise sind Mindestpreise inklusive gesetzlicher MwSt.
          Bei besonders langem oder dichtem Haar kann ein Mehraufwand entstehen.
        </p>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div key={cat.category} className="bg-white p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <h2 className="font-serif text-xl text-salon-dark">{cat.category}</h2>
                </div>
                <ul className="space-y-3">
                  {cat.items.map(({ service, price }) => (
                    <li key={service} className="flex justify-between items-start gap-4 py-2 border-b border-salon-gray-light last:border-0">
                      <span className="text-sm text-salon-gray flex-1">{service}</span>
                      <span className="text-sm font-medium text-salon-dark whitespace-nowrap">{price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Notice */}
          <div className="mt-12 p-6 border-l-4 border-salon-gold bg-salon-warm">
            <h3 className="font-medium text-salon-dark mb-2">Hinweis zu den Preisen</h3>
            <p className="text-sm text-salon-gray leading-relaxed">
              Die genannten Preise sind <strong>Mindestpreise</strong> und können sich durch Mehraufwand
              (z.B. besonders langes oder dickes Haar), spontanes Hinzubuchen weiterer Leistungen oder
              besondere Techniken erhöhen. Für eine genaue Preisauskunft sprechen Sie uns gerne an.
              Rechnungsbeträge sind direkt nach Leistungserbringung fällig –
              per <strong>Bar, EC-Cash, Visa, Mastercard oder Gutschein</strong>.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-salon-gray mb-6">Termin gewünscht? Wir freuen uns auf Sie!</p>
            <a
              href="https://connect.shore.com/bookings/friseur-christina-aldag/services?locale=de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-10 py-4 text-sm tracking-wide transition-all duration-300"
            >
              Jetzt online Termin buchen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
