import React, { useState, useEffect } from 'react';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState({});
  const [ hourly, setHourly ] = useState({});

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const lat = process.env.REACT_APP_LAT
    const lon = process.env.REACT_APP_LON
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${API_KEY}`)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      setCurrent(current);
      setDaily(daily);
      setHourly(hourly);
    })
  }, [])
  const icon = current?.weather?.[0]?.icon
  const main = current?.weather?.[0]?.main
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sun or Rain</h1>
      </header>
      <main>
        <section>
          <h2>Current Weather</h2>
          {icon && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main} />}
          <h4>{current?.weather?.[0]?.main}</h4>
          <ul>
            <li>Temp: {current.temp} ℉</li>
            <li>Feels Like: {current.feels_like} ℉</li>
          </ul>
        </section>

      </main>
    </div>
  );
}

export default App;
