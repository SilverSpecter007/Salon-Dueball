'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Bike, AlertTriangle } from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import { getComponentWear, BIKE_TYPE_LABELS } from '@/lib/maintenance'
import type { BikeType } from '@/types'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'

const BIKE_TYPES: BikeType[] = ['road', 'gravel', 'mtb', 'urban', 'ebike']

export default function BikesPage() {
  const hydrated = useHydration()
  const bikes = useStore((s) => s.bikes)
  const addBike = useStore((s) => s.addBike)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const [formName, setFormName] = useState('')
  const [formType, setFormType] = useState<BikeType>('road')
  const [formBrand, setFormBrand] = useState('')
  const [formModel, setFormModel] = useState('')
  const [formYear, setFormYear] = useState('')
  const [formTotalKm, setFormTotalKm] = useState('')

  function resetForm() {
    setFormName('')
    setFormType('road')
    setFormBrand('')
    setFormModel('')
    setFormYear('')
    setFormTotalKm('')
  }

  function handleAddBike(e: React.FormEvent) {
    e.preventDefault()
    if (!formName.trim()) return

    addBike({
      name: formName.trim(),
      type: formType,
      brand: formBrand.trim() || undefined,
      model: formModel.trim() || undefined,
      year: formYear ? Number(formYear) : undefined,
      totalKm: Number(formTotalKm) || 0,
    })

    resetForm()
    setShowModal(false)
  }

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-velo-text">Meine Bikes</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-xl border border-velo-border bg-velo-surface"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-velo-text">Meine Bikes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark transition-colors hover:bg-velo-accent/90"
        >
          <Plus className="h-4 w-4" />
          Bike hinzuf&uuml;gen
        </button>
      </div>

      {bikes.length === 0 ? (
        <EmptyState
          icon={<Bike className="h-12 w-12" />}
          title="Noch keine Bikes"
          description="F&uuml;ge dein erstes Bike hinzu, um deine Komponenten und Wartungen zu tracken."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => {
            const alertCount = bike.components.filter(
              (c) => getComponentWear(c, bike.totalKm) >= 80
            ).length

            return (
              <button
                key={bike.id}
                onClick={() => router.push(`/bikes/${bike.id}`)}
                className="group rounded-xl border border-velo-border bg-velo-surface p-5 text-left transition-colors hover:border-velo-accent/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-velo-text group-hover:text-velo-accent transition-colors">
                    {bike.name}
                  </h3>
                  {alertCount > 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-velo-danger/10 px-2 py-0.5 text-xs font-medium text-velo-danger">
                      <AlertTriangle className="h-3 w-3" />
                      {alertCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-velo-muted">
                  {BIKE_TYPE_LABELS[bike.type] ?? bike.type}
                </p>
                {(bike.brand || bike.model) && (
                  <p className="mt-1 text-sm text-velo-muted">
                    {[bike.brand, bike.model].filter(Boolean).join(' ')}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4 text-xs text-velo-muted">
                  <span>{bike.totalKm.toLocaleString('de-DE')} km</span>
                  <span>{bike.components.length} Komponenten</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Add Bike Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Bike hinzuf&uuml;gen">
        <form onSubmit={handleAddBike} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-velo-muted">Name *</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="z.B. Canyon Endurace"
              required
              className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-velo-muted">Typ</label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value as BikeType)}
              className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
            >
              {BIKE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {BIKE_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Marke</label>
              <input
                type="text"
                value={formBrand}
                onChange={(e) => setFormBrand(e.target.value)}
                placeholder="Canyon"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Modell</label>
              <input
                type="text"
                value={formModel}
                onChange={(e) => setFormModel(e.target.value)}
                placeholder="Endurace CF 7"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Baujahr</label>
              <input
                type="number"
                value={formYear}
                onChange={(e) => setFormYear(e.target.value)}
                placeholder="2024"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Kilometer</label>
              <input
                type="number"
                value={formTotalKm}
                onChange={(e) => setFormTotalKm(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="rounded-lg px-4 py-2 text-sm text-velo-muted transition-colors hover:text-velo-text"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark transition-colors hover:bg-velo-accent/90"
            >
              Hinzuf&uuml;gen
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
