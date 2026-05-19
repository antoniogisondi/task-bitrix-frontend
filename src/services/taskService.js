import API from "./api";

export const getTasks = async () => {
    const response = await API.post('/list_task.php', {
        filter: {},
        order: {
        ID: 'DESC'
        }
    })

   console.log('HEADERS:', response.headers)
console.log('CONTENT TYPE:', response.headers['content-type'])
console.log('RAW DATA:', response.data)

    return response.data.tasks || []
}