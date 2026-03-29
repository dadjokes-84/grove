const locations = [
  {
    emoji: '🌳',
    name: 'Douglass Park',
    description: 'A beloved community park featuring open green space, seasonal events, and gathering areas for families and neighbors.',
    hours: 'Open daily, dawn to dusk',
    tags: ['Park', 'Events'],
  },
  {
    emoji: '🏀',
    name: 'West Side Park',
    description: 'Home to seasonal egg hunts and open recreation. A neighborhood staple for outdoor fun throughout the year.',
    hours: 'Open daily, dawn to dusk',
    tags: ['Park', 'Recreation'],
  },
  {
    emoji: '🔬',
    name: 'Martens Center STEAM Lab',
    description: 'State-of-the-art facility offering coding, science, and STEM programming for kids of all ages in partnership with local educators.',
    hours: 'Varies by program',
    tags: ['Facility', 'STEM'],
  },
  {
    emoji: '🎭',
    name: 'Virginia Theatre',
    description: 'A stunning historic theatre built in 1921. Host to concerts, live performances, community events, and film screenings year-round.',
    hours: 'Event-based hours',
    tags: ['Venue', 'Arts'],
  },
  {
    emoji: '🎨',
    name: 'Springer Cultural Center',
    description: 'Located in downtown Champaign, the Springer hosts rotating art exhibitions and cultural programming for the community.',
    hours: 'Tue–Sat, hours vary',
    tags: ['Venue', 'Arts'],
  },
  {
    emoji: '🌾',
    name: 'Prairie Farm',
    description: 'An outdoor nature education site popular for spring field trips. Offers hands-on nature learning in a beautiful prairie setting.',
    hours: 'Seasonal, by appointment',
    tags: ['Outdoor', 'Education'],
  },
  {
    emoji: '🏊',
    name: 'Pools',
    description: 'Multiple aquatic locations across Champaign open seasonally. Check the website for locations, lap swim hours, and family swim schedules.',
    hours: 'Seasonal — Memorial Day to Labor Day',
    tags: ['Facility', 'Aquatics'],
  },
]

const tagColors = {
  Park: 'bg-green-100 text-green-800',
  Events: 'bg-yellow-100 text-yellow-800',
  Recreation: 'bg-orange-100 text-orange-800',
  Facility: 'bg-blue-100 text-blue-800',
  STEM: 'bg-indigo-100 text-indigo-800',
  Venue: 'bg-purple-100 text-purple-800',
  Arts: 'bg-pink-100 text-pink-800',
  Outdoor: 'bg-teal-100 text-teal-800',
  Education: 'bg-cyan-100 text-cyan-800',
  Aquatics: 'bg-sky-100 text-sky-800',
}

export default function ParksTab() {
  return (
    <div className="px-4 py-4">
      <p className="text-gray-500 text-sm mb-4">Parks, facilities, and venues across Champaign.</p>
      <div className="flex flex-col gap-3">
        {locations.map(loc => (
          <div key={loc.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl flex-shrink-0">
                {loc.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">{loc.name}</h3>
                <div className="flex gap-1.5 mt-1 mb-2 flex-wrap">
                  {loc.tags.map(tag => (
                    <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{loc.description}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span>🕐</span>
                  <span>{loc.hours}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
