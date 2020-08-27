import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';
import './App.css';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState({});
  const [ hourly, setHourly ] = useState({});

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      setCurrent({
        dt: current.dt,
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
        <section className="current">
          <h1>Today, </h1>
          {icon
            && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={main} />}
          <h2>{main}</h2>
          <h3>{temp} ℉</h3>
          <div className="subtitle">feels like {feels_like} ℉</div>
        </section>
      </main>
    </div>
  );
}

export default App;
