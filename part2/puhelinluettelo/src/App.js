import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

const addPerson = (e) => {
  e.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }

  if (persons.map(p => p.name).includes(newName)) {
    window.alert(`${newName} is already added to phonebook`)
  } else {
    setPersons(persons.concat(personObject))
  }
  setNewName('')
  setNewNumber('')
}

const handleNameChange = (e) => {
  setNewName(e.target.value)
}

const handleNumberChange = (e) => {
  setNewNumber(e.target.value)
}

const handleFilter = (e) => {
  setFilter(e.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} 
        nameValue={newName} onNameChange={handleNameChange}
        numberValue={newNumber} onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
    </div>
  )

}

export default App;
