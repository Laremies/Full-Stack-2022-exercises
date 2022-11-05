import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const handleFind = (e) => {
    setFind(e.target.value)
  }

  return (
    <div>
      find countries<input value={find} onChange={handleFind}/>
      <Countries countries={countries} find={find}/>
    </div>
  )
}

export default App