import { useEffect, useState } from 'react'
import { requestCollection } from '../lib/api'

function Leaderboard() {
  const [rankings, setRankings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    requestCollection('leaderboard')
      .then((rows) => {
        if (mounted) setRankings(rows)
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

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h1 className="h3 mb-3">Leaderboard</h1>
      <div className="table-responsive bg-white border rounded">
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Week Start</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((row) => (
              <tr key={row._id ?? row.id ?? `${row.rank}-${row.points}`}>
                <td>{row.rank ?? 'N/A'}</td>
                <td>{row.user?.fullName ?? row.userName ?? 'Unknown'}</td>
                <td>{row.points ?? 'N/A'}</td>
                <td>
                  {row.weekStartDate
                    ? new Date(row.weekStartDate).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
