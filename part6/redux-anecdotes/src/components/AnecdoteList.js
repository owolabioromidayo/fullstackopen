import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteList = () => {
   
    
    const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().startsWith(state.filter.toLowerCase())).sort((a,b) =>  b.votes - a.votes))
    const dispatch = useDispatch()
    
    const vote = (id) => {
        const selectedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAnecdote(selectedAnecdote))
        dispatch(setNotification(`you voted ${selectedAnecdote.content}`, 5))
      
       
      }

    return (<div>
         {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>)
}

export default AnecdoteList