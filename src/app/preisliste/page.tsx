import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const BASE = 'https://friseur-hollenstedt.de/wp-content/uploads'

export const metadata: Metadata = {
  title: 'Preisliste',
  description: 'Alle Leistungen und Preise von Salon Dueball in Hollenstedt – Haarschnitte, Colorationen, Balayage, Browlifting, Carecut, K-Scan, Haarverlängerung und mehr.',
}

const categories = [
  {
    category: 'Damen',
    items: [
      { service: 'Waschen, Schneiden & Föhnen (kurz)',  price: '64,00 €' },
      { service: 'Waschen, Schneiden & Föhnen (mittel)', price: '69,00 €' },
      { service: 'Waschen, Schneiden & Föhnen (lang)',   price: '74,00 €' },
      { service: 'Schneiden (ohne Waschen)',             price: 'ab 45,00 €' },
      { service: 'Waschen & Föhnen (kurz)',              price: 'ab 32,00 €' },
      { service: 'Waschen & Föhnen (lang)',              price: 'ab 42,00 €' },
    ],
  },
  {
    category: 'Herren',
    items: [
      { service: 'Herrenhaarschnitt inkl. Waschen',     price: 'ab 38,00 €' },
      { service: 'Herrenhaarschnitt ohne Waschen',      price: 'ab 30,00 €' },
      { service: 'Maschinenschnitt',                    price: 'ab 22,00 €' },
      { service: 'Bartpflege',                          price: 'ab 15,00 €' },
    ],
  },
  {
    category: 'Kids (bis 12 Jahre)',
    items: [
      { service: 'Kinderhaarschnitt',                   price: 'ab 22,00 €' },
      { service: 'Kinderhaarschnitt inkl. Waschen',     price: 'ab 27,00 €' },
    ],
  },
  {
    category: 'Colorationen',
    items: [
      { service: 'Ansatzcoloration',                    price: 'ab 55,00 €' },
      { service: 'Vollcoloration (kurz)',                price: 'ab 68,00 €' },
      { service: 'Vollcoloration (lang)',                price: 'ab 88,00 €' },
      { service: 'Tönungen',                            price: 'ab 42,00 €' },
    ],
  },
  {
    category: 'Balayage & Strähnchen',
    items: [
      { service: 'Balayage (kurz)',                     price: 'ab 85,00 €' },
      { service: 'Balayage (lang)',                     price: 'ab 120,00 €' },
      { service: 'Strähnchen (Folientechnik)',           price: 'ab 65,00 €' },
      { service: 'Schattenansatz',                      price: 'ab 52,00 €' },
      { service: 'Ombré / Grombré',                     price: 'ab 95,00 €' },
    ],
  },
  {
    category: 'Treatments & Pflege',
    items: [
      { service: 'Haarkur (kurz)',                      price: 'ab 18,00 €' },
      { service: 'Haarkur (lang)',                      price: 'ab 28,00 €' },
      { service: 'Heiße Schere',                        price: '+ 12,00 €' },
    ],
  },
  {
    category: 'Carecut',
    items: [
      { service: 'Carecut Behandlung',                  price: 'auf Anfrage' },
      { service: 'Carecut inkl. Schnitt & Styling',     price: 'auf Anfrage' },
    ],
  },
  {
    category: 'Browlifting',
    items: [
      { service: 'Brow Lamination / Lifting',           price: 'ab 55,00 €' },
      { service: 'Browlifting inkl. Tinting',           price: 'ab 65,00 €' },
      { service: 'Brow Tinting',                        price: 'ab 20,00 €' },
    ],
  },
  {
    category: 'Haarverlängerung & Haarverdichtung',
    items: [
      { service: 'Tressen / Extensions',                price: 'auf Anfrage' },
      { service: 'Bondings',                            price: 'auf Anfrage' },
      { service: 'Haarverdichtung',                     price: 'auf Anfrage' },
    ],
  },
  {
    category: 'K-Scan & Beratung',
    items: [
      { service: 'K-Scan Haaranalyse',                  price: 'auf Anfrage' },
      { service: 'Kopfhautberatung',                    price: 'auf Anfrage' },
    ],
  },
  {
    category: 'Nagelmodellage',
    items: [
      { service: 'Nagelmodellage',                      price: 'auf Anfrage' },
      { service: 'Gel-Nägel',                           price: 'auf Anfrage' },
    ],
  },
  {
    category: 'Hochsteckfrisuren',
    items: [
      { service: 'Hochsteckfrisur (einfach)',            price: 'ab 45,00 €' },
      { service: 'Hochsteckfrisur (aufwändig)',          price: 'ab 70,00 €' },
      { service: 'Brautfrisur inkl. Probe',              price: 'auf Anfrage' },
      { service: 'Flechtfrisur',                         price: 'ab 40,00 €' },
    ],
  },
]

export default function PreislistePage() {
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

      {/* Service highlights with real images */}
      <section className="py-16 bg-salon-warm border-b border-salon-gray-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: `${BASE}/2026/02/Haarschnitt-S.jpg`,  label: 'Haarschnitt' },
              { src: `${BASE}/2026/02/Balayage.jpg`,        label: 'Balayage' },
              { src: `${BASE}/2024/11/50x30cm-Browbar-2.png`, label: 'Browlifting' },
              { src: `${BASE}/2026/02/KER_KSCAN_2023_MODEL_CAMERA_E4110300_1X1-1.jpg`, label: 'K-Scan' },
            ].map(({ src, label }) => (
              <div key={label} className="relative aspect-square overflow-hidden group">
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white text-sm font-medium tracking-wide">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat) => (
              <div key={cat.category} className="bg-white p-8">
                <h2 className="font-serif text-xl text-salon-dark mb-6 pb-3 border-b border-salon-gray-light">
                  {cat.category}
                </h2>
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
              besondere Techniken erhöhen. Sprich uns gerne im Voraus an – wir beraten dich ehrlich.
              Rechnungsbeträge sind direkt nach Leistungserbringung fällig –
              per <strong>Bar, EC-Cash, Visa, Mastercard oder Gutschein</strong>.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-salon-gray mb-6">Wunschtermin? Wir freuen uns auf dich!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://connect.shore.com/bookings/salon-dueball/services?locale=de"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-10 py-4 text-sm tracking-wide transition-all duration-300"
              >
                Jetzt online Termin buchen
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 border border-salon-dark text-salon-dark hover:bg-salon-dark hover:text-white px-10 py-4 text-sm tracking-wide transition-all duration-300"
              >
                Kontakt & Anfahrt
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
