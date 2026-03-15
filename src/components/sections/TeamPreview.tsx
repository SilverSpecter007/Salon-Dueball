import Image from 'next/image'
import Link from 'next/link'

const teamMembers = [
  {
    name: 'Annika Dueball',
    role: 'Inhaberin & Meisterin',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=85&auto=format',
    specialty: 'Colorationen · Balayage',
  },
  {
    name: 'Bianca',
    role: 'Friseurmeisterin',
    image: 'https://images.unsplash.com/photo-1629094280669-34bfd53a3d4a?w=400&q=85&auto=format',
    specialty: 'Haarschnitte · Styling',
  },
  {
    name: 'Jasmin',
    role: 'Stylistin',
    image: 'https://images.unsplash.com/photo-1595956553066-fe24a8c33395?w=400&q=85&auto=format',
    specialty: 'Strähnentechniken',
  },
  {
    name: 'Canan',
    role: 'Coloristin',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=85&auto=format',
    specialty: 'Balayage · Ombré',
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
            Bianca, Jasmin, Canan, Jana, Netti, Annika, Lisa-Marie, Julian, Kathleen und Annette –
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
