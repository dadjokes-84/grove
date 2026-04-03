// Grove Sports Data
// Sourced from QuickScores (CPD)
// Schema for sports schedules, teams, and games

export const sportsTeams = [
  // Baseball
  { id: 'cpd-baseball-u8', name: 'Baseball - U8', sport: 'baseball', ageGroup: '8U', season: 'Spring 2026' },
  { id: 'cpd-baseball-u10', name: 'Baseball - U10', sport: 'baseball', ageGroup: '10U', season: 'Spring 2026' },
  { id: 'cpd-baseball-u12', name: 'Baseball - U12', sport: 'baseball', ageGroup: '12U', season: 'Spring 2026' },
  
  // Softball
  { id: 'cpd-softball-u10', name: 'Softball - U10', sport: 'softball', ageGroup: '10U', season: 'Spring 2026' },
  { id: 'cpd-softball-u12', name: 'Softball - U12', sport: 'softball', ageGroup: '12U', season: 'Spring 2026' },
  
  // Soccer
  { id: 'cpd-soccer-u6', name: 'Soccer - U6', sport: 'soccer', ageGroup: '6U', season: 'Spring 2026' },
  { id: 'cpd-soccer-u8', name: 'Soccer - U8', sport: 'soccer', ageGroup: '8U', season: 'Spring 2026' },
  { id: 'cpd-soccer-u10', name: 'Soccer - U10', sport: 'soccer', ageGroup: '10U', season: 'Spring 2026' },
]

export const sportsGames = [
  // Placeholder: Will be populated from QuickScores scraper
  // Format:
  // {
  //   id: 'game-uuid',
  //   teamId: 'cpd-baseball-u10',
  //   homeTeam: 'Team Name',
  //   awayTeam: 'Opponent',
  //   gameDate: new Date(2026, 3, 5, 10, 0), // April 5, 2026 @ 10 AM
  //   location: 'Attucks Park',
  //   status: 'scheduled' | 'rainedout' | 'postponed' | 'completed',
  //   score: { home: null, away: null },
  //   rainoutAlert: false,
  //   source: 'quickscores'
  // }
]

/**
 * Sports categories for Grove filtering
 */
export const sportCategories = [
  { id: 'baseball', name: 'Baseball', icon: '⚾' },
  { id: 'softball', name: 'Softball', icon: '🥎' },
  { id: 'soccer', name: 'Soccer', icon: '⚽' },
  { id: 'football', name: 'Football', icon: '🏈' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
]

/**
 * Age group filters for sports
 */
export const ageGroups = [
  { id: '6u', label: 'U6 (5-6 yrs)' },
  { id: '8u', label: 'U8 (7-8 yrs)' },
  { id: '10u', label: 'U10 (9-10 yrs)' },
  { id: '12u', label: 'U12 (11-12 yrs)' },
  { id: '14u', label: 'U14 (13-14 yrs)' },
  { id: 'teen', label: 'Teen (15+)' },
  { id: 'adult', label: 'Adult' },
]
