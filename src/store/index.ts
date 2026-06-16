'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  Bike,
  Component,
  Setup,
  ServiceEntry,
  ChatMessage,
  KomootSettings,
  KomootActivity,
} from '@/types'

function uid(): string {
  return crypto.randomUUID()
}

type VelopitStore = {
  bikes: Bike[]
  activeBikeId: string | null
  serviceEntries: ServiceEntry[]
  chatMessages: ChatMessage[]
  komootSettings: KomootSettings
  komootActivities: KomootActivity[]

  addBike: (bike: Omit<Bike, 'id' | 'createdAt' | 'components' | 'setups'>) => void
  updateBike: (id: string, data: Partial<Bike>) => void
  deleteBike: (id: string) => void
  setActiveBike: (id: string | null) => void

  addComponent: (bikeId: string, comp: Omit<Component, 'id' | 'bikeId'>) => void
  updateComponent: (bikeId: string, compId: string, data: Partial<Component>) => void
  removeComponent: (bikeId: string, compId: string) => void

  addSetup: (bikeId: string, setup: Omit<Setup, 'id' | 'bikeId' | 'createdAt'>) => void
  updateSetup: (bikeId: string, setupId: string, data: Partial<Setup>) => void
  deleteSetup: (bikeId: string, setupId: string) => void

  addServiceEntry: (entry: Omit<ServiceEntry, 'id'>) => void
  updateServiceEntry: (id: string, data: Partial<ServiceEntry>) => void
  deleteServiceEntry: (id: string) => void

  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  clearChat: () => void

  updateKomootSettings: (settings: Partial<KomootSettings>) => void
  addKomootActivity: (activity: Omit<KomootActivity, 'id'>) => void
  mapActivityToBike: (activityId: string, bikeId: string) => void
}

export const useStore = create<VelopitStore>()(
  persist(
    (set) => ({
      bikes: [],
      activeBikeId: null,
      serviceEntries: [],
      chatMessages: [],
      komootSettings: { username: '', connected: false, autoSync: false },
      komootActivities: [],

      addBike: (bike) =>
        set((s) => {
          const newBike: Bike = {
            ...bike,
            id: uid(),
            components: [],
            setups: [],
            createdAt: new Date().toISOString(),
          }
          const bikes = [...s.bikes, newBike]
          return { bikes, activeBikeId: s.activeBikeId ?? newBike.id }
        }),

      updateBike: (id, data) =>
        set((s) => ({
          bikes: s.bikes.map((b) => (b.id === id ? { ...b, ...data } : b)),
        })),

      deleteBike: (id) =>
        set((s) => ({
          bikes: s.bikes.filter((b) => b.id !== id),
          activeBikeId: s.activeBikeId === id ? (s.bikes[0]?.id ?? null) : s.activeBikeId,
          serviceEntries: s.serviceEntries.filter((e) => e.bikeId !== id),
        })),

      setActiveBike: (id) => set({ activeBikeId: id }),

      addComponent: (bikeId, comp) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? { ...b, components: [...b.components, { ...comp, id: uid(), bikeId }] }
              : b,
          ),
        })),

      updateComponent: (bikeId, compId, data) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? {
                  ...b,
                  components: b.components.map((c) =>
                    c.id === compId ? { ...c, ...data } : c,
                  ),
                }
              : b,
          ),
        })),

      removeComponent: (bikeId, compId) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? { ...b, components: b.components.filter((c) => c.id !== compId) }
              : b,
          ),
        })),

      addSetup: (bikeId, setup) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? {
                  ...b,
                  setups: [
                    ...b.setups,
                    { ...setup, id: uid(), bikeId, createdAt: new Date().toISOString() },
                  ],
                }
              : b,
          ),
        })),

      updateSetup: (bikeId, setupId, data) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? {
                  ...b,
                  setups: b.setups.map((st) => (st.id === setupId ? { ...st, ...data } : st)),
                }
              : b,
          ),
        })),

      deleteSetup: (bikeId, setupId) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === bikeId
              ? { ...b, setups: b.setups.filter((st) => st.id !== setupId) }
              : b,
          ),
        })),

      addServiceEntry: (entry) =>
        set((s) => ({
          serviceEntries: [...s.serviceEntries, { ...entry, id: uid() }],
        })),

      updateServiceEntry: (id, data) =>
        set((s) => ({
          serviceEntries: s.serviceEntries.map((e) => (e.id === id ? { ...e, ...data } : e)),
        })),

      deleteServiceEntry: (id) =>
        set((s) => ({
          serviceEntries: s.serviceEntries.filter((e) => e.id !== id),
        })),

      addChatMessage: (msg) =>
        set((s) => ({
          chatMessages: [
            ...s.chatMessages,
            { ...msg, id: uid(), timestamp: new Date().toISOString() },
          ],
        })),

      clearChat: () => set({ chatMessages: [] }),

      updateKomootSettings: (settings) =>
        set((s) => ({
          komootSettings: { ...s.komootSettings, ...settings },
        })),

      addKomootActivity: (activity) =>
        set((s) => ({
          komootActivities: [...s.komootActivities, { ...activity, id: uid() }],
        })),

      mapActivityToBike: (activityId, bikeId) =>
        set((s) => ({
          komootActivities: s.komootActivities.map((a) =>
            a.id === activityId ? { ...a, bikeId } : a,
          ),
        })),
    }),
    { name: 'velopit-storage' },
  ),
)
