import React from 'react'

const Header =  ({name}) => (
      <h2>{name}</h2>
)

const Part  = ({name, exercises}) => (<p>{name} {exercises}</p> )

const Content  = ({parts}) => (
  <div>
    {parts.map(i => <Part name={i.name} exercises={i.exercises} />) }
  </div>
)

const Total = ({parts}) => (
  <div>
      <p><b>total of {parts.map(x => x.exercises).reduce( (a,b) => a+b ) } exercises </b> </p>
  </div>
)
const Course = ({course}) => {
    return( <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>)
}

export default Course