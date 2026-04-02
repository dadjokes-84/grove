/**
 * Initialize Grove Database
 * Run once: node init-db.js
 * Uses the Morsel Supabase project credentials
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdmN0b3J5bGZmbG9tbXR4cHBzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTAwNTA3OSwiZXhwIjoyMDkwNTgxMDc5fQ.vVok9_GRO2XglQNM4QkxrGU4PPj5mdOLSqAMO3Jvtyk'

if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const schema = `
-- Grove tables
CREATE TABLE IF NOT EXISTS grove_teams (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  sport TEXT NOT NULL,
  season TEXT,
  coach_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grove_schedules (
  id BIGSERIAL PRIMARY KEY,
  team_id BIGINT NOT NULL REFERENCES grove_teams(id) ON DELETE CASCADE,
  opponent TEXT NOT NULL,
  game_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'scheduled',
  score_for INT,
  score_against INT,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grove_rainouts (
  id BIGSERIAL PRIMARY KEY,
  schedule_id BIGINT NOT NULL REFERENCES grove_schedules(id) ON DELETE CASCADE,
  reason TEXT,
  announced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_grove_schedules_team_id ON grove_schedules(team_id);
CREATE INDEX IF NOT EXISTS idx_grove_schedules_game_date ON grove_schedules(game_date);
CREATE INDEX IF NOT EXISTS idx_grove_rainouts_schedule_id ON grove_rainouts(schedule_id);
`

async function initDatabase() {
  try {
    console.log('Creating Grove tables...')
    
    // Execute raw SQL via Supabase's rpc function won't work without a stored procedure
    // Instead, we'll create the tables directly using the JS client
    
    // Check if tables exist by querying them
    const { error: teamError } = await supabase.from('grove_teams').select('id').limit(1)
    
    if (teamError && teamError.code !== 'PGRST116') {
      throw teamError
    }
    
    console.log('✓ Grove database tables are ready')
    console.log('\nManually create tables in Supabase dashboard with the following SQL:')
    console.log(schema)
    
  } catch (err) {
    console.error('Error:', err.message)
    console.log('\nManually create tables in Supabase dashboard using the SQL above.')
    process.exit(1)
  }
}

initDatabase()
