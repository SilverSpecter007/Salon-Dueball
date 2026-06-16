'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Calendar,
  Route,
  Clock,
} from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import {
  getComponentWear,
  getComponentStatus,
  getStatusTextColor,
  getKmRemaining,
  getDaysRemaining,
  CATEGORY_LABELS,
  BIKE_TYPE_LABELS,
  DEFAULT_INTERVALS,
} from '@/lib/maintenance'
import type { ComponentCategory } from '@/types'
import WearIndicator from '@/components/bikes/WearIndicator'
import Modal from '@/components/ui/Modal'

const CATEGORIES: ComponentCategory[] = [
  'drivetrain',
  'brakes',
  'wheels',
  'tires',
  'suspension',
  'cockpit',
  'frame',
  'other',
]

export default function BikeDetailPage() {
  const hydrated = useHydration()
  const params = useParams()
  const router = useRouter()
  const bikeId = params.bikeId as string

  const bikes = useStore((s) => s.bikes)
  const updateBike = useStore((s) => s.updateBike)
  const deleteBike = useStore((s) => s.deleteBike)
  const addComponent = useStore((s) => s.addComponent)
  const removeComponent = useStore((s) => s.removeComponent)

  const [activeTab, setActiveTab] = useState<'components' | 'overview'>('components')
  const [showAddComponent, setShowAddComponent] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingKm, setEditingKm] = useState(false)
  const [kmValue, setKmValue] = useState('')

  // Component form state
  const [compName, setCompName] = useState('')
  const [compCategory, setCompCategory] = useState<ComponentCategory>('drivetrain')
  const [compBrand, setCompBrand] = useState('')
  const [compModel, setCompModel] = useState('')
  const [compInstalledAt, setCompInstalledAt] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [compInstalledAtKm, setCompInstalledAtKm] = useState('')
  const [compMaxKm, setCompMaxKm] = useState('')
  const [compMaxMonths, setCompMaxMonths] = useState('')

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded bg-velo-surface" />
        <div className="h-48 animate-pulse rounded-xl border border-velo-border bg-velo-surface" />
      </div>
    )
  }

  const bike = bikes.find((b) => b.id === bikeId)

  if (!bike) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => router.push('/bikes')}
          className="inline-flex items-center gap-1 text-sm text-velo-muted transition-colors hover:text-velo-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Zur&uuml;ck
        </button>
        <p className="text-velo-muted">Bike nicht gefunden.</p>
      </div>
    )
  }

  function handleNameChange(name: string) {
    const defaults = DEFAULT_INTERVALS[name]
    if (defaults) {
      setCompMaxKm(String(defaults.km))
      setCompMaxMonths(String(defaults.months))
    }
  }

  function resetComponentForm() {
    setCompName('')
    setCompCategory('drivetrain')
    setCompBrand('')
    setCompModel('')
    setCompInstalledAt(new Date().toISOString().split('T')[0])
    setCompInstalledAtKm('')
    setCompMaxKm('')
    setCompMaxMonths('')
  }

  function handleAddComponent(e: React.FormEvent) {
    e.preventDefault()
    if (!compName.trim()) return

    addComponent(bikeId, {
      name: compName.trim(),
      category: compCategory,
      brand: compBrand.trim() || undefined,
      model: compModel.trim() || undefined,
      installedAt: new Date(compInstalledAt).toISOString(),
      installedAtKm: Number(compInstalledAtKm) || 0,
      maxLifespanKm: Number(compMaxKm) || 5000,
      maxLifespanMonths: Number(compMaxMonths) || 12,
    })

    resetComponentForm()
    setShowAddComponent(false)
  }

  function handleDeleteBike() {
    deleteBike(bikeId)
    router.push('/bikes')
  }

  function handleKmSave() {
    const newKm = Number(kmValue)
    if (!isNaN(newKm) && newKm >= 0) {
      updateBike(bikeId, { totalKm: newKm })
    }
    setEditingKm(false)
  }

  const sortedComponents = [...bike.components]
    .map((c) => ({
      component: c,
      wear: getComponentWear(c, bike.totalKm),
    }))
    .sort((a, b) => b.wear - a.wear)

  return (
    <div className="space-y-6">
      {/* Back link */}
      <button
        onClick={() => router.push('/bikes')}
        className="inline-flex items-center gap-1 text-sm text-velo-muted transition-colors hover:text-velo-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Zur&uuml;ck zu Meine Bikes
      </button>

      {/* Bike header */}
      <div className="rounded-xl border border-velo-border bg-velo-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-velo-text">{bike.name}</h1>
            <p className="mt-1 text-sm text-velo-muted">
              {BIKE_TYPE_LABELS[bike.type] ?? bike.type}
              {(bike.brand || bike.model) && (
                <> &middot; {[bike.brand, bike.model].filter(Boolean).join(' ')}</>
              )}
              {bike.year && <> &middot; {bike.year}</>}
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-velo-danger/30 px-3 py-1.5 text-xs font-medium text-velo-danger transition-colors hover:bg-velo-danger/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Bike l&ouml;schen
          </button>
        </div>

        {/* Total km */}
        <div className="mt-4">
          {editingKm ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={kmValue}
                onChange={(e) => setKmValue(e.target.value)}
                min="0"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleKmSave()
                  if (e.key === 'Escape') setEditingKm(false)
                }}
                className="w-32 rounded-lg border border-velo-border bg-velo-dark px-3 py-1.5 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
              <span className="text-sm text-velo-muted">km</span>
              <button
                onClick={handleKmSave}
                className="rounded px-2 py-1 text-xs text-velo-accent hover:bg-velo-accent/10"
              >
                Speichern
              </button>
              <button
                onClick={() => setEditingKm(false)}
                className="rounded px-2 py-1 text-xs text-velo-muted hover:text-velo-text"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setKmValue(String(bike.totalKm))
                setEditingKm(true)
              }}
              className="group inline-flex items-center gap-2 text-sm text-velo-muted transition-colors hover:text-velo-text"
              title="Klicken zum Bearbeiten"
            >
              <Route className="h-4 w-4" />
              <span className="font-medium text-velo-text">
                {bike.totalKm.toLocaleString('de-DE')} km
              </span>
              <span className="text-xs opacity-0 transition-opacity group-hover:opacity-100">
                bearbeiten
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-velo-border bg-velo-surface p-1">
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'components'
              ? 'bg-velo-accent/10 text-velo-accent'
              : 'text-velo-muted hover:text-velo-text'
          }`}
        >
          Komponenten
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-velo-accent/10 text-velo-accent'
              : 'text-velo-muted hover:text-velo-text'
          }`}
        >
          &Uuml;bersicht
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'components' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddComponent(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark transition-colors hover:bg-velo-accent/90"
            >
              <Plus className="h-4 w-4" />
              Komponente hinzuf&uuml;gen
            </button>
          </div>

          {sortedComponents.length === 0 ? (
            <div className="rounded-xl border border-velo-border bg-velo-surface p-8 text-center text-sm text-velo-muted">
              Noch keine Komponenten hinzugef&uuml;gt.
            </div>
          ) : (
            <div className="space-y-3">
              {sortedComponents.map(({ component, wear }) => {
                const status = getComponentStatus(wear)
                const textColor = getStatusTextColor(status)
                const kmLeft = getKmRemaining(component, bike.totalKm)
                const daysLeft = getDaysRemaining(component)

                return (
                  <div
                    key={component.id}
                    className="rounded-xl border border-velo-border bg-velo-surface p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-velo-text">
                            {component.name}
                          </h3>
                          <span className="rounded-full bg-velo-dark px-2 py-0.5 text-xs text-velo-muted">
                            {CATEGORY_LABELS[component.category] ?? component.category}
                          </span>
                        </div>
                        {(component.brand || component.model) && (
                          <p className="mt-0.5 text-xs text-velo-muted">
                            {[component.brand, component.model].filter(Boolean).join(' ')}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${textColor}`}>
                          {Math.round(wear)}%
                        </span>
                        <button
                          onClick={() => removeComponent(bikeId, component.id)}
                          className="rounded p-1 text-velo-muted transition-colors hover:bg-velo-danger/10 hover:text-velo-danger"
                          title="Komponente entfernen"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <WearIndicator wear={wear} size="md" />
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-velo-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(component.installedAt).toLocaleDateString('de-DE')}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        {kmLeft.toLocaleString('de-DE')} km verbleibend
                      </span>
                      {daysLeft !== Infinity && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {daysLeft} Tage verbleibend
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'overview' && (
        <div className="rounded-xl border border-velo-border bg-velo-surface p-5">
          <h2 className="mb-4 text-lg font-semibold text-velo-text">&Uuml;bersicht</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-velo-muted">Name</dt>
              <dd className="text-sm font-medium text-velo-text">{bike.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-velo-muted">Typ</dt>
              <dd className="text-sm font-medium text-velo-text">
                {BIKE_TYPE_LABELS[bike.type] ?? bike.type}
              </dd>
            </div>
            {bike.brand && (
              <div>
                <dt className="text-xs text-velo-muted">Marke</dt>
                <dd className="text-sm font-medium text-velo-text">{bike.brand}</dd>
              </div>
            )}
            {bike.model && (
              <div>
                <dt className="text-xs text-velo-muted">Modell</dt>
                <dd className="text-sm font-medium text-velo-text">{bike.model}</dd>
              </div>
            )}
            {bike.year && (
              <div>
                <dt className="text-xs text-velo-muted">Baujahr</dt>
                <dd className="text-sm font-medium text-velo-text">{bike.year}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-velo-muted">Kilometer</dt>
              <dd className="text-sm font-medium text-velo-text">
                {bike.totalKm.toLocaleString('de-DE')} km
              </dd>
            </div>
            <div>
              <dt className="text-xs text-velo-muted">Komponenten</dt>
              <dd className="text-sm font-medium text-velo-text">
                {bike.components.length}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-velo-muted">Erstellt am</dt>
              <dd className="text-sm font-medium text-velo-text">
                {new Date(bike.createdAt).toLocaleDateString('de-DE')}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Add Component Modal */}
      <Modal
        isOpen={showAddComponent}
        onClose={() => setShowAddComponent(false)}
        title="Komponente hinzuf&uuml;gen"
      >
        <form onSubmit={handleAddComponent} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-velo-muted">Name *</label>
            <input
              type="text"
              value={compName}
              onChange={(e) => {
                setCompName(e.target.value)
                handleNameChange(e.target.value)
              }}
              list="default-components"
              placeholder="z.B. Kette"
              required
              className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
            />
            <datalist id="default-components">
              {Object.keys(DEFAULT_INTERVALS).map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1 block text-sm text-velo-muted">Kategorie</label>
            <select
              value={compCategory}
              onChange={(e) => setCompCategory(e.target.value as ComponentCategory)}
              className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Marke</label>
              <input
                type="text"
                value={compBrand}
                onChange={(e) => setCompBrand(e.target.value)}
                placeholder="Shimano"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Modell</label>
              <input
                type="text"
                value={compModel}
                onChange={(e) => setCompModel(e.target.value)}
                placeholder="Ultegra"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Eingebaut am</label>
              <input
                type="date"
                value={compInstalledAt}
                onChange={(e) => setCompInstalledAt(e.target.value)}
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Km bei Einbau</label>
              <input
                type="number"
                value={compInstalledAtKm}
                onChange={(e) => setCompInstalledAtKm(e.target.value)}
                placeholder="0"
                min="0"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Max. Lebensdauer (km)</label>
              <input
                type="number"
                value={compMaxKm}
                onChange={(e) => setCompMaxKm(e.target.value)}
                placeholder="5000"
                min="0"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-velo-muted">Max. Lebensdauer (Monate)</label>
              <input
                type="number"
                value={compMaxMonths}
                onChange={(e) => setCompMaxMonths(e.target.value)}
                placeholder="12"
                min="0"
                className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddComponent(false)}
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

      {/* Delete confirmation modal */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Bike l&ouml;schen?"
      >
        <p className="mb-4 text-sm text-velo-muted">
          M&ouml;chtest du <strong className="text-velo-text">{bike.name}</strong> wirklich
          l&ouml;schen? Alle Komponenten und zugeh&ouml;rigen Wartungseintr&auml;ge werden
          ebenfalls entfernt. Diese Aktion kann nicht r&uuml;ckg&auml;ngig gemacht werden.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="rounded-lg px-4 py-2 text-sm text-velo-muted transition-colors hover:text-velo-text"
          >
            Abbrechen
          </button>
          <button
            onClick={handleDeleteBike}
            className="rounded-lg bg-velo-danger px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-velo-danger/90"
          >
            L&ouml;schen
          </button>
        </div>
      </Modal>
    </div>
  )
}
