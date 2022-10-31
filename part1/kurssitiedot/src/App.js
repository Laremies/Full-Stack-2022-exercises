const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2= 7
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total one={exercises1} two={exercises2} three={exercises3}/>
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
  return (
    <div>
      <Part name="Fundamentals of React" nof={10} />
      <Part name="Using props to pass data" nof={7} />
      <Part name="State of a component" nof={14} />
    </div>
  )
}

const Total = (props) => {
  return (
  <div>
    <p>Number of exercises {props.one + props.two + props.three}</p>
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
