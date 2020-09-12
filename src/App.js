import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';
import './App.css';
import moment from 'moment';
import Header from './Header';
import TodayRow from './TodayRow';
import Hourly from './Hourly';
import { formatDt, getTemp } from './utilities';

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

  const formatRows = () => {
    return daily.map((day, index) => {
      const weekday = moment(formatDt(day.dt)).format('dddd');
      const iconCode = day.weather[0].id;
      return (
        <tr key={index}>
          <td style={{textAlign: "left", width: "6em"}}>{weekday}</td>
          <td><i className={`owf owf-${iconCode} owf-lg`} style={{fontSize: "1.5em"}}></i></td>
          <td style={{width:"2.5em", fontSize: "1.2em"}}>{getTemp(day.temp.max)}</td>
          <td style={{color: "#f0f0f0", width:"2.5em", fontSize: "1.2em"}}>{getTemp(day.temp.min)}</td>
        </tr>
      )
    })
  }

  const { dt, main, temp, min, max, description } = current;

  const getSummary = () => {
    const futureDescription = hourly[7].weather[0].description;
    const capitalized = futureDescription.charAt(0).toUpperCase() + futureDescription.slice(1);
    const hours = formatDt(hourly[7].dt).getHours();
    const word = hours > 12 ? "tonight" : "tomorrow";

    return ` ${capitalized} ${word} with a low of ${getTemp(min)}°.`;

  }

  if (loaded) {
    return (
      <div className="App">
        <Header main={main} temp={temp}/>
        <main>
          <TodayRow dt={dt} max={max} min={min}/>
          <Hourly hourly={hourly} temp={temp} />
          <section className="seven-day">
            <table>
              <tbody>
                { formatRows() }
              </tbody>
            </table>
          </section>
          <section className="hourly summary">
            Today: {description.charAt(0).toUpperCase() + description.slice(1)}.
            The high will be {getTemp(daily?.[0].temp.max)}°.
            { getSummary() }
          </section>
        </main>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
