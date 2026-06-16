'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  Calendar,
  X,
} from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import type { ServiceType, ServiceEntry } from '@/types'

const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  maintenance: 'Wartung',
  repair: 'Reparatur',
  upgrade: 'Upgrade',
  inspection: 'Inspektion',
}

const SERVICE_TYPE_COLORS: Record<ServiceType, string> = {
  maintenance: 'bg-cyan-500/20 text-cyan-400',
  repair: 'bg-amber-500/20 text-amber-400',
  upgrade: 'bg-emerald-500/20 text-emerald-400',
  inspection: 'bg-slate-500/20 text-slate-400',
}

type EntryFormData = {
  bikeId: string
  date: string
  type: ServiceType
  title: string
  description: string
  kmAtService: number | ''
  cost: number | ''
  shop: string
}

const EMPTY_FORM: EntryFormData = {
  bikeId: '',
  date: new Date().toISOString().slice(0, 10),
  type: 'maintenance',
  title: '',
  description: '',
  kmAtService: '',
  cost: '',
  shop: '',
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

function formatCost(cost: number): string {
  return `${cost.toFixed(2).replace('.', ',')} €`
}

export default function ScheckheftPage() {
  const hydrated = useHydration()

  const bikes = useStore((s) => s.bikes)
  const serviceEntries = useStore((s) => s.serviceEntries)
  const addServiceEntry = useStore((s) => s.addServiceEntry)
  const updateServiceEntry = useStore((s) => s.updateServiceEntry)
  const deleteServiceEntry = useStore((s) => s.deleteServiceEntry)

  const [filterBikeId, setFilterBikeId] = useState<string>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingEntry, setEditingEntry] = useState<ServiceEntry | null>(null)
  const [form, setForm] = useState<EntryFormData>(EMPTY_FORM)

  const filteredEntries = useMemo(() => {
    const entries =
      filterBikeId === 'all'
        ? serviceEntries
        : serviceEntries.filter((e) => e.bikeId === filterBikeId)
    return [...entries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [serviceEntries, filterBikeId])

  function getBikeName(bikeId: string): string {
    return bikes.find((b) => b.id === bikeId)?.name ?? 'Unbekanntes Bike'
  }

  function openAdd() {
    setEditingEntry(null)
    setForm({
      ...EMPTY_FORM,
      bikeId: bikes[0]?.id ?? '',
    })
    setShowModal(true)
  }

  function openEdit(entry: ServiceEntry) {
    setEditingEntry(entry)
    setForm({
      bikeId: entry.bikeId,
      date: entry.date.slice(0, 10),
      type: entry.type,
      title: entry.title,
      description: entry.description ?? '',
      kmAtService: entry.kmAtService,
      cost: entry.cost ?? '',
      shop: entry.shop ?? '',
    })
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingEntry(null)
    setForm(EMPTY_FORM)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.bikeId) return

    const payload = {
      bikeId: form.bikeId,
      date: form.date,
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim() || undefined,
      componentIds: editingEntry?.componentIds ?? [],
      kmAtService: Number(form.kmAtService) || 0,
      cost: form.cost === '' ? undefined : Number(form.cost),
      shop: form.shop.trim() || undefined,
    }

    if (editingEntry) {
      updateServiceEntry(editingEntry.id, payload)
    } else {
      addServiceEntry(payload)
    }

    closeModal()
  }

  function handleDelete(id: string) {
    deleteServiceEntry(id)
  }

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velo-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-velo-accent" />
          <h1 className="text-2xl font-bold text-velo-text">Digitales Scheckheft</h1>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark hover:bg-velo-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Eintrag hinzufügen
        </button>
      </div>

      <div className="mb-6">
        <select
          value={filterBikeId}
          onChange={(e) => setFilterBikeId(e.target.value)}
          className="rounded-lg border border-velo-border bg-velo-surface px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
        >
          <option value="all">Alle Bikes</option>
          {bikes.map((bike) => (
            <option key={bike.id} value={bike.id}>
              {bike.name}
            </option>
          ))}
        </select>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="rounded-xl border border-velo-border bg-velo-surface p-12 text-center">
          <BookOpen className="mx-auto mb-4 h-12 w-12 text-velo-muted/50" />
          <p className="text-velo-muted">Noch keine Einträge vorhanden.</p>
          <p className="mt-1 text-sm text-velo-muted/70">
            Füge deinen ersten Service-Eintrag hinzu.
          </p>
        </div>
      ) : (
        <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-velo-border">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="relative rounded-xl border border-velo-border bg-velo-surface p-5"
            >
              <div className="absolute -left-[17px] top-6 h-3 w-3 rounded-full border-2 border-velo-accent bg-velo-dark" />

              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-sm text-velo-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(entry.date)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${SERVICE_TYPE_COLORS[entry.type]}`}
                  >
                    {SERVICE_TYPE_LABELS[entry.type]}
                  </span>
                  <span className="rounded-full bg-velo-border px-2.5 py-0.5 text-xs text-velo-muted">
                    {getBikeName(entry.bikeId)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(entry)}
                    className="rounded-lg p-1.5 text-velo-muted hover:bg-velo-border hover:text-velo-text transition-colors"
                    aria-label={`Eintrag ${entry.title} bearbeiten`}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="rounded-lg p-1.5 text-velo-muted hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    aria-label={`Eintrag ${entry.title} löschen`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="mb-1 font-semibold text-velo-text">{entry.title}</h3>
              {entry.description && (
                <p className="mb-2 text-sm text-velo-muted">{entry.description}</p>
              )}

              <div className="flex flex-wrap gap-4 text-sm text-velo-muted">
                <span>{entry.kmAtService.toLocaleString('de-DE')} km</span>
                {entry.cost !== undefined && entry.cost !== null && (
                  <span className="font-medium text-velo-text">
                    {formatCost(entry.cost)}
                  </span>
                )}
                {entry.shop && <span>{entry.shop}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-velo-border bg-velo-surface p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-velo-text">
                  {editingEntry ? 'Eintrag bearbeiten' : 'Eintrag hinzufügen'}
                </h2>
                <button
                  onClick={closeModal}
                  className="rounded-lg p-1.5 text-velo-muted hover:bg-velo-border hover:text-velo-text transition-colors"
                  aria-label="Schließen"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-velo-muted">Bike *</label>
                  <select
                    required
                    value={form.bikeId}
                    onChange={(e) => setForm((prev) => ({ ...prev, bikeId: e.target.value }))}
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                  >
                    <option value="" disabled>
                      Bike auswählen...
                    </option>
                    {bikes.map((bike) => (
                      <option key={bike.id} value={bike.id}>
                        {bike.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-velo-muted">Datum *</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-velo-muted">Typ *</label>
                    <select
                      required
                      value={form.type}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          type: e.target.value as ServiceType,
                        }))
                      }
                      className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                    >
                      <option value="maintenance">Wartung</option>
                      <option value="repair">Reparatur</option>
                      <option value="upgrade">Upgrade</option>
                      <option value="inspection">Inspektion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-velo-muted">Titel *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="z.B. Kettenwechsel, Bremsen entlüftet..."
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-velo-muted">Beschreibung</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    placeholder="Optionale Details..."
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm text-velo-muted">km-Stand</label>
                    <input
                      type="number"
                      value={form.kmAtService}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          kmAtService: e.target.value === '' ? '' : Number(e.target.value),
                        }))
                      }
                      placeholder="0"
                      className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-velo-muted">
                      Kosten (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.cost}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          cost: e.target.value === '' ? '' : Number(e.target.value),
                        }))
                      }
                      placeholder="0,00"
                      className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-velo-muted">
                    Werkstatt / Selbst
                  </label>
                  <input
                    type="text"
                    value={form.shop}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, shop: e.target.value }))
                    }
                    placeholder="z.B. Bike-Shop München, Selbst..."
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg px-4 py-2 text-sm text-velo-muted hover:text-velo-text transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark hover:bg-velo-accent/90 transition-colors"
                  >
                    {editingEntry ? 'Speichern' : 'Hinzufügen'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
