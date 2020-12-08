import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Quote = ({quote, votes}) => (
<p>{quote} <br /> has {votes} votes</p>
) 

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [max, setMax] = useState(0)

  const voteAnecdote = () => {
    let newArr = [...votes]
    newArr[selected]++
    setVotes(newArr)
    updateMax()
  }

  const randomizeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const updateMax= () => {
    let _max  = Math.max(...votes)
    let maxIndex = votes.findIndex( (item) => item === _max)
    console.log(_max, maxIndex)
    setMax(maxIndex)
  }
  useEffect(updateMax, [votes])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Quote quote={anecdotes[selected]} votes={votes[selected]}/>
      <br />
      <button onClick={voteAnecdote} >vote</button>
      <button onClick={randomizeAnecdote} >next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Quote quote={anecdotes[max]} votes={votes[max]} />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)