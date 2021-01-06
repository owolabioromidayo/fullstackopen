import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notificaion from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
    .getAll()
    .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  })

  return (
    <div>
      <Notificaion />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App