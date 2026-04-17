import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Team',
  description: 'Das Team von Salon Dueball in Hollenstedt – Annika, Julian, Tanja, Bianca, Kathleen, Susan und Kim.',
}

const team = [
  {
    name: 'Annika Dueball',
    role: 'Inhaberin & Meisterin',
    bio: 'Seit 2013 führt Annika Dueball, Meisterin des Friseurhandwerks, den Salon mit Leidenschaft und Fachkenntnis. Sie übernahm das traditionsreiche Friseurgeschäft „Christina Aldag" und hat es zu einem modernen Wohlfühlsalon entwickelt.',
    specialties: ['Colorationen', 'Balayage', 'Haarschnitte', 'Hochsteckfrisuren'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500&q=85&auto=format',
    featured: true,
  },
  {
    name: 'Julian',
    role: 'Stylist',
    bio: 'Julian ist unser Spezialist für Herrenhaarschnitte und Bartpflege – präzise, modern und immer mit dem richtigen Feel für aktuelle Trends.',
    specialties: ['Herrenschnitte', 'Bartpflege', 'Undercut'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=85&auto=format',
  },
  {
    name: 'Tanja',
    role: 'Stylistin',
    bio: 'Tanja begeistert mit einem guten Gespür für Schnitte und Styling – immer einfühlsam und mit viel Herzlichkeit.',
    specialties: ['Haarschnitte', 'Styling', 'Föhnen'],
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&q=85&auto=format',
  },
  {
    name: 'Bianca',
    role: 'Friseurmeisterin',
    bio: 'Bianca ist ein erfahrenes Mitglied des Teams und begeistert mit präzisen Schnitten und wunderschönen Colorationen.',
    specialties: ['Haarschnitte', 'Colorationen', 'Balayage'],
    image: 'https://images.unsplash.com/photo-1629094280669-34bfd53a3d4a?w=500&q=85&auto=format',
  },
  {
    name: 'Kathleen',
    role: 'Stylistin',
    bio: 'Kathleen versteht es, jeden Kunden individuell zu beraten und das Beste aus dem Haar herauszuholen.',
    specialties: ['Colorationen', 'Haarschnitte', 'Beratung'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=85&auto=format',
  },
  {
    name: 'Susan',
    role: 'Stylistin',
    bio: 'Susan ist Expertin für moderne Farbtechniken und bringt kreative Ideen in jeden Kundenwunsch ein.',
    specialties: ['Strähnentechniken', 'Colorationen', 'Styling'],
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=85&auto=format',
  },
  {
    name: 'Kim',
    role: 'Stylistin',
    bio: 'Kim bringt frischen Wind ins Team – mit einem Auge für Trends und einer Leidenschaft für Browlifting und Haarpflege.',
    specialties: ['Browlifting', 'Haarpflege', 'Haarschnitte'],
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=85&auto=format',
  },
]

export default function TeamPage() {
  const [featured, ...rest] = team

  return (
    <>
      {/* Page Hero */}
      <div className="bg-salon-warm pt-32 pb-16 text-center">
        <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Menschen & Leidenschaft</p>
        <h1 className="font-serif text-5xl text-salon-dark mb-4">Unser Team</h1>
        <div className="divider-gold" />
        <p className="text-salon-gray mt-6 max-w-lg mx-auto px-6">
          7 Fachkräfte, ein Ziel: dein perfekter Look. Wir sind eine echte Gemeinschaft –
          verbunden durch Kreativität und die Liebe zum Friseurhandwerk.
        </p>
      </div>

      <section className="section-padding bg-salon-cream">
        <div className="max-w-6xl mx-auto px-6">
          {/* Featured: Annika */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-salon-gray-light">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden max-w-sm mx-auto lg:mx-0">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 lg:right-0 bg-salon-gold text-white px-6 py-3">
                <span className="text-xs tracking-widest uppercase">Inhaberin</span>
              </div>
            </div>
            <div>
              <p className="text-salon-gold text-xs tracking-[0.3em] uppercase mb-4">Gründerin & Meisterin</p>
              <h2 className="font-serif text-4xl text-salon-dark mb-4">{featured.name}</h2>
              <span className="divider-gold-left mb-6" />
              <p className="text-salon-gray leading-relaxed mb-6">{featured.bio}</p>
              <div className="flex flex-wrap gap-2">
                {featured.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-xs border border-salon-gold text-salon-gold px-3 py-1 tracking-wide"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rest of the team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {rest.map((member) => (
              <div key={member.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-serif text-xl text-salon-dark">{member.name}</h3>
                <p className="text-salon-gold text-xs tracking-wide uppercase mt-1 mb-3">{member.role}</p>
                <p className="text-salon-gray text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-salon-warm text-salon-gray px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <p className="font-serif text-2xl text-salon-dark mb-2">Bereit für deinen neuen Look?</p>
            <p className="text-salon-gray mb-8">Wir freuen uns auf deinen Besuch.</p>
            <a
              href="https://connect.shore.com/bookings/salon-dueball/services?locale=de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white px-10 py-4 text-sm tracking-wide transition-all duration-300"
            >
              Jetzt Termin buchen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
