import { useState } from 'react'
import { events } from '../data/events'
import { EventCard } from './EventsTab'

const programs = [
  {
    id: 'athletics',
    emoji: '🏃',
    title: 'Athletics',
    subtitle: 'Youth & adult sports leagues, open gym',
    description: 'From youth recreational leagues to adult sports and open gym sessions, the Champaign Park District offers a full range of athletic programming. Whether you\'re just starting out or staying active, there\'s something for every skill level.',
    color: 'bg-orange-50 border-orange-200',
    emojiColor: 'bg-orange-100',
    amilia: 'Athletics - 2026',
  },
  {
    id: 'aquatics',
    emoji: '🏊',
    title: 'Aquatics',
    subtitle: 'Swim lessons, lap swim, water exercise',
    description: 'The Sholem Aquatic Center is open Memorial Day through Labor Day. Enjoy open swim, Walk the River, Tiny Tots Splash Time, lap swim, and more. Pool memberships available.',
    color: 'bg-blue-50 border-blue-200',
    emojiColor: 'bg-blue-100',
    amilia: 'Aquatics - Summer 2026',
  },
  {
    id: 'dance',
    emoji: '💃',
    title: 'Dance Arts Conservatory',
    subtitle: 'Ballet, dance instruction for all ages',
    description: 'The Dance Arts Conservatory provides safe, high-quality dance instruction for all. Programs promote self-esteem, personal growth, and discipline through a variety of dance styles. Registration deadline is 7 days prior to start date.',
    color: 'bg-pink-50 border-pink-200',
    emojiColor: 'bg-pink-100',
    amilia: 'Dance Arts Conservatory 2026',
  },
  {
    id: 'early-childhood',
    emoji: '🧒',
    title: 'Early Childhood',
    subtitle: 'Programs for young children & families',
    description: 'Developmentally appropriate programs for infants, toddlers, and preschoolers. Activities build motor skills, social development, and early learning through play-based experiences.',
    color: 'bg-yellow-50 border-yellow-200',
    emojiColor: 'bg-yellow-100',
    amilia: 'Early Childhood 2026',
  },
  {
    id: 'summer-camps',
    emoji: '⛺',
    title: 'Summer Camps',
    subtitle: 'Day camps for kids all summer long',
    description: 'A wide variety of summer camp options across sports, arts, STEM, and outdoor exploration. Something for every age and interest — from half-day camps to full-week adventures.',
    color: 'bg-green-50 border-green-200',
    emojiColor: 'bg-green-100',
    amilia: 'Summer Camps 2026',
  },
  {
    id: 'fitness',
    emoji: '💪',
    title: 'Fitness & Wellness',
    subtitle: 'Group fitness, personal training, wellness',
    description: 'Stay active year-round with group fitness classes, personal training, and wellness programs at Park District facilities. Options for all fitness levels and ages.',
    color: 'bg-red-50 border-red-200',
    emojiColor: 'bg-red-100',
    amilia: 'Fitness and Wellness - 2026',
  },
  {
    id: 'performing-arts',
    emoji: '🎭',
    title: 'Performing Arts',
    subtitle: 'Theatre, music, and performance programs',
    description: 'From theatre productions to music programs, the Champaign Park District brings the performing arts to the community. Programs available for youth and adults at the Virginia Theatre and beyond.',
    color: 'bg-purple-50 border-purple-200',
    emojiColor: 'bg-purple-100',
    amilia: 'Performing Arts - 2026',
  },
  {
    id: 'visual-arts',
    emoji: '🎨',
    title: 'Visual Arts',
    subtitle: 'Painting, drawing, ceramics & more',
    description: 'Explore your creative side through visual arts classes at the Springer Cultural Center and other facilities. Programs for all skill levels, from beginner to advanced.',
    color: 'bg-fuchsia-50 border-fuchsia-200',
    emojiColor: 'bg-fuchsia-100',
    amilia: 'Visual Arts - 2026',
  },
  {
    id: 'stem',
    emoji: '🔬',
    title: 'STEM & Education',
    subtitle: 'Martens Center STEAM Lab, coding, science',
    description: 'The Martens Center STEAM Lab is a hub for hands-on learning. Coding for Kids, Science Jr. Adventure, Family STEM Night — partnering with the University of Illinois and local educators to bring exciting STEM programs to all ages.',
    color: 'bg-sky-50 border-sky-200',
    emojiColor: 'bg-sky-100',
    amilia: null,
  },
  {
    id: 'racquet',
    emoji: '🎾',
    title: 'Racquet Sports',
    subtitle: 'Tennis, pickleball, and more',
    description: 'The Dodds Tennis Center offers lessons and leagues for all skill levels. Pickleball and other racquet sports are available seasonally across Park District facilities.',
    color: 'bg-lime-50 border-lime-200',
    emojiColor: 'bg-lime-100',
    amilia: 'Racquet Sports - 2026',
  },
  {
    id: 'special-interest',
    emoji: '⭐',
    title: 'Special Interest',
    subtitle: 'Unique classes and one-of-a-kind programs',
    description: 'A rotating selection of specialty programs that don\'t fit neatly into other categories — cooking, crafts, life skills, and more. Check the Amilia store for what\'s currently available.',
    color: 'bg-amber-50 border-amber-200',
    emojiColor: 'bg-amber-100',
    amilia: 'Special Interest - 2026',
  },
  {
    id: 'afterschool',
    emoji: '🏫',
    title: 'Afterschool & Days Out',
    subtitle: 'Afterschool care & school\'s out programs',
    description: 'Year-round afterschool programming at Leonhard Recreation Center and Douglass Community Center. A $50 deposit is required. School\'s Out Day programs available on days off from school.',
    color: 'bg-indigo-50 border-indigo-200',
    emojiColor: 'bg-indigo-100',
    amilia: "Afterschool/School's Out Day Programs 2025/2026",
  },
  {
    id: 'prairie-farm',
    emoji: '🌾',
    title: 'Prairie Farm',
    subtitle: 'Outdoor education & farm experiences',
    description: 'Prairie Farm offers hands-on outdoor education for school groups and families. Spring field trips connect students with nature, agriculture, and Illinois heritage.',
    color: 'bg-emerald-50 border-emerald-200',
    emojiColor: 'bg-emerald-100',
    amilia: 'Prairie Farm 2026',
  },
  {
    id: 'active-seniors',
    emoji: '🧓',
    title: 'Active Seniors',
    subtitle: 'Programs designed for older adults',
    description: 'Fitness, social, and enrichment programs tailored for active seniors. Stay healthy, connected, and engaged with programs designed specifically for older adults in the Champaign community.',
    color: 'bg-teal-50 border-teal-200',
    emojiColor: 'bg-teal-100',
    amilia: 'Active Seniors - 2026',
  },
  {
    id: 'events-races',
    emoji: '🏅',
    title: 'Events & Races',
    subtitle: 'Community events, fun runs & competitions',
    description: 'Community-wide events and organized races throughout the year. From seasonal celebrations to athletic competitions, these events bring the Champaign community together.',
    color: 'bg-rose-50 border-rose-200',
    emojiColor: 'bg-rose-100',
    amilia: 'Events and Races - 2026',
  },
  {
    id: 'special-rec',
    emoji: '♿',
    title: 'Special Recreation',
    subtitle: 'CUSR — inclusive programming for all abilities',
    description: 'The Champaign-Urbana Special Recreation (CUSR) program provides high-quality, inclusive recreation for individuals with disabilities. Programming ensures everyone in the community can participate and thrive.',
    color: 'bg-cyan-50 border-cyan-200',
    emojiColor: 'bg-cyan-100',
    amilia: 'Champaign Urbana Special Recreation: Winter/Spring After School & Days Out 2026',
  },
  {
    id: 'scholarships',
    emoji: '🎓',
    title: 'Scholarships',
    subtitle: 'Youth scholarship program, reduced fees',
    description: 'No child should miss out on Park District programs due to financial hardship. The Youth Scholarship Program helps reduce or eliminate fees for qualifying families — so every kid in Champaign has access to sports, arts, and enrichment.',
    color: 'bg-yellow-50 border-yellow-200',
    emojiColor: 'bg-yellow-100',
    amilia: null,
  },
]

