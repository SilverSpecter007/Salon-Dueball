import type { ReactNode } from 'react'

type EmptyStateProps = {
  icon: ReactNode
  title: string
  description: string
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-velo-muted mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-velo-text mb-2">{title}</h3>
      <p className="text-sm text-velo-muted max-w-sm">{description}</p>
    </div>
  )
}
