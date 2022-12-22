import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showNotification('Anecdote created'))
    setTimeout(() => dispatch(hideNotification()), 5000)
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
