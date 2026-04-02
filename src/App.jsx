import { useState, useEffect } from 'react'
import EventsTab from './tabs/EventsTab'
import ProgramsTab from './tabs/ProgramsTab'
import ParksTab from './tabs/ParksTab'
import NotificationsTab from './tabs/NotificationsTab'
import AdminLogin from './tabs/AdminLogin'
import AdminPanel from './tabs/AdminPanel'

const tabs = [
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'programs', label: 'Programs', icon: '🎯' },
  { id: 'parks', label: 'Parks', icon: '🌳' },
  { id: 'notifications', label: 'Alerts', icon: '🔔' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('events')
  const [adminMode, setAdminMode] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem('groveAdminAuth') === 'true'
    setIsAdminAuthenticated(isAuth)
  }, [])

  // Admin login flow
  if (adminMode && !isAdminAuthenticated) {
    return (
      <AdminLogin
        onLogin={() => {
          setIsAdminAuthenticated(true)
        }}
      />
    )
  }

  // Admin panel
  if (adminMode && isAdminAuthenticated) {
    return (
      <AdminPanel
        onLogout={() => {
          setAdminMode(false)
          setIsAdminAuthenticated(false)
          localStorage.removeItem('groveAdminAuth')
        }}
      />
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-[430px] bg-white min-h-screen flex flex-col shadow-xl relative">
        {/* Header */}
        <header className="bg-[#2d6a4f] text-white px-4 pt-10 pb-4 flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">🌿 Grove</h1>
              <p className="text-green-200 text-sm mt-0.5">Find your grove. · Champaign Park District</p>
            </div>
            <button
              onClick={() => setAdminMode(true)}
              className="text-green-200 hover:text-white transition text-xs opacity-50 hover:opacity-100"
              title="Admin"
            >
              ⚙️
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto pb-20">
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'programs' && <ProgramsTab />}
          {activeTab === 'parks' && <ParksTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
        </main>

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 flex z-50 shadow-lg">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[#2d6a4f]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 w-12 h-0.5 bg-[#2d6a4f] rounded-t-full" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
