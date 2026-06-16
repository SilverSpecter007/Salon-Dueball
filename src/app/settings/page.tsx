'use client'

import { useState } from 'react'
import { Settings, Link, Unlink, RefreshCw, Download, Trash2, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'

const ACTIVITY_NAMES = [
  'Morgenrunde',
  'Feierabendrunde',
  'Wochenendtour',
  'Sonntagsausfahrt',
  'Mittagsrunde',
  'Pendeln zur Arbeit',
  'Trainingsfahrt',
  'Erkundungstour',
  'Abendrunde',
  'Bergtraining',
]

function randomDistance(): number {
  return Math.round((15 + Math.random() * 65) * 10) / 10
}

function randomDate(): string {
  const now = Date.now()
  const offset = Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  return new Date(now - offset).toISOString()
}

export default function SettingsPage() {
  const hydrated = useHydration()
  const [syncing, setSyncing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const komootSettings = useStore((s) => s.komootSettings)
  const komootActivities = useStore((s) => s.komootActivities)
  const bikes = useStore((s) => s.bikes)
  const updateKomootSettings = useStore((s) => s.updateKomootSettings)
  const addKomootActivity = useStore((s) => s.addKomootActivity)
  const mapActivityToBike = useStore((s) => s.mapActivityToBike)

  function handleSync() {
    setSyncing(true)
    setTimeout(() => {
      const count = 3 + Math.floor(Math.random() * 3)
      const used = new Set<string>()
      for (let i = 0; i < count; i++) {
        let name: string
        do {
          name = ACTIVITY_NAMES[Math.floor(Math.random() * ACTIVITY_NAMES.length)]
        } while (used.has(name) && used.size < ACTIVITY_NAMES.length)
        used.add(name)
        addKomootActivity({
          name,
          date: randomDate(),
          distanceKm: randomDistance(),
        })
      }
      updateKomootSettings({ lastSyncAt: new Date().toISOString() })
      setSyncing(false)
    }, 1200)
  }

  function handleExport() {
    const data = {
      bikes: useStore.getState().bikes,
      serviceEntries: useStore.getState().serviceEntries,
      chatMessages: useStore.getState().chatMessages,
      komootSettings: useStore.getState().komootSettings,
      komootActivities: useStore.getState().komootActivities,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `velopit-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleDeleteAll() {
    localStorage.removeItem('velopit-storage')
    window.location.reload()
  }

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velo-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-velo-accent" />
        <h1 className="text-lg font-semibold text-velo-text">Einstellungen</h1>
      </div>

      {/* Komoot Sync */}
      <section className="space-y-4 rounded-xl border border-velo-border bg-velo-surface p-4">
        <h2 className="flex items-center gap-2 font-medium text-velo-text">
          <MapPin className="h-4 w-4 text-velo-accent" />
          Komoot Sync
        </h2>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-sm text-velo-muted">Benutzername</label>
          <input
            value={komootSettings.username}
            onChange={(e) => updateKomootSettings({ username: e.target.value })}
            placeholder="Komoot Benutzername"
            className="w-full rounded-lg border border-velo-border bg-velo-dark px-3 py-2 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
          />
        </div>

        {/* Connect toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-velo-muted">Verbindung</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateKomootSettings({ connected: !komootSettings.connected })}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              komootSettings.connected
                ? 'bg-velo-accent/20 text-velo-accent'
                : 'bg-velo-dark text-velo-muted hover:text-velo-text'
            }`}
          >
            {komootSettings.connected ? (
              <>
                <Link className="h-4 w-4" />
                Verbunden
              </>
            ) : (
              <>
                <Unlink className="h-4 w-4" />
                Nicht verbunden
              </>
            )}
          </motion.button>
        </div>

        {/* Auto-sync toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-velo-muted">Auto-Sync</span>
          <button
            onClick={() => updateKomootSettings({ autoSync: !komootSettings.autoSync })}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              komootSettings.autoSync ? 'bg-velo-accent' : 'bg-velo-border'
            }`}
          >
            <motion.div
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
              animate={{ left: komootSettings.autoSync ? '1.25rem' : '0.125rem' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Last sync */}
        {komootSettings.lastSyncAt && (
          <p className="text-xs text-velo-muted">
            Letzter Sync:{' '}
            {new Date(komootSettings.lastSyncAt).toLocaleString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        )}

        {/* Sync button */}
        <button
          onClick={handleSync}
          disabled={syncing || !komootSettings.connected}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-velo-accent px-4 py-2 text-sm font-medium text-velo-dark transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Synchronisiere...' : 'Jetzt synchronisieren'}
        </button>

        {/* Activity list */}
        {komootActivities.length > 0 && (
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-medium text-velo-muted">
              Aktivit&auml;ten ({komootActivities.length})
            </h3>
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {komootActivities
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg border border-velo-border bg-velo-dark px-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-velo-text">{activity.name}</p>
                      <p className="text-xs text-velo-muted">
                        {new Date(activity.date).toLocaleDateString('de-DE')} &middot;{' '}
                        {activity.distanceKm} km
                      </p>
                    </div>
                    <select
                      value={activity.bikeId ?? ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          mapActivityToBike(activity.id, e.target.value)
                        }
                      }}
                      className="ml-2 rounded-md border border-velo-border bg-velo-surface px-2 py-1 text-xs text-velo-text focus:border-velo-accent focus:outline-none"
                    >
                      <option value="">Bike zuweisen</option>
                      {bikes.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>

      {/* Data section */}
      <section className="space-y-4 rounded-xl border border-velo-border bg-velo-surface p-4">
        <h2 className="font-medium text-velo-text">Daten</h2>

        <button
          onClick={handleExport}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-velo-border bg-velo-dark px-4 py-2 text-sm text-velo-text transition-colors hover:border-velo-accent"
        >
          <Download className="h-4 w-4" />
          Alle Daten exportieren
        </button>

        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-velo-danger/30 bg-velo-dark px-4 py-2 text-sm text-velo-danger transition-colors hover:border-velo-danger"
          >
            <Trash2 className="h-4 w-4" />
            Alle Daten l&ouml;schen
          </button>
        ) : (
          <div className="space-y-2 rounded-lg border border-velo-danger bg-velo-danger/10 p-3">
            <p className="text-sm text-velo-danger">
              Bist du sicher? Alle Daten werden unwiderruflich gel&ouml;scht.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteAll}
                className="flex-1 rounded-lg bg-velo-danger px-3 py-1.5 text-sm font-medium text-white"
              >
                Ja, alles l&ouml;schen
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-lg border border-velo-border px-3 py-1.5 text-sm text-velo-muted"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </section>

      {/* About section */}
      <section className="space-y-2 rounded-xl border border-velo-border bg-velo-surface p-4">
        <h2 className="font-medium text-velo-text">&Uuml;ber</h2>
        <div className="space-y-1 text-sm text-velo-muted">
          <p>
            <span className="text-velo-text">Velopit</span> &mdash; Bike Maintenance Tracker
          </p>
          <p>Version 1.0.0</p>
        </div>
      </section>
    </div>
  )
}
