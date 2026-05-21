import API from "./api";

export const getTasks = async () => {
  const response = await API.post('/list_task.php', {
    filter: {},
    order: {
      ID: 'DESC'
    }
  })

  return response.data.tasks
}

export const getTaskById = async (taskId) => {
  const { data } = await API.post('/get_task.php', {
    task_id: taskId
  })

  return data.task
}

export const createTask = async (taskData) => {
  const { data } = await API.post('/create_task.php', taskData)
  return data
}

export const viewTaskById = async (taskId) => {
  const { data } = await API.post('/get_task.php', {
    task_id: taskId
  })

  return data.task
}

export const updateTask = async (taskId, taskData) => {
  const { data } = await API.post('/update_task.php', {
    taskId: taskId,
    ...taskData
  })

  return data
}

export const deleteTask = async (taskId) => {
  const { data } = await API.post('/delete_task.php', {
    taskId: taskId
  })

  console.log(data)

  if (!data.success) {
    throw new Error(data.message || 'Errore durante l’eliminazione del task')
  }

  return data
}

export const changeTaskAction = async (taskId, action) => {
  const { data } = await API.post('/task_action.php', {
    task_id: taskId,
    action
  })

  if (!data.success) {
    throw new Error(data.message || 'Errore durante il cambio stato del task')
  }

  return data
}