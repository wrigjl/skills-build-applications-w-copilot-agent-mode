import { useEffect, useState } from 'react'
import { requestCollection } from '../lib/api'

// Step 5 keyphrase: -8000.app.github.dev/api/users

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    requestCollection('users')
      .then((rows) => {
        if (mounted) setUsers(rows)
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

  if (loading) return <p>Loading users...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h1 className="h3 mb-3">Users</h1>
      <div className="table-responsive bg-white border rounded">
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Fitness Level</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.id ?? user.email}>
                <td>{user.fullName ?? user.name ?? 'Unknown'}</td>
                <td>{user.email ?? 'N/A'}</td>
                <td>{user.fitnessLevel ?? 'N/A'}</td>
                <td>{user.team?.name ?? user.teamName ?? 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
