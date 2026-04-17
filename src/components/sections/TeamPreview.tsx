import Image from 'next/image'
import Link from 'next/link'

const BASE = 'https://friseur-hollenstedt.de/wp-content/uploads'

const teamMembers = [
  {
    name: 'Annika Dueball',
    role: 'Inhaberin & Meisterin',
    image: `${BASE}/2024/10/14584_0055SW.jpg`,
    specialty: 'Colorationen · Balayage',
  },
  {
    name: 'Julian',
    role: 'Stylist',
    image: `${BASE}/2024/10/14584_0070SW.jpg`,
    specialty: 'Herrenschnitte · Bartpflege',
  },
  {
    name: 'Tanja',
    role: 'Stylistin',
    image: `${BASE}/2024/10/14584_0045SW.jpg`,
    specialty: 'Haarschnitte · Styling',
  },
  {
    name: 'Bianca',
    role: 'Friseurmeisterin',
    image: `${BASE}/2024/10/14584_0036SW.jpg`,
    specialty: 'Haarschnitte · Colorationen',
  },
]

export default function TeamPreview() {
  return (
    <section className="section-padding bg-salon-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Unser Team</p>
          <h2 className="font-serif text-4xl md:text-5xl text-salon-dark mb-4">
            Mit Herzblut dabei
          </h2>
          <span className="divider-gold mb-6" />
          <p className="text-salon-gray max-w-lg mx-auto">
            Annika, Julian, Tanja, Bianca, Kathleen, Susan und Kim –
            unser Team vereint Kreativität und Fachwissen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="group overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center">
                <h3 className="font-serif text-lg text-salon-dark">{member.name}</h3>
                <p className="text-salon-gold text-xs tracking-wide uppercase mt-1">{member.role}</p>
                <p className="text-salon-gray text-xs mt-1">{member.specialty}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 border border-salon-dark text-salon-dark hover:bg-salon-dark hover:text-white px-8 py-4 text-sm tracking-wide transition-all duration-300"
          >
            Ganzes Team ansehen
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
