import { useState } from 'react'
import { events } from '../data/events'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'free', label: '🎟️ Free' },
  { id: 'family', label: '👨‍👩‍👧 Family' },
  { id: 'kids', label: '🧒 Kids' },
  { id: 'adults', label: '🧑 Adults' },
  { id: 'sports', label: '🏅 Sports' },
]

const ageGroups = [
  { id: 'all-ages', label: 'All Ages', min: 0, max: 99 },
  { id: 'toddler', label: 'Toddler (0–4)', min: 0, max: 4 },
  { id: 'kids', label: 'Kids (5–12)', min: 5, max: 12 },
  { id: 'teen', label: 'Teen (13–17)', min: 13, max: 17 },
  { id: 'adult', label: 'Adult (18+)', min: 18, max: 99 },
]

// "Free this weekend" = events that are free and within the next 7 days
function isFreeThisWeekend(event) {
  const today = new Date(2026, 2, 29) // March 29, 2026 (demo date)
  const weekEnd = new Date(today)
  weekEnd.setDate(today.getDate() + 7)
  return event.price === 'Free' && event.dateObj >= today && event.dateObj <= weekEnd
}

export default function EventsTab() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeAge, setActiveAge] = useState('all-ages')
  const [freeWeekendOnly, setFreeWeekendOnly] = useState(false)

  const ageGroup = ageGroups.find(a => a.id === activeAge)

  const filtered = events.filter(event => {
    const matchesTag = activeFilter === 'all' || event.tags.includes(activeFilter)
    const matchesAge = activeAge === 'all-ages' || (event.ageMin <= ageGroup.max && event.ageMax >= ageGroup.min)
    const matchesWeekend = !freeWeekendOnly || isFreeThisWeekend(event)
    return matchesTag && matchesAge && matchesWeekend
  })

  return (
    <div className="px-4 py-4">

      {/* Quick action — Free this weekend */}
      <button
        onClick={() => setFreeWeekendOnly(!freeWeekendOnly)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl mb-4 border transition-colors ${
          freeWeekendOnly
            ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
            : 'bg-green-50 text-[#2d6a4f] border-green-200 hover:bg-green-100'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <span className="font-semibold text-sm">Free this weekend</span>
        </div>
        <span className="text-xs font-medium opacity-75">
          {freeWeekendOnly ? 'Clear' : `${events.filter(isFreeThisWeekend).length} events`}
        </span>
      </button>

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === f.id
                ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                : 'bg-white text-gray-600 border-gray-300 hover:border-[#2d6a4f]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Age group filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {ageGroups.map(a => (
          <button
            key={a.id}
            onClick={() => setActiveAge(a.id)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              activeAge === a.id
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-gray-500 border-gray-200 hover:border-amber-400'
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Event cards */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No events match these filters.</p>
            <button
              onClick={() => { setActiveFilter('all'); setActiveAge('all-ages'); setFreeWeekendOnly(false) }}
              className="mt-3 text-[#2d6a4f] text-sm font-medium underline"
            >
              Clear all filters
            </button>
          </div>
        )}
        {filtered.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}

export function EventCard({ event }) {
  const isFree = event.price === 'Free'
  const isPaid = event.price !== 'Free' && event.price !== 'TBD'
  const borderColor = isFree ? 'border-[#2d6a4f]' : isPaid ? 'border-blue-500' : 'border-gray-300'
  const priceBg = isFree ? 'bg-green-100 text-green-800' : isPaid ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'

  const ageLabel = event.ageMax === 99 && event.ageMin === 0
    ? null
    : event.ageMax === 99
    ? `Ages ${event.ageMin}+`
    : event.ageMin === 0
    ? `Ages ${event.ageMax} & under`
    : `Ages ${event.ageMin}–${event.ageMax}`

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 pl-4 pr-4 py-4 border-l-4 ${borderColor}`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{event.title}</h3>
        <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${priceBg}`}>
          {event.price}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
        <span>📅</span>
        <span>{event.date}</span>
        <span className="mx-1">·</span>
        <span>🕐</span>
        <span>{event.time}</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <span>📍</span>
        <span className="truncate">{event.location}</span>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed mb-2">{event.description}</p>
      {ageLabel && (
        <span className="inline-block text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
          {ageLabel}
        </span>
      )}
    </div>
  )
}
