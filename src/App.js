import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState({});
  const [ hourly, setHourly ] = useState({});

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      setCurrent({
        temp: current.temp,
        feels_like: current.feels_like,
        icon: current?.weather?.[0]?.icon,
        main: current?.weather?.[0]?.main
      });
      setDaily(daily);
      setHourly(hourly);
    })
  }, [])

  const { icon, main, temp, feels_like } = current;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sun or Rain</h1>
      </header>
      <main>
        <section>
          <h2>Current Weather</h2>
          {icon
            && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main} />}
          <h4>{main}</h4>
          <ul>
            <li>Temp: {temp} ℉</li>
            <li>Feels Like: {feels_like} ℉</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
