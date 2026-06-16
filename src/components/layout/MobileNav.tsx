'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Bike,
  BookOpen,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/bikes', label: 'Bikes', icon: Bike },
  { href: '/scheckheft', label: 'Scheckheft', icon: BookOpen },
  { href: '/crew-chief', label: 'Crew Chief', icon: MessageCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-velo-border bg-velo-surface md:hidden">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-velo-accent'
                  : 'text-velo-muted hover:text-velo-text'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
