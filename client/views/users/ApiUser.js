import axios from 'axios';



const list = async () => {
    try {
        let response = await axios.get(`/api/users`)
        return await response.data
    } catch (err) {
        return await err.message
    }


}


const create = async (users) => {
    await axios.post(`/api/users/signup`, users).then(response => { return response })
        .catch(error => { return error.message })
}

const findOne = async (data) => {
    const user_id = parseInt(data);
    try {
        let response = await axios.get(`/api/users/${user_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (users) => {
    const user_id = parseInt(users.user_id);
    try {
        let response = await axios.put(`/api/users/${user_id}`,
        users)
      return await response.data
    } catch(err) {
        return await err.message
    } 
}

const remove = async (data) => {
    const user_id = parseInt(data);
    try {
        let response = await axios.delete(`/api/users/${user_id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

export default { list, create, remove, findOne, update };