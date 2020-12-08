import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header =  (props) => (
      <h1>{props.course.name}</h1>
)

const Part  = (props) => (<p>{props.name} {props.exercises}</p> )

const Content  = (props) => (
  <div>
    {props.parts.map(i => <Part name={i.name} exercises={i.exercises} />) }
  </div>
)

const Total = (props) => (
  <div>
      <p>Number of exercises {props.parts.map(x => x.exercises).reduce( (a,b) => a+b ) } </p>
  </div>

)

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
      <Header course={course} />
      <Content parts={course.parts} /> 
      <Total parts={course.parts}  />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
