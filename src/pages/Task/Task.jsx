import { useState, useEffect } from 'react'
import { getTasks } from '../../services/taskService'
import { Link } from 'react-router-dom'
import TaskById from '../TaskById/TaskById'
import StatusBadge from '../../components/StatusBadge/StatusBadge'

function Task() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        setTasks(tasks)
      })
      .catch((err) => {
        console.error('❌ Errore fetch:', err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Caricamento...</p>

  if (error) {
    return <p style={{ color: 'red' }}>Errore: {error}</p>
  }

return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-3xl mx-auto">

      {/* Header pagina */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Incarichi</h1>
        </div>

        <Link
          to="/create-task"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          ➕ Nuovo incarico
        </Link>
      </div>

      {/* Ricerca per ID */}
      <div className="mb-6">
        <TaskById />
      </div>

      {/* Lista vuota */}
      {tasks.length === 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-12 text-center">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-gray-500 text-sm">Nessun incarico trovato.</p>
        </div>
      )}

      {/* Lista task */}
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <Link
            key={task.id}
            to={`/task/${task.id}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 hover:shadow-md transition-shadow duration-200"
          >
            {/* Titolo + badge stato */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-semibold text-gray-800 text-base leading-snug">
                {task.title}
              </h3>
              <StatusBadge status={task.status} />
            </div>

            {/* Dettagli */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-500">
              <span>🆔 ID: <span className="text-gray-700 font-medium">{task.id}</span></span>
              <span>👤 {task.responsible?.name || 'Non assegnato'}</span>
              <span>📅 {task.deadline ? new Date(task.deadline).toLocaleDateString('it-IT') : 'Nessuna scadenza'}</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  </div>
)

}

export default Task