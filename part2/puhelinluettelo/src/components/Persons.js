const Persons = ({ persons, filter }) => {
    return (
        <div>
            <table>
                <tbody>
                {persons.filter(person => 
                    person.name.toLowerCase().includes(filter)).map(person =>
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.number}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons