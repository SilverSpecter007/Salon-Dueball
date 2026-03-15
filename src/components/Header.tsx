'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/leistungen',  label: 'Leistungen' },
  { href: '/team',        label: 'Team' },
  { href: '/galerie',     label: 'Galerie' },
  { href: '/kontakt',     label: 'Kontakt' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHome || menuOpen
          ? 'bg-salon-cream/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className={`font-serif text-xl font-semibold tracking-wide transition-colors ${
              isScrolled || !isHome || menuOpen
                ? 'text-salon-dark'
                : 'text-white'
            }`}
          >
            Salon Dueball
          </span>
          <span
            className={`text-xs tracking-widest uppercase transition-colors ${
              isScrolled || !isHome || menuOpen
                ? 'text-salon-gold'
                : 'text-salon-gold-light'
            }`}
          >
            Hollenstedt
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-wide transition-all duration-300 relative
                  after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-salon-gold
                  after:transition-all after:duration-300
                  ${pathname === link.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                  ${
                    isScrolled || !isHome || menuOpen
                      ? 'text-salon-dark hover:text-salon-gold'
                      : 'text-white/90 hover:text-white'
                  }
                  ${pathname === link.href ? (isScrolled || !isHome ? 'text-salon-gold' : 'text-white') : ''}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://connect.shore.com/bookings/friseur-christina-aldag/services?locale=de"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-salon-gold hover:bg-salon-gold-light text-white text-sm px-5 py-2.5 transition-colors duration-300"
        >
          Termin buchen
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 ${
            isScrolled || !isHome || menuOpen ? 'text-salon-dark' : 'text-white'
          }`}
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-salon-cream/98 backdrop-blur-sm overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 border-t border-salon-gray-light' : 'max-h-0'
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block py-2 text-base tracking-wide border-b border-salon-gray-light/50 ${
                  pathname === link.href
                    ? 'text-salon-gold font-medium'
                    : 'text-salon-dark hover:text-salon-gold'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="https://connect.shore.com/bookings/friseur-christina-aldag/services?locale=de"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-salon-gold text-white py-3 text-sm tracking-wide"
            >
              Termin buchen
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
