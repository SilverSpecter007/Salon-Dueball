import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import ServicesPreview from '@/components/sections/ServicesPreview'
import AboutSection from '@/components/sections/AboutSection'
import TeamPreview from '@/components/sections/TeamPreview'
import GalleryPreview from '@/components/sections/GalleryPreview'
import BrandsSection from '@/components/sections/BrandsSection'
import ContactSection from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Salon Dueball – Dein Friseur in Hollenstedt',
  description: 'Salon Dueball in Hollenstedt – dein Friseur mit Leib & Seele. Carecut, Browlifting, Haarverlängerung, K-Scan und mehr. Jetzt online Termin buchen.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <AboutSection />
      <TeamPreview />
      <GalleryPreview />
      <BrandsSection />
      <ContactSection />
    </>
  )
}
