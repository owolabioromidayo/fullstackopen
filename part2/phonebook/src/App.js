import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import personService from './services/persons'

const Notification = ({message, type}) => {

  const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBoottom: '10px'
}

  if (type == 'err'){
    notificationStyle.color = 'red'
  }  

  if (message === null){
    return null
  }

    return (
    <div style={notificationStyle}>
      {message}
    </div>
    )

}

const Filter = ({filter, handleChangeFilter}) => (
    <p>Filter shown with <input value={filter} onChange={handleChangeFilter} /></p>
)

const PersonForm = ({newName, newNumber, handleChangeName, handleChangeNumber, handleSubmit }) => (
     <div>
       <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
    </div>
    
  )


const Person = ({person, handleDelete}) => (
  <div>
    {person.name}  {person.number}
    <button onClick={handleDelete}  >Delete</button>
  </div>

)

const Persons = ({filteredPersons, handleDelete}) => (
  <div>
    <h2>Numbers</h2>
  {filteredPersons.length === 0 ? "..." : filteredPersons.map(person => <Person person={person} handleDelete={handleDelete(person.id)} />) }
  </div>
)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState([null, '']);

  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)
  const handleChangeFilter = (e) => setFilter(e.target.value)
  const handleSubmit = (e) => {
      e.preventDefault()

      if (! persons.map(p => p.name).includes(newName)){
        const newPerson = {name : newName, number: newNumber, id: uuidv4()}       
        personService
        .create(newPerson)
        .then(returnedObj => {
          setPersons(persons.concat(newPerson))
          return  newPerson.name
        })
        .then(name => {
          setNotificationMessage([`Added ${name}`, ''])
          setTimeout(() => setNotificationMessage([null, '']), 2000)
        })
      }
        else {
        
        if ( window.confirm(`${newName} is already added to the phonebook, replace the older?`) ) {
            const newObj = {...persons.filter(p => p.name === newName)[0], number : newNumber }
            personService
            .update(newObj.id, newObj)
            .then(returnedPerson => setPersons(persons.map(p => p.id !== newObj.id ? p : returnedPerson))) 
            .catch(err => setNotificationMessage([`Information of ${newName} has already been removed from server`, 'err']))
        }
      }
      setNewName('')
      setNewNumber('')
  }

  const handleDelete = (id) => (e) => {
       personService._delete(id)
      .then(() =>personService.getAll())
      .then(returnedPersons => setPersons(returnedPersons))
     }
  
  

  useEffect(() => setFilteredPersons(persons.filter(p => p.name.startsWith(filter) )), [persons,filter] )

  useEffect( () => {
    personService.getAll().then(returnedPersons => setPersons(returnedPersons)
     )}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage[0]} type={notificationMessage[1]} />
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleChangeName={handleChangeName} 
        handleChangeNumber={handleChangeNumber} 
        handleSubmit={handleSubmit} 
        />
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App