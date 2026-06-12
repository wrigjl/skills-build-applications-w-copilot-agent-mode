import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top">
        <div className="container py-2">
          <span className="navbar-brand fw-semibold d-flex align-items-center gap-2 mb-0">
            <img src={logo} alt="OctoFit" width="28" height="28" />
            OctoFit Tracker
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink to="/users" className={navClass}>Users</NavLink></li>
              <li className="nav-item"><NavLink to="/activities" className={navClass}>Activities</NavLink></li>
              <li className="nav-item"><NavLink to="/teams" className={navClass}>Teams</NavLink></li>
              <li className="nav-item"><NavLink to="/leaderboard" className={navClass}>Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink to="/workouts" className={navClass}>Workouts</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <div className="alert alert-secondary">Route not found. Choose a section from the navigation.</div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
