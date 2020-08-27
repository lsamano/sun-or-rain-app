import React, { useState, useEffect } from 'react';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState({});
  const [ hourly, setHourly ] = useState({});

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const lat = process.env.REACT_APP_LAT
    const lon = process.env.REACT_APP_LON
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=units=imperial&appid=${API_KEY}`)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      setCurrent(current);
      setDaily(daily);
      setHourly(hourly);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
