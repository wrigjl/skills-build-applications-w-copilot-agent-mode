import { useEffect, useState } from 'react'
import { requestCollection } from '../lib/api'

// Step 5 keyphrase: -8000.app.github.dev/api/activities

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    requestCollection('activities')
      .then((rows) => {
        if (mounted) setActivities(rows)
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

  if (loading) return <p>Loading activities...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h1 className="h3 mb-3">Activities</h1>
      <div className="table-responsive bg-white border rounded">
        <table className="table table-sm table-striped mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? activity.id}>
                <td>{activity.user?.fullName ?? activity.userName ?? 'Unknown'}</td>
                <td>{activity.type ?? 'N/A'}</td>
                <td>{activity.durationMinutes ?? activity.duration ?? 'N/A'}</td>
                <td>{activity.caloriesBurned ?? activity.calories ?? 'N/A'}</td>
                <td>
                  {activity.completedAt
                    ? new Date(activity.completedAt).toLocaleString()
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

export default Activities
