import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Salon Dueball – Ihr Friseur in Hollenstedt',
    template: '%s | Salon Dueball',
  },
  description:
    'Salon Dueball in Hollenstedt – Balayage, Colorationen, Browlifting & Heiße Schere für Damen, Herren & Kids. Inhaberin Annika Dueball, Meisterin des Friseurhandwerks. Jetzt Termin buchen!',
  keywords: [
    'Friseur Hollenstedt',
    'Salon Dueball',
    'Balayage Hollenstedt',
    'Haarschnitt Hollenstedt',
    'Colorationen Hollenstedt',
    'Friseur Niedersachsen',
    'Annika Dueball',
  ],
  authors: [{ name: 'Salon Dueball' }],
  creator: 'Salon Dueball',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.friseur-hollenstedt.de',
    siteName: 'Salon Dueball',
    title: 'Salon Dueball – Ihr Friseur in Hollenstedt',
    description:
      'Balayage, Colorationen, Browlifting & mehr – mit Herz & Know-how seit 2013.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-salon-cream text-salon-dark antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
