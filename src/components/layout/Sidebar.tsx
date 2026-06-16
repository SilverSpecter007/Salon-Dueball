'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bike,
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bikes', label: 'Meine Bikes', icon: Bike },
  { href: '/scheckheft', label: 'Scheckheft', icon: BookOpen },
  { href: '/crew-chief', label: 'Crew Chief', icon: MessageCircle },
  { href: '/settings', label: 'Einstellungen', icon: Settings },
] as const

export default function Sidebar() {
  const pathname = usePathname()
  const hydrated = useHydration()
  const bikes = useStore((s) => s.bikes)
  const activeBikeId = useStore((s) => s.activeBikeId)
  const setActiveBike = useStore((s) => s.setActiveBike)

  const activeBike = bikes.find((b) => b.id === activeBikeId)

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-velo-border bg-velo-surface md:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5">
        <Bike className="h-7 w-7 text-velo-accent" />
        <span className="text-xl font-bold text-velo-text">Velopit</span>
      </div>

      {/* Active bike selector */}
      <div className="px-4 pb-4">
        <div className="relative">
          <select
            value={activeBikeId ?? ''}
            onChange={(e) => setActiveBike(e.target.value || null)}
            className="w-full appearance-none rounded-lg border border-velo-border bg-velo-dark px-3 py-2 pr-8 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
          >
            {!hydrated ? (
              <option value="">Laden...</option>
            ) : bikes.length === 0 ? (
              <option value="">Kein Bike vorhanden</option>
            ) : (
              bikes.map((bike) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name}
                </option>
              ))
            )}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-velo-muted" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-velo-accent/10 text-velo-accent'
                  : 'text-velo-muted hover:bg-velo-dark hover:text-velo-text'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
