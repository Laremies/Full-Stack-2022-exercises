const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
}

const Content = (props) => {
  const parts = props.parts
  
  return (
    <div>
      <Part name={parts[0].name} nof={parts[0].exercises}/>
      <Part name={parts[1].name} nof={parts[1].exercises}/>
      <Part name={parts[2].name} nof={parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  const parts = props.parts
  const exs = parts.map (p => p.exercises)
  return (
  <div>
    <p>Number of exercises {exs[0] + exs[1] + exs[2]}</p>
  </div>
  )
}

const Part = (props) => {
  return (
  <div>
    <p>{props.name} {props.nof}</p>
  </div>
  )
}

export default App
