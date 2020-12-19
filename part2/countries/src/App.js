import React, {useState, useEffect} from 'react';
import axios from 'axios'
require('dotenv').config()

const CountryView =  ({country, weatherInfo})  => (
    <div>
      {console.log(weatherInfo)}
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div> 
      <div>population {country.population}</div>

      <h3>languages</h3>
        <ul>
      {country.languages.map(l => <li>{l.name}</li>)}
        </ul>
      <br />
      <img src={country.flag} alt="Country" width="200" height="200"/>
      <h3>Weather in {country.capital}</h3>
      <div><b>temperature:</b> {weatherInfo.temperature}°C</div>
      <img src={weatherInfo.weather_icons} width="200" height="200" alt="Weather"/>
      <div><b>wind:</b> {weatherInfo.wind_speed} mph direction {weatherInfo.wind_dir}</div>

  </div>

)

const CountryListItem = ({country, showCountry}) => (
      <div>
        <span>{country.name}</span> 
        <button onClick = {() => showCountry(country)} >Show</button>
      </div>
)

const ListView  = ({filteredCountries, showCountry, weatherInfo}) => {

  if (filteredCountries.length > 10){
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length > 1) {
  return  filteredCountries.map(c => <CountryListItem country={c} showCountry={showCountry} />) 
  } else if (filteredCountries.length === 1) {
    return <CountryView country={filteredCountries[0]} weatherInfo={weatherInfo} />
  } else {
    return <p>No matches found.</p>
  }

}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [filter, setFilter] = useState('')
  const [weatherInfo, setWeatherInfo] = useState([])
  
  const handleFilterChange = (e) => setFilter(e.target.value)
  
  const showCountry = (country) => {
    setFilteredCountries([country])
  }

  const getCountries = () => [
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(res => setCountries(res.data))
  ]

  const updateListView = () => {
    setFilteredCountries(countries.filter(c => c.name.includes(filter)))
  }

  const getWeatherInfo = () => {
    if (filteredCountries.length === 1){
    const url = "http://api.weatherstack.com/current?access_key=" + process.env.REACT_APP_WEATHER_API_KEY +"&query="+filteredCountries[0].capital
    axios.get(url).then(res => setWeatherInfo(res.data.current))
    }
  }


  useEffect(getWeatherInfo, [filteredCountries])
  useEffect(getCountries, [])
  useEffect( updateListView, [countries, filter])

  return (
    <div>
    <p>find countries <input value={filter} onChange={handleFilterChange}/></p>
    <ListView filteredCountries={filteredCountries} showCountry={showCountry} weatherInfo={weatherInfo}/> : 
    </div>
  );
}

export default App
