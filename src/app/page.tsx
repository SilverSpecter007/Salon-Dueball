'use client'

import Link from 'next/link'
import {
  Bike,
  Gauge,
  Wrench,
  AlertTriangle,
  Calendar,
} from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import {
  getComponentWear,
  getComponentStatus,
  getStatusTextColor,
  getKmRemaining,
} from '@/lib/maintenance'
import WearIndicator from '@/components/bikes/WearIndicator'
import EmptyState from '@/components/ui/EmptyState'

export default function DashboardPage() {
  const hydrated = useHydration()
  const bikes = useStore((s) => s.bikes)
  const activeBikeId = useStore((s) => s.activeBikeId)
  const serviceEntries = useStore((s) => s.serviceEntries)

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-velo-text">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl border border-velo-border bg-velo-surface"
            />
          ))}
        </div>
      </div>
    )
  }

  const activeBike = bikes.find((b) => b.id === activeBikeId)

  if (!activeBike) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-velo-text">Dashboard</h1>
        <EmptyState
          icon={<Bike className="h-12 w-12" />}
          title="Kein Bike vorhanden"
          description="Füge dein erstes Bike hinzu, um loszulegen."
        />
        <div className="flex justify-center">
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 rounded-lg bg-velo-accent px-4 py-2.5 text-sm font-medium text-velo-dark transition-colors hover:bg-velo-accent/90"
          >
            <Bike className="h-4 w-4" />
            Füge dein erstes Bike hinzu
          </Link>
        </div>
      </div>
    )
  }

  const components = activeBike.components
  const sortedComponents = [...components]
    .map((c) => ({
      component: c,
      wear: getComponentWear(c, activeBike.totalKm),
    }))
    .sort((a, b) => b.wear - a.wear)

  const alertCount = sortedComponents.filter((c) => c.wear >= 80).length

  const bikeServiceEntries = serviceEntries
    .filter((e) => e.bikeId === activeBikeId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-velo-text">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-velo-border bg-velo-surface p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velo-accent/10">
              <Gauge className="h-5 w-5 text-velo-accent" />
            </div>
            <div>
              <p className="text-sm text-velo-muted">Gesamtkilometer</p>
              <p className="text-xl font-bold text-velo-text">
                {activeBike.totalKm.toLocaleString('de-DE')} km
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-velo-border bg-velo-surface p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velo-accent/10">
              <Wrench className="h-5 w-5 text-velo-accent" />
            </div>
            <div>
              <p className="text-sm text-velo-muted">Komponenten</p>
              <p className="text-xl font-bold text-velo-text">{components.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-velo-border bg-velo-surface p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velo-danger/10">
              <AlertTriangle className="h-5 w-5 text-velo-danger" />
            </div>
            <div>
              <p className="text-sm text-velo-muted">Wartungs-Alerts</p>
              <p className="text-xl font-bold text-velo-text">{alertCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Components by wear */}
      <div className="rounded-xl border border-velo-border bg-velo-surface">
        <div className="border-b border-velo-border px-4 py-3">
          <h2 className="font-semibold text-velo-text">Komponentenverschlei&szlig;</h2>
        </div>
        {sortedComponents.length === 0 ? (
          <div className="p-8 text-center text-sm text-velo-muted">
            Keine Komponenten vorhanden.{' '}
            <Link
              href={`/bikes/${activeBike.id}`}
              className="text-velo-accent hover:underline"
            >
              Jetzt hinzuf&uuml;gen
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-velo-border">
            {sortedComponents.map(({ component, wear }) => {
              const status = getComponentStatus(wear)
              const textColor = getStatusTextColor(status)
              const kmLeft = getKmRemaining(component, activeBike.totalKm)

              return (
                <li key={component.id} className="flex items-center gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-velo-text">
                        {component.name}
                      </p>
                      <span className={`ml-2 shrink-0 text-xs font-medium ${textColor}`}>
                        {Math.round(wear)}%
                      </span>
                    </div>
                    <WearIndicator wear={wear} size="sm" />
                    <p className="mt-1 text-xs text-velo-muted">
                      {kmLeft.toLocaleString('de-DE')} km verbleibend
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Recent service entries */}
      <div className="rounded-xl border border-velo-border bg-velo-surface">
        <div className="border-b border-velo-border px-4 py-3">
          <h2 className="font-semibold text-velo-text">Letzte Wartungen</h2>
        </div>
        {bikeServiceEntries.length === 0 ? (
          <div className="p-8 text-center text-sm text-velo-muted">
            Noch keine Wartungseintr&auml;ge vorhanden.
          </div>
        ) : (
          <ul className="divide-y divide-velo-border">
            {bikeServiceEntries.map((entry) => (
              <li key={entry.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-velo-dark">
                  <Calendar className="h-4 w-4 text-velo-muted" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-velo-text">
                    {entry.title}
                  </p>
                  <p className="text-xs text-velo-muted">
                    {new Date(entry.date).toLocaleDateString('de-DE')} &middot;{' '}
                    {entry.kmAtService.toLocaleString('de-DE')} km
                  </p>
                </div>
                {entry.cost != null && (
                  <span className="shrink-0 text-xs text-velo-muted">
                    {entry.cost.toFixed(2)} &euro;
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
