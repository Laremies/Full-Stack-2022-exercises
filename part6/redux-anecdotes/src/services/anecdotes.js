/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getId = () => (100000 * Math.random()).toFixed(0)
const create = async (content) => {
  const anecdote = {
    content,
    id: getId(),
    votes: 0
  }
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

const vote = async (anecdote) => {
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return res.data
}

export default { getAll, create, vote }
