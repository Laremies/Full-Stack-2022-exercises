
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
*/
import anecdoteService from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    case 'SET':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const voteAnectode = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.filter(a => a.id === id)[0]
    const voted = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.vote(voted)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const setAnecdotes = (data) => {
  return {
    type: 'SET',
    data
  }
}

export default reducer
