import type { Component, WearStatus } from '@/types'

export function getKmWear(component: Component, bikeCurrentKm: number): number {
  if (component.maxLifespanKm <= 0) return 0
  const kmUsed = bikeCurrentKm - component.installedAtKm
  return Math.max(0, Math.min(100, (kmUsed / component.maxLifespanKm) * 100))
}

export function getTimeWear(component: Component): number {
  if (component.maxLifespanMonths <= 0) return 0
  const installed = new Date(component.installedAt)
  const now = new Date()
  const monthsUsed =
    (now.getFullYear() - installed.getFullYear()) * 12 +
    (now.getMonth() - installed.getMonth())
  return Math.max(0, Math.min(100, (monthsUsed / component.maxLifespanMonths) * 100))
}

export function getComponentWear(component: Component, bikeCurrentKm: number): number {
  return Math.max(getKmWear(component, bikeCurrentKm), getTimeWear(component))
}

export function getComponentStatus(wear: number): WearStatus {
  if (wear >= 100) return 'overdue'
  if (wear >= 80) return 'critical'
  if (wear >= 60) return 'warning'
  return 'good'
}

export function getKmRemaining(component: Component, bikeCurrentKm: number): number {
  const kmUsed = bikeCurrentKm - component.installedAtKm
  return Math.max(0, component.maxLifespanKm - kmUsed)
}

export function getDaysRemaining(component: Component): number {
  if (component.maxLifespanMonths <= 0) return Infinity
  const installed = new Date(component.installedAt)
  const expires = new Date(installed)
  expires.setMonth(expires.getMonth() + component.maxLifespanMonths)
  const diff = expires.getTime() - Date.now()
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
}

export function getStatusColor(status: WearStatus): string {
  const colors: Record<WearStatus, string> = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-orange-500',
    overdue: 'bg-red-500',
  }
  return colors[status]
}

export function getStatusTextColor(status: WearStatus): string {
  const colors: Record<WearStatus, string> = {
    good: 'text-emerald-400',
    warning: 'text-amber-400',
    critical: 'text-orange-400',
    overdue: 'text-red-400',
  }
  return colors[status]
}

export const DEFAULT_INTERVALS: Record<string, { km: number; months: number }> = {
  'Kette': { km: 5000, months: 12 },
  'Bremsbeläge': { km: 8000, months: 18 },
  'Kassette': { km: 15000, months: 36 },
  'Reifen': { km: 6000, months: 24 },
  'Bremsscheiben': { km: 20000, months: 48 },
  'Kabel & Züge': { km: 10000, months: 24 },
  'Lenkerband': { km: 5000, months: 12 },
  'Federgabel Service': { km: 5000, months: 12 },
  'Dämpfer Service': { km: 5000, months: 12 },
  'Laufräder': { km: 30000, months: 60 },
  'Tretlager': { km: 15000, months: 36 },
  'Schaltwerk': { km: 20000, months: 48 },
}

export const CATEGORY_LABELS: Record<string, string> = {
  drivetrain: 'Antrieb',
  brakes: 'Bremsen',
  wheels: 'Laufräder',
  tires: 'Reifen',
  suspension: 'Federung',
  cockpit: 'Cockpit',
  frame: 'Rahmen',
  other: 'Sonstiges',
}

export const BIKE_TYPE_LABELS: Record<string, string> = {
  road: 'Rennrad',
  gravel: 'Gravel',
  mtb: 'Mountainbike',
  urban: 'City/Urban',
  ebike: 'E-Bike',
}
