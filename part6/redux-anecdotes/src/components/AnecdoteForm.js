import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notify } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notify('Anectode added.')
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

const mapDispatchToProps = { createAnecdote, notify }
const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default connectedAnecdoteForm
