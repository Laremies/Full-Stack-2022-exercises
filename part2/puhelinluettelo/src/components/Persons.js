const Persons = ({ persons, filter, handleDelete }) => {
    return (
        <div>
            <table>
                <tbody>
                {persons.filter(person => 
                    person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                        <td><button onClick={() => handleDelete(person)}>delete</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons