import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTask, viewTaskById } from '../../services/taskService'

function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsible_id: '',
    deadline: '',
    company: '',
    participants: '',
    auditors: '',
    allow_time_tracking: true,
    signature: '',
    status: 2
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const formatForInput = (date) => {
    if (!date) return ''

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) return ''

    const year = parsedDate.getFullYear()
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
    const day = String(parsedDate.getDate()).padStart(2, '0')
    const hours = String(parsedDate.getHours()).padStart(2, '0')
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const parseIds = (value) => {
    if (!value) return []

    return value
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map((id) => Number(id))
  }

  useEffect(() => {
    if (!id) {
      setError('ID task non presente nella URL.')
      setLoading(false)
      return
    }

    viewTaskById(id)
      .then((task) => {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          responsible_id: task.responsibleId || '',
          deadline: formatForInput(task.deadline),
          company: task.company || '',
          participants: task.accomplices?.join(', ') || '',
          auditors: task.auditors?.join(', ') || '',
          allow_time_tracking: task.allowTimeTracking === 'Y',
          signature: task.signature || '',
          status: task.status || 2,
        })
      })
      .catch((err) => {
        setError(err.message || 'Errore durante il caricamento del task.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        responsible_id: Number(formData.responsible_id),
        deadline: formData.deadline ? `${formData.deadline}:00+02:00` : '',
        company: formData.company,
        participants: parseIds(formData.participants),
        auditors: parseIds(formData.auditors),
        allow_time_tracking: formData.allow_time_tracking,
        signature: formData.signature,
        status: Number(formData.status || 2)
      }

      await updateTask(id, payload)

      setMessage('Task aggiornato correttamente.')

      setTimeout(() => {
        navigate(`/task/${id}`)
      }, 800)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Errore durante la modifica del task.')
    } finally {
      setSaving(false)
    }
  }

  

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Caricamento task...</p>
        </div>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Bitrix24 Task
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Modifica incarico #{id}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Aggiorna i dati dell’incarico e salva le modifiche su Bitrix24.
            </p>
          </div>

          {message && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Titolo
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Descrizione
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  ID responsabile
                </label>
                <input
                  type="number"
                  name="responsible_id"
                  value={formData.responsible_id}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Scadenza
                </label>
                <input
                  type="datetime-local"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Azienda
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Es. Bismatica"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Partecipanti
                </label>
                <input
                  type="text"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  placeholder="Es. 12, 13"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Osservatori
                </label>
                <input
                  type="text"
                  name="auditors"
                  value={formData.auditors}
                  onChange={handleChange}
                  placeholder="Es. 16"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Firma incarico
              </label>
              <input
                type="text"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
                placeholder="Es. Firma aggiornata"
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <label className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="allow_time_tracking"
                checked={formData.allow_time_tracking}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              Abilita gestione tempo
            </label>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Stato incarico
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                <option value="2">Da fare</option>
                <option value="3">In corso</option>
                <option value="4">In attesa di controllo</option>
                <option value="5">Completato</option>
                <option value="6">Rinviato</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate(`/task/${id}`)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Annulla
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Salvataggio...' : 'Salva modifiche'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditTask

