/**
 * CPD Events Scraper
 * Fetches events from champaignparks.org and converts to Grove format
 * Run: node scripts/scrape-cpd.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Extract events from CPD events page
 * Uses heuristics to parse title, date, time, location, price, description
 */
async function scrapeCPDEvents() {
  try {
    const eventsUrl = 'https://www.champaignparks.org/events/'
    console.log('Fetching CPD events from', eventsUrl)

    const response = await fetch(eventsUrl)
    const html = await response.text()

    // Parse event blocks from the HTML
    // Each event is in a structure like:
    // <h2 or h3><a href="/event/...">Event Title</a></h2>
    // <p>Date @ Time</p>
    // <p>Location</p>
    // <p>Description</p>

    const events = []

    // Regex to find event sections
    const eventPattern = /href="(https:\/\/champaignparks\.org\/event\/[^"]+)">([^<]+)<\/a>[^]*?(?=<(?:h[2-3]|div|$))/gi
    
    let match
    const processedUrls = new Set()

    while ((match = eventPattern.exec(html)) !== null) {
      const [, url, title] = match
      
      // Skip duplicates
      if (processedUrls.has(url)) continue
      processedUrls.add(url)

      // Skip the exhibition (it's ongoing and clogs results)
      if (title.toLowerCase().includes('view from here')) continue

      // Extract date/time info from the surrounding text
      const sectionText = match[0]
      
      // Look for date patterns: "April 2 @ 5:00 pm – 7:00 pm"
      const dateMatch = sectionText.match(/([A-Za-z]+ \d{1,2})[^@]*@\s*([^\n–]+)\s*(?:–\s*([^\n<]+))?/i)
      const dateStr = dateMatch ? dateMatch[1] : 'TBD'
      const startTime = dateMatch ? dateMatch[2].trim() : 'TBD'
      const endTime = dateMatch && dateMatch[3] ? dateMatch[3].trim() : null

      // Look for location (usually in <p> tags)
      const locationMatch = sectionText.match(/(?:Location:|@)\s*([^<\n]+)/i)
      const location = locationMatch ? locationMatch[1].trim() : 'TBD'

      // Look for price
      const priceMatch = sectionText.match(/(?:Price:|Free|\\$[\d.]+)/i)
      const price = priceMatch ? priceMatch[0].trim() : 'Check website'

      // Extract description
      const descMatch = sectionText.match(/(?:<p>|)\s*([^<]{50,300})(?:<|$)/i)
      const description = descMatch ? descMatch[1].trim() : ''

      // Infer age group from title/description
      const text = (title + ' ' + description).toLowerCase()
      let ageMin = 0
      let ageMax = 99
      let ageLabel = 'All Ages'

      if (text.includes('teen') || text.includes('ages 13')) {
        ageMin = 13
        ageMax = 17
        ageLabel = 'Teens'
      } else if (text.includes('adult') || text.includes('age 18')) {
        ageMin = 18
        ageMax = 99
        ageLabel = 'Adults'
      } else if (text.includes('kid') || text.includes('age 3') || text.includes('age 5') || text.includes('age 8')) {
        ageMin = 3
        ageMax = 12
        ageLabel = 'Kids'
      } else if (text.includes('under') && text.match(/\d+/)) {
        const ageMatch = text.match(/(\d+)\s*&\s*under|under\s*(\d+)/i)
        if (ageMatch) {
          const maxAge = parseInt(ageMatch[1] || ageMatch[2])
          ageMin = 0
          ageMax = maxAge
        }
      }

      // Infer category
      let category = 'general'
      if (text.includes('stem') || text.includes('science') || text.includes('code') || text.includes('3d print')) {
        category = 'stem'
      } else if (text.includes('sport') || text.includes('basketball') || text.includes('game') || text.includes('hunt')) {
        category = 'sports'
      } else if (text.includes('dance') || text.includes('art') || text.includes('theatre') || text.includes('music')) {
        category = 'arts'
      } else if (text.includes('nature') || text.includes('creek') || text.includes('farm') || text.includes('park')) {
        category = 'nature'
      }

      const isFree = price.toLowerCase() === 'free' || price.toLowerCase().includes('free')

      events.push({
        id: events.length + 1,
        title,
        date: dateStr,
        time: startTime + (endTime ? ` – ${endTime}` : ''),
        location,
        price,
        description,
        tags: [
          isFree ? 'free' : 'paid',
          ...(ageLabel === 'Kids' ? ['kids'] : []),
          ...(ageLabel === 'Teens' ? ['teens'] : []),
          ...(ageLabel === 'Adults' ? ['adults'] : []),
          category,
          'family'
        ],
        categories: [category],
        ageMin,
        ageMax,
        ageLabel,
        url,
        // Parse date object for filtering
        dateObj: parseDate(dateStr)
      })
    }

    return events
  } catch (err) {
    console.error('Error scraping CPD:', err.message)
    return []
  }
}

/**
 * Convert month names to numbers for date parsing
 */
function parseDate(dateStr) {
  const months = {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
  }

  const match = dateStr.match(/([A-Za-z]+)\s+(\d{1,2})/)
  if (!match) return new Date() // Default to today

  const month = months[match[1].toLowerCase()]
  const day = parseInt(match[2])
  const year = 2026 // Current year

  return new Date(year, month, day)
}

/**
 * Main execution
 */
async function main() {
  console.log('🌳 Grove CPD Events Scraper')
  console.log('============================\n')

  const events = await scrapeCPDEvents()

  if (events.length === 0) {
    console.log('⚠️  No events found. Check the scraper regex.')
    process.exit(1)
  }

  // Save to data file
  const outputPath = path.join(__dirname, '../src/data/events.js')
  const jsContent = `export const events = ${JSON.stringify(events, null, 2).replace(/"dateObj":\s*"([^"]+)"/g, '"dateObj": new Date("$1")')}\n`

  fs.writeFileSync(outputPath, jsContent)
  console.log(`✅ Scraped ${events.length} events from CPD`)
  console.log(`📝 Saved to ${outputPath}\n`)

  // Show summary
  console.log('Sample events:')
  events.slice(0, 3).forEach(e => {
    console.log(`  - ${e.title} (${e.date}, ${e.ageLabel})`)
  })
  console.log()
}

main()
