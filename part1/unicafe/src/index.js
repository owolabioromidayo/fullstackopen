import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({onClick, text}) => (
    <button onClick={onClick}> 
        {text} 
    </button>
)

const Statistic = ({text, value}) => ( 
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
)

const Statistics = ({clicks, total}) => {
    
    const getAverage = () => {
      let res = (clicks.good - clicks.bad)/ total
      return (isNaN(res)) ? 0 : res
    }
      
    const getPositive  = () => {
      let res = 100*(clicks.good / total)
      return (isNaN(res)) ? 0 : res
    }

    return (
        <div>
          <table>
            <tbody>
              <Statistic  text="good" value={clicks.good} />
              <Statistic text="neutral"  value={clicks.neutral} />
              <Statistic text="bad" value = {clicks.bad} />
              <Statistic text="all" value={total} />
              <Statistic text="average" value={getAverage()} />
              <Statistic text="positive" value={getPositive()} />
            </tbody>
          </table>
        </div>
        )
   }

const App = () => {
    const [clicks, setClicks] = useState({
      good : 0,
      bad : 0,
      neutral : 0
    })

    const incGood = () => setClicks({...clicks, good : clicks.good + 1 })
    const incBad = () => setClicks({...clicks, bad: clicks.bad + 1})
    const incNeutral = () => setClicks({...clicks, neutral: clicks.neutral+1 })
    const getTotal = () => Object.values(clicks).reduce((a,b) => a+b)

    return (
      <div>
          <h1>give feedback</h1>
          <Button onClick={incGood} text='good' />
          <Button onClick={incNeutral} text='neutral' />
          <Button onClick={incBad} text='bad' />
          
          <h1>statistics</h1>
          {getTotal() === 0 ? <p>No feedback given</p> : <Statistics clicks={clicks} total={getTotal()}/> }
     </div>

    )

}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
