import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState({
    votes: 0, anecdote: anecdotes[0]
  })

  const randAnecdote = () => {
    const randIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randIndex)
  }

  const vote = sel => {
    const copy = [...points]
    copy[sel] += 1
    setPoints(copy)
    if (copy[sel] > max.votes) {
      setMax({votes: copy[sel], anecdote: anecdotes[sel]})
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {points[selected]} votes <br/>
      {console.log(points)}
      <Button handleClick={() => vote(selected)} text="vote" />
      <Button handleClick={randAnecdote} text="next anecdote"/>
      <h1>Anecdote with most votes</h1>
      {max.anecdote} <br/>
      has {max.votes} votes
    </div>
  )
}

export default App