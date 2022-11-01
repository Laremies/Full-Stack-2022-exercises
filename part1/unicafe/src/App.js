import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => (
    <table>
        <colgroup>
            <col style={{width: '54px'}}></col>
        </colgroup>
        <tbody>
        <tr>
            <td>{props.text} </td>
            <td>{props.value} </td>
        </tr>
        </tbody>
    </table>
    
)

const Statistics = (props) => {
    const g = props.good
    const n = props.neutral
    const b = props.bad
    const sum = g + n + b
    const avg = (g - b) / sum
    const pos = ((g / sum) * 100) + ' %'
    
    if (sum === 0) {
        return <div>No feedback given</div>
    } 
    return(
        <div>
            <StatisticLine text="good" value={g} />
            <StatisticLine text="neutral" value={n} />
            <StatisticLine text="bad" value={b} />
            <StatisticLine text="all" value={sum} />
            <StatisticLine text="average" value={avg} />
            <StatisticLine text="positive" value={pos} />
        </div>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <h1>
                give feedback
            </h1>
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <h1>
                statistics
            </h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App