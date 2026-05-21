import { useState } from 'react'
import { getTaskById } from '../../services/taskService'
import { Link, useParams } from 'react-router-dom'

function TaskById() {
  const [taskId, setTaskId] = useState('')
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!taskId) {
      setError('Inserisci un ID task.')
      return
    }

    setLoading(true)
    setError('')
    setTask(null)

    try {
      const result = await getTaskById(taskId)

      if (!result) {
        setError('Task non trovato.')
        return
      }

      setTask(result)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Errore durante la ricerca.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Cerca task per ID
        </h2>
        <p className="text-sm text-slate-500">
          Inserisci l’ID dell’incarico per visualizzarne il dettaglio.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="number"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Es. 2405"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? 'Ricerca...' : 'Cerca'}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {task && (
        <Link key={taskId} to={`/task/${taskId}`}className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-slate-400">
                Task #{task.id}
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                {task.title}
              </h3>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              Stato {task.status}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-700">
            <p>
              <strong>Descrizione:</strong>{' '}
              {task.description || 'Nessuna descrizione'}
            </p>

            <p>
              <strong>Responsabile:</strong>{' '}
              {task.responsible?.name || task.responsibleId || 'Non assegnato'}
            </p>

            <p>
              <strong>Scadenza:</strong>{' '}
              {task.deadline || 'Nessuna scadenza'}
            </p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default TaskById