import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {
      e.preventDefault()
      dispatch(createAnecdote(e.target.content.value))
    }

    return (<div>
        <h2>create new</h2>
      <form onSubmit={(e) => addAnecdote(e)}>
        <div><input name='content' /></div>
        <button type="submit" >create</button>
      </form>
    </div>)
}

export default AnecdoteForm