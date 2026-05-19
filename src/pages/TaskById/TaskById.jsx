import { useState } from 'react'
import { getTaskById } from '../../services/taskService'

function TaskById() {
  const [taskId, setTaskId] = useState('')
  const [task, setTask] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')
    setTask(null)

    try {
      const result = await getTaskById(taskId)
      setTask(result)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

      <h2>Cerca task per ID</h2>

      <form onSubmit={handleSearch}>
        <input
          type="number"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Inserisci ID task"
        />

        <button type="submit">Cerca</button>
      </form>

      {loading && <p>Ricerca in corso...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {task && (
        <div>
          <h3>{task.title}</h3>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Descrizione:</strong> {task.description || 'Nessuna descrizione'}</p>
          <p><strong>Responsabile:</strong> {task.responsible?.name || task.responsibleId}</p>
          <p><strong>Scadenza:</strong> {task.deadline || 'Nessuna scadenza'}</p>
          <p><strong>Stato:</strong> {task.status}</p>
        </div>
      )}
    </div>
  )
}

export default TaskById