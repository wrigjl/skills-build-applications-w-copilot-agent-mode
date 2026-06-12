import { useEffect, useState } from 'react'
import { requestCollection } from '../lib/api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    requestCollection('teams')
      .then((rows) => {
        if (mounted) setTeams(rows)
      })
      .catch((err) => {
        if (mounted) setError(err.message)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <p>Loading teams...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h1 className="h3 mb-3">Teams</h1>
      <div className="table-responsive bg-white border rounded">
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Captain</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id ?? team.id ?? team.name}>
                <td>{team.name ?? 'N/A'}</td>
                <td>{team.city ?? 'N/A'}</td>
                <td>{team.captain ?? 'N/A'}</td>
                <td>{team.membersCount ?? team.members ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Teams
