import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notify('Anecdote created'))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
    </>
  )
}

export default AnecdoteForm
