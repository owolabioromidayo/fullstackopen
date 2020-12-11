import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

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

const Persons = ({filteredPersons}) => (
  <div>
    <h2>Numbers</h2>
  {filteredPersons.length === 0 ? "..." : filteredPersons.map(person => <div key={uuidv4()}>{person.name}  {person.number}</div>) }
  </div>
)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleChangeName = (e) => setNewName(e.target.value)
  const handleChangeNumber = (e) => setNewNumber(e.target.value)
  const handleChangeFilter = (e) => setFilter(e.target.value)
  const handleSubmit = (e) => {
      e.preventDefault()
      if (! persons.map(p => p.name).includes(newName)){
        setPersons(persons.concat({name : newName, number: newNumber}))
      } else {
        alert(`${newName} is already added to the phonebook`)
      }
      setNewName('')
      setNewNumber('')
  }

  useEffect(() => setFilteredPersons(persons.filter(p => p.name.startsWith(filter) )), [persons,filter] )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleChangeName={handleChangeName} 
        handleChangeNumber={handleChangeNumber} 
        handleSubmit={handleSubmit} 
        />
        <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App