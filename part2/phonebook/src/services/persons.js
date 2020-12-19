import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(res =>res.data)
}

const create = personObj => {
    return axios.post(baseUrl, personObj).then(res => res.data )
}

const _delete = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) =>{
    return axios.put(`${baseUrl}/${id}`, newObj).then(res => res.data)
} 

export default {create, getAll, _delete, update}