'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Settings,
  X,
} from 'lucide-react'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import type { Setup } from '@/types'

type SetupFormData = {
  name: string
  saddleHeight: number | ''
  saddleSetback: number | ''
  handlebarDrop: number | ''
  reach: number | ''
  stemLength: number | ''
  stemAngle: number | ''
  tirePressureFront: number | ''
  tirePressureRear: number | ''
  notes: string
}

const EMPTY_FORM: SetupFormData = {
  name: '',
  saddleHeight: '',
  saddleSetback: '',
  handlebarDrop: '',
  reach: '',
  stemLength: '',
  stemAngle: '',
  tirePressureFront: '',
  tirePressureRear: '',
  notes: '',
}

const SETUP_FIELDS: { key: keyof Setup; label: string; unit: string }[] = [
  { key: 'saddleHeight', label: 'Sattelhöhe', unit: 'mm' },
  { key: 'saddleSetback', label: 'Sattelversatz', unit: 'mm' },
  { key: 'handlebarDrop', label: 'Lenker Drop', unit: 'mm' },
  { key: 'reach', label: 'Reach', unit: 'mm' },
  { key: 'stemLength', label: 'Verbaulänge', unit: 'mm' },
  { key: 'stemAngle', label: 'Vorbauwinkel', unit: '°' },
  { key: 'tirePressureFront', label: 'Reifendruck Vorne', unit: 'bar' },
  { key: 'tirePressureRear', label: 'Reifendruck Hinten', unit: 'bar' },
]

export default function SetupVaultPage() {
  const hydrated = useHydration()
  const params = useParams()
  const bikeId = params.bikeId as string

  const bikes = useStore((s) => s.bikes)
  const addSetup = useStore((s) => s.addSetup)
  const updateSetup = useStore((s) => s.updateSetup)
  const deleteSetup = useStore((s) => s.deleteSetup)

  const bike = bikes.find((b) => b.id === bikeId)

  const [showModal, setShowModal] = useState(false)
  const [editingSetup, setEditingSetup] = useState<Setup | null>(null)
  const [form, setForm] = useState<SetupFormData>(EMPTY_FORM)

  function openAdd() {
    setEditingSetup(null)
    setForm(EMPTY_FORM)
    setShowModal(true)
  }

  function openEdit(setup: Setup) {
    setEditingSetup(setup)
    setForm({
      name: setup.name,
      saddleHeight: setup.saddleHeight,
      saddleSetback: setup.saddleSetback,
      handlebarDrop: setup.handlebarDrop,
      reach: setup.reach,
      stemLength: setup.stemLength,
      stemAngle: setup.stemAngle,
      tirePressureFront: setup.tirePressureFront,
      tirePressureRear: setup.tirePressureRear,
      notes: setup.notes ?? '',
    })
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setEditingSetup(null)
    setForm(EMPTY_FORM)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return

    const payload = {
      name: form.name.trim(),
      saddleHeight: Number(form.saddleHeight) || 0,
      saddleSetback: Number(form.saddleSetback) || 0,
      handlebarDrop: Number(form.handlebarDrop) || 0,
      reach: Number(form.reach) || 0,
      stemLength: Number(form.stemLength) || 0,
      stemAngle: Number(form.stemAngle) || 0,
      tirePressureFront: Number(form.tirePressureFront) || 0,
      tirePressureRear: Number(form.tirePressureRear) || 0,
      notes: form.notes.trim() || undefined,
    }

    if (editingSetup) {
      updateSetup(bikeId, editingSetup.id, payload)
    } else {
      addSetup(bikeId, payload)
    }

    closeModal()
  }

  function handleDelete(setupId: string) {
    deleteSetup(bikeId, setupId)
  }

  function updateField(key: keyof SetupFormData, value: string) {
    if (key === 'name' || key === 'notes') {
      setForm((prev) => ({ ...prev, [key]: value }))
    } else {
      setForm((prev) => ({ ...prev, [key]: value === '' ? '' : Number(value) }))
    }
  }

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velo-accent border-t-transparent" />
      </div>
    )
  }

  if (!bike) {
    return (
      <div className="p-6">
        <Link
          href="/bikes"
          className="mb-4 inline-flex items-center gap-2 text-sm text-velo-muted hover:text-velo-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </Link>
        <div className="mt-8 rounded-xl border border-velo-border bg-velo-surface p-8 text-center">
          <p className="text-velo-muted">Bike nicht gefunden.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Link
        href={`/bikes/${bikeId}`}
        className="mb-4 inline-flex items-center gap-2 text-sm text-velo-muted hover:text-velo-text transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zu {bike.name}
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-velo-accent" />
          <div>
            <h1 className="text-2xl font-bold text-velo-text">Setup Vault</h1>
            <p className="text-sm text-velo-muted">{bike.name}</p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark hover:bg-velo-accent/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Neues Setup
        </button>
      </div>

      {bike.setups.length === 0 ? (
        <div className="rounded-xl border border-velo-border bg-velo-surface p-12 text-center">
          <Settings className="mx-auto mb-4 h-12 w-12 text-velo-muted/50" />
          <p className="text-velo-muted">Noch keine Setups gespeichert.</p>
          <p className="mt-1 text-sm text-velo-muted/70">
            Erstelle dein erstes Setup, um deine Einstellungen festzuhalten.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bike.setups.map((setup) => (
            <motion.div
              key={setup.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="rounded-xl border border-velo-border bg-velo-surface p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-velo-text">{setup.name}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(setup)}
                    className="rounded-lg p-1.5 text-velo-muted hover:bg-velo-border hover:text-velo-text transition-colors"
                    aria-label={`Setup ${setup.name} bearbeiten`}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(setup.id)}
                    className="rounded-lg p-1.5 text-velo-muted hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    aria-label={`Setup ${setup.name} löschen`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {SETUP_FIELDS.map(({ key, label, unit }) => (
                  <div key={key}>
                    <span className="text-velo-muted">{label}</span>
                    <p className="font-medium text-velo-text">
                      {setup[key as keyof Setup]} {unit}
                    </p>
                  </div>
                ))}
              </div>

              {setup.notes && (
                <p className="mt-3 rounded-lg bg-velo-dark/50 p-2 text-xs text-velo-muted">
                  {setup.notes}
                </p>
              )}
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
                  {editingSetup ? 'Setup bearbeiten' : 'Neues Setup'}
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
                  <label className="mb-1 block text-sm text-velo-muted">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="z.B. Renn-Setup, Komfort..."
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SETUP_FIELDS.map(({ key, label, unit }) => (
                    <div key={key}>
                      <label className="mb-1 block text-sm text-velo-muted">
                        {label} ({unit})
                      </label>
                      <input
                        type="number"
                        step={unit === 'bar' ? '0.1' : '1'}
                        value={form[key as keyof SetupFormData]}
                        onChange={(e) =>
                          updateField(key as keyof SetupFormData, e.target.value)
                        }
                        className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-velo-muted">Notizen</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    rows={3}
                    placeholder="Optionale Notizen..."
                    className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent resize-none"
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
                    {editingSetup ? 'Speichern' : 'Erstellen'}
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
