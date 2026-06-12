import { useEffect, useState } from 'react'
import { requestCollection } from '../lib/api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    requestCollection('workouts')
      .then((rows) => {
        if (mounted) setWorkouts(rows)
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

  if (loading) return <p>Loading workouts...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <section>
      <h1 className="h3 mb-3">Workouts</h1>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id ?? workout.id ?? workout.title} className="col-12 col-md-6">
            <article className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 card-title mb-2">{workout.title ?? 'Workout'}</h2>
                <p className="text-muted small mb-3">
                  {workout.difficulty ?? 'N/A'} · {workout.durationMinutes ?? 'N/A'} min
                </p>
                <p className="mb-2">{workout.instructions ?? 'No instructions provided.'}</p>
                <p className="small mb-0">
                  <strong>Targets:</strong>{' '}
                  {Array.isArray(workout.targetMuscleGroups)
                    ? workout.targetMuscleGroups.join(', ')
                    : workout.targetMuscleGroups ?? 'N/A'}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
