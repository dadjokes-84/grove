import { useState } from 'react'

export default function NotificationsTab() {
  const [toast, setToast] = useState(false)

  const handleEnable = () => {
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
      {/* Bell icon */}
      <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
        <span className="text-5xl">🔔</span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Stay in the Loop</h2>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        Notifications coming soon. We'll remind you when registration opens, events are nearby, and deadlines are approaching.
      </p>

      <button
        onClick={handleEnable}
        className="w-full max-w-xs bg-[#2d6a4f] text-white font-semibold py-3.5 rounded-xl hover:bg-[#245a42] active:scale-95 transition-all"
      >
        Enable Notifications
      </button>

      <p className="text-gray-400 text-xs mt-4">You can change this anytime in settings.</p>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-lg z-50 animate-pulse">
          Coming soon! 🚀
        </div>
      )}
    </div>
  )
}
