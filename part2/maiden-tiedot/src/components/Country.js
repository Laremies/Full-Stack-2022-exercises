import Weather from "./Weather"

const Country = ({ country }) => {
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            capital: {country.capital} <br/>
            population: {country.population} <br/>
            area: {country.area} km^2
            <h3>languages:</h3>
            <ul>
                {Object.entries(country.languages).map(([key, value]) =>
                    <li key={key}>
                        {value.toString()}
                    </li>
                    )}
            </ul>
            <img src={country.flags.png.toString()} alt="Flag" />
            <Weather country={country} />
        </div>
    )
}

export default Country
