import { useState, useEffect } from 'react'
import { getTasks } from '../../services/taskService'
import TaskById from '../TaskById/TaskById'

function Task() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getTasks()
      .then((tasks) => {
        console.log('TASKS ARRIVATI NEL COMPONENTE:', tasks)
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

  useEffect(() => {
    console.log('Stato tasks aggiornato:', tasks)
  }, [tasks])

  if (loading) return <p>Caricamento...</p>

  if (error) {
    return <p style={{ color: 'red' }}>Errore: {error}</p>
  }

  return (
    <div>
      <h1>Task</h1>

      <TaskById/>

      {tasks.length === 0 && <p>Nessun task trovato.</p>}

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>ID: {task.id}</p>
          <p>Responsabile: {task.responsible?.name || 'Non assegnato'}</p>
          <p>Scadenza: {task.deadline || 'Nessuna scadenza'}</p>
          <p>Stato: {task.status}</p>
        </div>
      ))}
    </div>
  )
}

export default Task