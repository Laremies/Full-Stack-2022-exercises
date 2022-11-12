import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

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
          personService
            .update(person[0].id, personObject).then(() => {
              personService.getAll().then(updated => setPersons(updated))
              setError(false)
              setMessage(`Changed number to ${newNumber}`)
            })
            .catch(() => {
              setError(true)
              setMessage(`Information of ${newName} has already been removed from server`)
            })
        }
  } else {
    personService
      .create(personObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    
    if (personObject.name && personObject.number) {
      setError(false)
      setMessage(`Added ${newName}`)
    } else {
      setError(true)
      setMessage(`Give a name and a number`)
    }
  }
  setNewName('')
  setNewNumber('')
  setTimeout(() => {setMessage(null)}, 3000)
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
    setError(false)
    setMessage(`Deleted ${p.name}`)
    setTimeout(() => {setMessage(null)}, 5000)
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
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
