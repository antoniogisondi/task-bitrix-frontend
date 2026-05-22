import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { viewTaskById, deleteTask, changeTaskAction } from '../../services/taskService'
import { getUsers } from '../../services/userService'
getCompanies
import StatusBadge from '../../components/StatusBadge/StatusBadge'
import DetailRow from '../../components/DetailRow/DetailRow'
import { getCompanies } from '../../services/companyService'

function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

 

const getCompanyIdFromTask = (task) => {
  const crmTask = task?.ufCrmTask || []

  const companyItem = Array.isArray(crmTask)
    ? crmTask.find((item) => String(item).startsWith('CO_'))
    : null

  return companyItem ? companyItem.replace('CO_', '') : ''
}

useEffect(() => {
  getCompanies()
    .then(setCompanies)
    .catch((err) => console.error('Errore caricamento aziende:', err))
}, [])

const companyId = getCompanyIdFromTask(task)

const company = companies.find(
  (company) => String(company.ID) === String(companyId)
)

const companyName = company?.TITLE || 'Nessuna azienda collegata'

useEffect(() => {
  viewTaskById(id)
    .then((task) => {
      setTask(task)
    })
    .catch((err) => {
      setError(err.message || 'Errore durante il caricamento del task.')
    })
    .finally(() => setLoading(false))
}, [id])


const handleDelete = async () => {
  const confirmDelete = window.confirm(
    `Sei sicuro di voler eliminare il task #${task.id}? Questa operazione non può essere annullata.`
  )

  if (!confirmDelete) return

  setLoading(true)
  setError(null)

  try {
    await deleteTask(task.id)

    navigate('/task')
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      'Errore durante l’eliminazione del task.'
    )
    setLoading(false)
  }
}

const handleTaskAction = async (action) => {
  try {
    await changeTaskAction(task.id, action)

    const updatedTask = await viewTaskById(task.id)
    setTask(updatedTask)
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.message ||
      'Errore durante il cambio stato del task.'
    )
  }
}

// --- Loading ---
if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm animate-pulse">Caricamento incarico...</p>
    </div>
  )
}

// --- Errore ---
if (error) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-sm w-full">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <Link to="/task" className="text-orange-500 hover:underline text-sm">
          ← Torna agli incarichi
        </Link>
      </div>
    </div>
  )
}

  // --- Dettaglio ---
  const deadline = task.deadline
    ? new Date(task.deadline).toLocaleString('it-IT', { dateStyle: 'long', timeStyle: 'short' })
    : null

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-4">
          <Link to="/task" className="text-sm text-orange-500 hover:underline">
            ← Incarichi
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Incarico #{task.id}</p>
              <h1 className="text-xl font-semibold text-gray-800 leading-snug">{task.title}</h1>
            </div>
            <StatusBadge status={task.status} />
          </div>

          {/* Descrizione */}
          {task.description && (
            <div className="bg-gray-50 rounded-xl px-4 py-3 mb-6 text-sm text-gray-700 whitespace-pre-line">
              {task.description}
            </div>
          )}

          {/* Dettagli */}
          <div className="mb-6">
            <DetailRow icon="👤" label="Responsabile" value={task.responsible?.name} />
            <DetailRow icon="📅" label="Scadenza" value={deadline} />
            <DetailRow icon="🏢" label="Azienda" value={companyName} />
            <DetailRow icon="✍️" label="Firma" value={task.signature} />
            <DetailRow
              icon="👥"
              label="Partecipanti"
              value={task.accomplices?.length > 0
                ? task.accomplices.map(p => p.name || p).join(', ')
                : 'Nessuno'}
            />
            <DetailRow
              icon="👁️"
              label="Osservatori"
              value={task.auditors?.length > 0
                ? task.auditors.map(a => a.name || a).join(', ')
                : 'Nessuno'}
            />
            <DetailRow
              icon="⏱️"
              label="Gestione tempo"
              value={task.allowTimeTracking === 'Y' ? 'Abilitata' : 'Disabilitata'}
            />
          </div>

          {/* Azioni */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Elimina task
            </button>

            <Link
              to={`/task/${task.id}/edit`}
              className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              ✏️ Modifica
            </Link>
            <Link
              to="/task"
              className="flex-1 text-center border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              ← Torna alla lista
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleTaskAction('start')}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
            >
              Avvia
            </button>

            <button
              type="button"
              onClick={() => handleTaskAction('pause')}
              className="rounded-xl bg-slate-500 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
            >
              Metti in attesa
            </button>

            <button
              type="button"
              onClick={() => handleTaskAction('complete')}
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Completa
            </button>

            <button
              type="button"
              onClick={() => handleTaskAction('renew')}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Riapri
            </button>

            <button
              type="button"
              onClick={() => handleTaskAction('defer')}
              className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
            >
              Rinvia
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default TaskDetail

