import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Preisliste',
}

export default function LeistungenPage() {
  redirect('/preisliste')
}
