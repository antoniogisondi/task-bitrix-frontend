import React, {useState} from 'react'
import { createTask } from '../../services/taskService'

function CreateTask() {
    const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsible_id: 11,
    deadline: '',
    company: '',
    participants: '',
    auditors: '',
    allow_time_tracking: true,
    signature: '',
    status: ''
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const parseIds = (value) => {
    if (!value) return []

    return value
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id !== '')
      .map((id) => Number(id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        responsible_id: Number(formData.responsible_id),
        deadline: formData.deadline,
        company: formData.company,
        participants: parseIds(formData.participants),
        auditors: parseIds(formData.auditors),
        allow_time_tracking: formData.allow_time_tracking,
        signature: formData.signature,
        status: Number(formData.status)
      }

      const result = await createTask(payload)

      setMessage(`Task creato correttamente. ID: ${result.task_id}`)

      setFormData({
        title: '',
        description: '',
        responsible_id: 11,
        deadline: '',
        company: '',
        participants: '',
        auditors: '',
        allow_time_tracking: true,
        signature: ''
      })
    } catch (err) {
      console.error('Errore creazione task:', err)
      setError(err.response?.data?.message || 'Errore durante la creazione del task')
    } finally {
      setLoading(false)
    }
  }

   return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
    <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Crea nuovo incarico</h1>
      </div>

      {/* Messaggi feedback */}
      {message && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          ✅ {message}
        </div>
      )}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Titolo */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Titolo <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Inserisci il titolo dell'incarico"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        {/* Descrizione */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descrizione <span className="text-red-500">*</span></label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Descrivi l'incarico..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none"
          />
        </div>

        {/* Responsabile + Scadenza affiancati */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">ID Responsabile <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="responsible_id"
              value={formData.responsible_id}
              onChange={handleChange}
              required
              placeholder="Es. 11"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Scadenza <span className="text-red-500">*</span></label>
            <input
              type="datetime-local"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Azienda */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Azienda</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Es. Bismatica"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        {/* Partecipanti + Osservatori affiancati */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Partecipanti</label>
            <input
              type="text"
              name="participants"
              value={formData.participants}
              onChange={handleChange}
              placeholder="Es. 12,13,14"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Osservatori</label>
            <input
              type="text"
              name="auditors"
              value={formData.auditors}
              onChange={handleChange}
              placeholder="Es. 15,16"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Firma */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Firma incarico</label>
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            placeholder="Es. Firma da acquisire"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        {/* Checkbox gestione tempo */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="allow_time_tracking"
            name="allow_time_tracking"
            checked={formData.allow_time_tracking}
            onChange={handleChange}
            className="w-4 h-4 accent-orange-500 cursor-pointer"
          />
          <label htmlFor="allow_time_tracking" className="text-sm text-gray-700 cursor-pointer">
            Abilita gestione tempo
          </label>
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="2">Da fare</option>
          <option value="3">In corso</option>
          <option value="4">In attesa di controllo</option>
          <option value="5">Completato</option>
          <option value="6">Rinviato</option>
        </select>

        {/* Bottone submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 text-sm"
        >
          {loading ? '⏳ Creazione in corso...' : '➕ Crea incarico'}
        </button>

      </form>
    </div>
  </div>
)

}

export default CreateTask
