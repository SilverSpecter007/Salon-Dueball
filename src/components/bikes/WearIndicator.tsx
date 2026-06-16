'use client'

import { getComponentStatus, getStatusColor } from '@/lib/maintenance'

type WearIndicatorProps = {
  wear: number
  size?: 'sm' | 'md'
}

export default function WearIndicator({ wear, size = 'md' }: WearIndicatorProps) {
  const status = getComponentStatus(wear)
  const colorClass = getStatusColor(status)
  const clampedWear = Math.min(100, Math.max(0, wear))

  const heightClass = size === 'sm' ? 'h-1.5' : 'h-2.5'

  return (
    <div className={`w-full rounded-full bg-velo-dark ${heightClass} overflow-hidden`}>
      <div
        className={`${heightClass} rounded-full ${colorClass} transition-all duration-500 ease-out`}
        style={{ width: `${clampedWear}%` }}
      />
    </div>
  )
}
