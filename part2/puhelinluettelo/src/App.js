import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

useEffect(() => {
  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

const addPerson = (e) => {
  e.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber
  }

  if (persons.map(p => p.name).includes(newName)) {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.filter(p => p.name === newName)
          personService.update(person[0].id, personObject)
          personService
            .getAll()
            .then(updated => setPersons(updated))
        }
  } else {
    personService
      .create(personObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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

const handleDelete = (p) => {
  if (window.confirm(`Delete ${p.name}?`)) {
    personService.deletePerson(p.id)
    setPersons(persons.filter(person => person.name !== p.name))
  }
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App;
