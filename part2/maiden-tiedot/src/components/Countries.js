import { useState } from 'react'
import Country from "./Country"


const Countries = ({ countries, find }) => {
    const [isShown, setIsShown] = useState(false)
    const [show, setShow] = useState()


    const handleClick = (c) => {
        setShow(c)
        setIsShown(true)
    }

    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(find.toLowerCase()))
    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    if (filtered.length <= 10 && filtered.length > 1) {
        return (
        <div>
            <table>
                <tbody>
                    
                    {filtered.map(c =>
                        <tr key={c.name.common}>
                            <td>{c.name.common}</td>
                            <td><button onClick={() => handleClick(c)}>show</button></td>
                        </tr>
                        )}
                </tbody>
            </table>
            {isShown && <Country country={show} />}
        </div>
        )
    }
    if (filtered.length === 1) {
        const country = filtered[0]
        return <Country country={country} />
    }
    if (filtered.length < 1) {
        return <div>No country found</div>
    }
}

export default Countries