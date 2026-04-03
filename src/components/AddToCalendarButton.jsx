import { useState } from 'react'
import {
  downloadICalEvent,
  getGoogleCalendarLink,
  getOutlookCalendarLink,
  getAppleCalendarLink
} from '../utils/calendar'

export default function AddToCalendarButton({ event }) {
  const [showMenu, setShowMenu] = useState(false)

  const handleGoogleCalendar = () => {
    const link = getGoogleCalendarLink(event)
    window.open(link, '_blank')
    setShowMenu(false)
  }

  const handleOutlookCalendar = () => {
    const link = getOutlookCalendarLink(event)
    window.open(link, '_blank')
    setShowMenu(false)
  }

  const handleAppleCalendar = () => {
    downloadICalEvent(event)
    setShowMenu(false)
  }

  const handleDownloadICS = () => {
    downloadICalEvent(event)
    setShowMenu(false)
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition text-sm font-medium"
      >
        📅 Add to Calendar
      </button>

      {showMenu && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
          <button
            onClick={handleGoogleCalendar}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b text-sm"
          >
            Google Calendar
          </button>
          <button
            onClick={handleOutlookCalendar}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b text-sm"
          >
            Outlook / Microsoft 365
          </button>
          <button
            onClick={handleAppleCalendar}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b text-sm"
          >
            Apple Calendar
          </button>
          <button
            onClick={handleDownloadICS}
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
          >
            Download .ics file
          </button>
        </div>
      )}
    </div>
  )
}
