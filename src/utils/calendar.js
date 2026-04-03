/**
 * Calendar Export Utilities
 * Generate iCal files and calendar links for events/games
 */

/**
 * Generate iCal format (.ics) for an event
 * Compatible with Google Calendar, Apple Calendar, Outlook, etc.
 */
export function generateICalEvent(event) {
  // Parse event date and time
  const eventDate = event.dateObj || new Date(event.date)
  
  // Format date/time as iCal UTC format (YYYYMMDDTHHMMSSZ)
  const formatICalDate = (date) => {
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
  }

  const uid = `grove-${event.id}@grove.local`
  const created = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  // Build iCal event
  const icalEvent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Grove//Park District Events//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${created}
DTSTART:${formatICalDate(eventDate)}
SUMMARY:${escapeICalText(event.title)}
DESCRIPTION:${escapeICalText(event.description || '')}
LOCATION:${escapeICalText(event.location || '')}
URL:${event.url || ''}
CATEGORIES:${event.categories ? event.categories.join(',') : 'Event'}
END:VEVENT
END:VCALENDAR`

  return icalEvent
}

/**
 * Escape special characters in iCal text fields
 */
function escapeICalText(text) {
  if (!text) return ''
  return text
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n')
}

/**
 * Download iCal file
 */
export function downloadICalEvent(event) {
  const ical = generateICalEvent(event)
  const blob = new Blob([ical], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${event.title.replace(/\s+/g, '-')}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generate Google Calendar add link
 * Opens Google Calendar intent with event details
 */
export function getGoogleCalendarLink(event) {
  const eventDate = event.dateObj || new Date(event.date)
  const startTime = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  
  // Calculate end time (2 hours later if not specified)
  const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
  const endTime = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${startTime}/${endTime}`,
    trp: false
  })

  return `https://calendar.google.com/calendar/render?${params}`
}

/**
 * Generate Apple Calendar link
 * Uses webcal:// protocol
 */
export function getAppleCalendarLink(event) {
  const ical = generateICalEvent(event)
  const encoded = encodeURIComponent(ical)
  
  // This would require hosting the .ics file or using a service
  // For now, return the iCal data that user can save
  return { ical, filename: `${event.title.replace(/\s+/g, '-')}.ics` }
}

/**
 * Generate Outlook add link
 * Opens Outlook intent
 */
export function getOutlookCalendarLink(event) {
  const eventDate = event.dateObj || new Date(event.date)
  const startTime = eventDate.toISOString()

  const params = new URLSearchParams({
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: startTime,
    enddt: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000).toISOString()
  })

  return `https://outlook.live.com/calendar/0/compose?${params}`
}

/**
 * Get all calendar link options for an event
 */
export function getCalendarLinks(event) {
  return {
    google: getGoogleCalendarLink(event),
    apple: getAppleCalendarLink(event),
    outlook: getOutlookCalendarLink(event),
    ical: generateICalEvent(event)
  }
}
