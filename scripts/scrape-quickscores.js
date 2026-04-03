/**
 * QuickScores CPD Scraper
 * Fetches sports schedules from quickscores.com/cpd
 * Run: node scripts/scrape-quickscores.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Scrape QuickScores CPD page for sports schedules
 * Note: QuickScores has an API available; this scraper extracts from HTML
 * For production, consider using their API with proper credentials
 */
async function scrapeQuickScores() {
  try {
    const baseUrl = 'https://www.quickscores.com'
    const cpdUrl = `${baseUrl}/cpd`

    console.log('Fetching QuickScores CPD schedules from', cpdUrl)

    const response = await fetch(cpdUrl)
    const html = await response.text()

    // Extract sport categories and leagues from the page
    // Pattern: Look for schedule links
    const games = []

    // This is a placeholder implementation
    // The actual QuickScores page structure requires more detailed parsing
    // Better approach: Use QuickScores API (available via their developer kit)

    console.log('⚠️  QuickScores HTML parsing requires reverse engineering their dynamic UI.')
    console.log('📌 Recommended: Request API access from QuickScores directly.')
    console.log('   Contact: quickscores.com/Help (they offer public API)')
    console.log('   CPD org: quickscores.com/cpd')

    return games
  } catch (err) {
    console.error('Error scraping QuickScores:', err.message)
    return []
  }
}

/**
 * Monitor RainoutLine for cancellations
 */
async function checkRainoutLine() {
  try {
    const rainoutUrl = 'https://rainoutline.com/search/dnis/2178054100'
    
    console.log('Checking RainoutLine for CPD cancellations...')
    
    const response = await fetch(rainoutUrl)
    const html = await response.text()

    // Extract rainout status from the page
    // RainoutLine shows: "No Cancellations" or lists cancelled games

    const noCancellations = html.includes('No Cancellations') || html.includes('no cancellations')
    
    return {
      hasRainouts: !noCancellations,
      lastChecked: new Date().toISOString(),
      url: rainoutUrl
    }
  } catch (err) {
    console.error('Error checking RainoutLine:', err.message)
    return { hasRainouts: false, error: err.message }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🏟️  Grove QuickScores + RainoutLine Monitor')
  console.log('==========================================\n')

  // Check rainout status
  const rainoutStatus = await checkRainoutLine()
  console.log('Rainout Status:', rainoutStatus)

  // Scrape schedules
  const games = await scrapeQuickScores()
  console.log(`\n✅ Scraped ${games.length} games`)

  // Note about API integration
  console.log(`
📋 NEXT STEPS:
1. Get QuickScores API credentials (contact quickscores.com)
2. Implement API client for direct schedule fetching
3. Set up cron job to sync games daily
4. Add push notifications for rainouts

🔗 Resources:
- QuickScores API Docs: https://www.quickscores.com/Help
- CPD Sports Manager: justice.miller@champaignparks.org
  `)
}

main()
