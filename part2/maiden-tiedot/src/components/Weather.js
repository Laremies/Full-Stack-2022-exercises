import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const capital = country.capital
    const apiKey = process.env.REACT_APP_API_KEY
    console.log(apiKey)
    console.log(apiKey)

    const [temperature, setTemperature] = useState()
    const [icon, setIcon] = useState()
    const [wind, setWind] = useState()

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
          .then(response => {
            setTemperature(response.data.main.temp)
            setIcon(response.data.weather[0].icon)
            setWind(response.data.wind.speed)
          })
        }, [apiKey, capital])

    return (
        <div>
            <h3>Weather in {capital}</h3>
            temperature {temperature} Celcius<br/>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" /><br/>
            wind {wind} m/s
        </div>
    )
}

export default Weather
