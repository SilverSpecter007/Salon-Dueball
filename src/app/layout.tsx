import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import MobileNav from '@/components/layout/MobileNav'

export const metadata: Metadata = {
  title: {
    default: 'Velopit – Bike Wartung & Pflege',
    template: '%s | Velopit',
  },
  description:
    'Velopit – Dein digitales Scheckheft fuer Fahrrad-Wartung, Komponenten-Tracking und Setup-Verwaltung.',
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
      <body className="bg-velo-dark text-velo-text antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 md:ml-64 pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}