export default function ProgramsTab() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    const prog = programs.find(p => p.id === selected)
    const relatedEvents = events.filter(e => e.categories.includes(selected))

    return (
      <div className="px-4 py-4">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-[#2d6a4f] text-sm font-medium mb-4"
        >
          ← Back to Programs
        </button>

        <div className={`rounded-2xl border p-5 mb-5 ${prog.color}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4 ${prog.emojiColor}`}>
            {prog.emoji}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{prog.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{prog.subtitle}</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">{prog.description}</p>
          <a
            href="https://app.amilia.com/store/en/champaignparks/shop/programs"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#2d6a4f] text-white font-semibold py-3 rounded-xl hover:bg-[#245a42] transition-colors"
          >
            Register on Amilia →
          </a>
        </div>

        {relatedEvents.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              Upcoming Events
            </h3>
            <div className="flex flex-col gap-3">
              {relatedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {relatedEvents.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            <p>No upcoming events in this category.</p>
            <p className="mt-1">Check Amilia for current class schedules.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="px-4 py-4">
      <p className="text-gray-500 text-sm mb-4">Explore what the Champaign Park District offers.</p>
      <div className="grid grid-cols-2 gap-3">
        {programs.map(prog => {
          const count = events.filter(e => e.categories.includes(prog.id)).length
          return (
            <button
              key={prog.id}
              onClick={() => setSelected(prog.id)}
              className={`rounded-2xl border p-4 text-left flex flex-col gap-2 active:scale-95 transition-transform ${prog.color}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${prog.emojiColor}`}>
                {prog.emoji}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm leading-snug">{prog.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{prog.subtitle}</p>
              </div>
              {count > 0 && (
                <span className="text-xs font-medium text-[#2d6a4f]">
                  {count} upcoming event{count !== 1 ? 's' : ''}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
