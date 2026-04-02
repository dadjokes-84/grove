import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function AdminPanel({ onLogout }) {
  const [teams, setTeams] = useState([])
  const [formType, setFormType] = useState('addTeam') // addTeam, addSchedule
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Form state
  const [teamForm, setTeamForm] = useState({
    name: '',
    sport: '',
    season: '',
    coach_name: '',
  })

  const [scheduleForm, setScheduleForm] = useState({
    team_id: '',
    opponent: '',
    game_date: '',
    location: '',
  })

  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    const { data, error } = await supabase.from('grove_teams').select('*').order('name')
    if (error) {
      console.error(error)
      setMessage('Error loading teams')
    } else {
      setTeams(data || [])
    }
  }

  const handleAddTeam = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('grove_teams').insert([teamForm])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('✓ Team added')
      setTeamForm({ name: '', sport: '', season: '', coach_name: '' })
      fetchTeams()
    }
    setLoading(false)
  }

  const handleAddSchedule = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.from('grove_schedules').insert([
      {
        team_id: parseInt(scheduleForm.team_id),
        opponent: scheduleForm.opponent,
        game_date: scheduleForm.game_date,
        location: scheduleForm.location,
      },
    ])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('✓ Schedule added')
      setScheduleForm({ team_id: '', opponent: '', game_date: '', location: '' })
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('groveAdminAuth')
    onLogout()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">Grove Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.startsWith('✓')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setFormType('addTeam')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              formType === 'addTeam'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Add Team
          </button>
          <button
            onClick={() => setFormType('addSchedule')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              formType === 'addSchedule'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Add Schedule
          </button>
        </div>

        {/* Add Team Form */}
        {formType === 'addTeam' && (
          <form onSubmit={handleAddTeam} className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add a New Team</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team Name *
              </label>
              <input
                type="text"
                value={teamForm.name}
                onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                required
                placeholder="e.g., U12 Baseball"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sport *</label>
              <select
                value={teamForm.sport}
                onChange={(e) => setTeamForm({ ...teamForm, sport: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a sport</option>
                <option value="Baseball">Baseball</option>
                <option value="Softball">Softball</option>
                <option value="Soccer">Soccer</option>
                <option value="Basketball">Basketball</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Football">Football</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
              <input
                type="text"
                value={teamForm.season}
                onChange={(e) => setTeamForm({ ...teamForm, season: e.target.value })}
                placeholder="e.g., Spring 2026"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coach Name</label>
              <input
                type="text"
                value={teamForm.coach_name}
                onChange={(e) => setTeamForm({ ...teamForm, coach_name: e.target.value })}
                placeholder="e.g., John Smith"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Team'}
            </button>
          </form>
        )}

        {/* Add Schedule Form */}
        {formType === 'addSchedule' && (
          <form
            onSubmit={handleAddSchedule}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add Game Schedule</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team *</label>
              <select
                value={scheduleForm.team_id}
                onChange={(e) => setScheduleForm({ ...scheduleForm, team_id: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opponent *
              </label>
              <input
                type="text"
                value={scheduleForm.opponent}
                onChange={(e) => setScheduleForm({ ...scheduleForm, opponent: e.target.value })}
                required
                placeholder="e.g., Urbana Wildcats"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Game Date & Time *
              </label>
              <input
                type="datetime-local"
                value={scheduleForm.game_date}
                onChange={(e) => setScheduleForm({ ...scheduleForm, game_date: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({ ...scheduleForm, location: e.target.value })}
                placeholder="e.g., Memorial Stadium, Field 2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Schedule'}
            </button>
          </form>
        )}

        {/* Teams List */}
        {teams.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Current Teams</h2>
            <div className="space-y-2">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{team.name}</p>
                    <p className="text-sm text-gray-600">
                      {team.sport} • {team.season || 'Season TBD'}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">Coach: {team.coach_name || '-'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
