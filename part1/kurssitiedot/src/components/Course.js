const Part = (props) => {
    return (
    <div>
      <p>{props.name} {props.nof}</p>
    </div>
    )
  }
  
  
  const Content = (props) => {
    const parts = props.parts
    
    return (
      <div>
        {parts.map(part =>
          <Part key={part.id} name={part.name} nof={part.exercises} />
          )}
      </div>
    )
  }
  
  
  const Header = (props) => {
    return (
    <div>
      <h2>{props.name}</h2>
    </div>
    )
  }
  
  
  const Total = (props) => {
    const parts = props.parts
    const exs = parts.map(p => p.exercises)
    const total = exs.reduce((p, c) => p + c)
    return (
    <div>
      <b>total of {total} exercises</b>
    </div>
    )
  }
  
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts ={course.parts}/>
      </div>
    )
  
  }

  export default Course