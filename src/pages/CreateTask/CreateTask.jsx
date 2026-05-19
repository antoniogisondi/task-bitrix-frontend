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
    signature: ''
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
        signature: formData.signature
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
    <div>
      <h1>Crea nuovo task</h1>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descrizione</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID Responsabile</label>
          <input
            type="number"
            name="responsible_id"
            value={formData.responsible_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Scadenza</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Azienda</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Partecipanti</label>
          <input
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            placeholder="Esempio: 12,13,14"
          />
        </div>

        <div>
          <label>Osservatori</label>
          <input
            type="text"
            name="auditors"
            value={formData.auditors}
            onChange={handleChange}
            placeholder="Esempio: 15,16"
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="allow_time_tracking"
              checked={formData.allow_time_tracking}
              onChange={handleChange}
            />
            Abilita gestione tempo
          </label>
        </div>

        <div>
          <label>Firma incarico</label>
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            placeholder="Es. Firma da acquisire"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creazione in corso...' : 'Crea task'}
        </button>
      </form>
    </div>
  )
}

export default CreateTask
