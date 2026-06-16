'use client'

import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Send, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store'
import { useHydration } from '@/hooks/useHydration'
import {
  getComponentWear,
  getComponentStatus,
  getStatusTextColor,
  getKmRemaining,
  getDaysRemaining,
  BIKE_TYPE_LABELS,
} from '@/lib/maintenance'
import type { Bike, ChatMessage } from '@/types'

function generateResponse(message: string, bike: Bike | undefined): string {
  const lower = message.toLowerCase()

  if (!bike) {
    return 'Du hast noch kein Bike angelegt. Geh zum Dashboard und erstelle zuerst ein Bike, damit ich dir helfen kann!'
  }

  const bikeName = bike.name
  const bikeType = BIKE_TYPE_LABELS[bike.type] ?? bike.type

  if (lower.includes('kette') || lower.includes('chain')) {
    const chain = bike.components.find(
      (c) => c.category === 'drivetrain' && c.name.toLowerCase().includes('kette'),
    )
    if (chain) {
      const wear = getComponentWear(chain, bike.totalKm)
      const status = getComponentStatus(wear)
      const kmLeft = getKmRemaining(chain, bike.totalKm)
      const statusColor = getStatusTextColor(status)
      return `Die Kette deines ${bikeName} hat einen Verschleiß von ${Math.round(wear)}% (Status: ${status}). Du hast noch ca. ${kmLeft} km, bevor ein Wechsel fällig ist. ${wear >= 80 ? 'Ich würde dir empfehlen, bald eine neue Kette zu besorgen!' : 'Sieht noch gut aus, weiter so!'}`
    }
    return `Ich sehe keine Kette als Komponente bei deinem ${bikeName}. Füg sie unter "Komponenten" hinzu, damit ich den Verschleiß tracken kann.`
  }

  if (lower.includes('reifen') || lower.includes('tire') || lower.includes('druck')) {
    const tires = bike.components.filter((c) => c.category === 'tires')
    if (tires.length > 0) {
      const info = tires
        .map((t) => {
          const wear = getComponentWear(t, bike.totalKm)
          const status = getComponentStatus(wear)
          return `${t.name}: ${Math.round(wear)}% Verschleiß (${status})`
        })
        .join(', ')
      const setup = bike.setups[0]
      const pressureInfo = setup
        ? ` Dein letztes Setup hat ${setup.tirePressureFront} bar vorne und ${setup.tirePressureRear} bar hinten.`
        : ''
      return `Reifenstatus für ${bikeName}: ${info}.${pressureInfo}`
    }
    return `Keine Reifen als Komponenten bei deinem ${bikeName} hinterlegt. Füg sie hinzu, um den Verschleiß zu tracken!`
  }

  if (
    lower.includes('wartung') ||
    lower.includes('service') ||
    lower.includes('maintenance')
  ) {
    const critical = bike.components.filter((c) => {
      const wear = getComponentWear(c, bike.totalKm)
      return wear >= 60
    })
    if (critical.length > 0) {
      const items = critical
        .map((c) => {
          const wear = getComponentWear(c, bike.totalKm)
          const status = getComponentStatus(wear)
          const daysLeft = getDaysRemaining(c)
          return `- ${c.name}: ${Math.round(wear)}% (${status}), noch ~${daysLeft} Tage`
        })
        .join('\n')
      return `Anstehende Wartung für ${bikeName}:\n${items}`
    }
    return `Alles im grünen Bereich bei deinem ${bikeName}! Keine dringenden Wartungen anstehend. Weiter so! 🛠️`
  }

  if (lower.includes('setup')) {
    const setupCount = bike.setups.length
    if (setupCount > 0) {
      return `Dein ${bikeName} hat ${setupCount} gespeicherte${setupCount === 1 ? 's' : ''} Setup${setupCount === 1 ? '' : 's'} im Setup-Vault. Schau dort vorbei, um deine Einstellungen zu vergleichen und zu optimieren!`
    }
    return `Du hast noch kein Setup für dein ${bikeName} gespeichert. Geh zum Setup-Vault und leg eins an – so hast du deine Einstellungen immer parat!`
  }

  const responses = [
    `Dein ${bikeName} (${bikeType}) hat aktuell ${bike.totalKm} km auf dem Tacho. Frag mich nach Kette, Reifen, Wartung oder Setup für detaillierte Infos!`,
    `Hey! Ich bin dein Crew Chief für dein ${bikeName}. Ich kann dir bei Wartungsfragen, Verschleißanalyse und Setup-Tipps helfen. Was möchtest du wissen?`,
    `Gute Frage! Für dein ${bikeName} empfehle ich regelmäßige Checks der Kette, Bremsbeläge und Reifen. Frag mich gezielt zu einer Komponente!`,
    `Dein ${bikeType} "${bikeName}" steht bei ${bike.totalKm} km. Denk daran, regelmäßig die Schrauben zu prüfen und die Kette zu ölen!`,
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function CrewChiefPage() {
  const hydrated = useHydration()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const chatMessages = useStore((s) => s.chatMessages)
  const bikes = useStore((s) => s.bikes)
  const activeBikeId = useStore((s) => s.activeBikeId)
  const addChatMessage = useStore((s) => s.addChatMessage)
  const clearChat = useStore((s) => s.clearChat)

  const activeBike = bikes.find((b) => b.id === activeBikeId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  function handleSend() {
    const text = input.trim()
    if (!text) return

    addChatMessage({ role: 'user', content: text })
    setInput('')

    setTimeout(() => {
      const response = generateResponse(text, activeBike)
      addChatMessage({ role: 'assistant', content: response })
    }, 500)
  }

  if (!hydrated) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-velo-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-velo-border px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-velo-accent" />
          <h1 className="text-lg font-semibold text-velo-text">AI Crew Chief</h1>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-velo-muted transition-colors hover:bg-velo-surface hover:text-velo-danger"
        >
          <Trash2 className="h-4 w-4" />
          Chat l&ouml;schen
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-velo-muted">
            <MessageCircle className="h-12 w-12 opacity-30" />
            <p className="text-lg">Frag mich etwas &uuml;ber dein Bike!</p>
            {activeBike && (
              <p className="text-sm">
                Aktives Bike: <span className="text-velo-accent">{activeBike.name}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-velo-accent/20 text-velo-text'
                        : 'bg-velo-surface text-velo-text'
                    }`}
                  >
                    {msg.content}
                    <div
                      className={`mt-1 text-xs ${
                        msg.role === 'user' ? 'text-velo-accent/50' : 'text-velo-muted/50'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-velo-border p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nachricht eingeben..."
            className="flex-1 rounded-xl border border-velo-border bg-velo-surface px-4 py-2.5 text-sm text-velo-text placeholder:text-velo-muted/50 focus:border-velo-accent focus:outline-none focus:ring-1 focus:ring-velo-accent"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-velo-accent text-velo-dark transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
