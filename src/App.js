import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';
import './App.css';
import Header from './Header';
import TodayRow from './TodayRow';
import Hourly from './Hourly';
import SevenDay from './SevenDay';
import Summary from './Summary';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState([]);
  const [ hourly, setHourly ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      setCurrent({
        dt: current.dt,
        temp: current.temp,
        feels_like: current.feels_like,
        min: daily[0].temp.min,
        max: daily[0].temp.max,
        icon: current?.weather?.[0]?.id,
        main: current?.weather?.[0]?.main,
        description: current?.weather?.[0]?.description,
      });
      setDaily(daily.slice(1));
      setHourly(hourly);
      setLoaded(true);
    })
  }, [])

  const { dt, main, temp, min, max, description } = current;

  if (loaded) {
    return (
      <div className="App">
        <Header main={main} temp={temp} />
        <main>
          <TodayRow dt={dt} max={max} min={min} />
          <Hourly hourly={hourly} temp={temp} />
          <SevenDay daily={daily} />
          <Summary hourly={hourly} daily={daily} description={description} min={min} />
        </main>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
