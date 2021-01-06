import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const createAnecdote = async (anecdote) => {
  const res = await axios.post(baseUrl, {
    content: anecdote,
    id: getId(),
    votes: 0
  })
  return res.data
}

const voteAnecdote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}
  
  export default { getAll , createAnecdote, voteAnecdote}