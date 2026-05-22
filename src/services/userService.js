import API from "./api";

export const getUsers = async () => {
    const {data} = await API.post('/get_users.php')

    console.log(data.users)

    return data.users
}