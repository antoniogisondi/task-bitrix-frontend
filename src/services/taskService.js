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
    const {data} = await API.post('/create_task.php', taskData)
    return data
}

export const viewTaskById = async (taskId) => {
  const {data} = await API.post('/get_task.php', {
    task_id: taskId
  })

  return data.task
}