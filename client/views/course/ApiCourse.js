import axios from 'axios';

const list = async () => {
     try {
        let response = await axios.get(`/api/course`)
        return await response.data
    } catch (err) {
        return await err.message
    } 

}

const create = async (course) => {
    try {
        let response = await axios.post(`/api/course/`,course)
        return await response.data
    } catch (err) {
        return await err.response.data
    } 
}

const findOne = async (id) => {
    try {
        let response = await axios.get(`/api/course/${id}`)
        return await response.data
    } catch (err) {
        return await err.message
    }
}

const update = async (data) => {
    const id = data.cors_id;
    try {
        let response = await axios.put(`/api/course/${id}`,
            data)
        return await response.data
    } catch (err) {
        return await err.response.data
    }
}

const remove = async (id) => {
    try {
        let response = await axios.delete(`/api/course/${id}`)
        return await response.data
    } catch (err) {
        return res.status(400).json({error : "error when delete row"})
    }
}

export default { list, create, remove, findOne, update }