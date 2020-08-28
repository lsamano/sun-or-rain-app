import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';
import './App.css';
import moment from 'moment';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState([]);
  const [ hourly, setHourly ] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      console.log(daily);
      setCurrent({
        dt: current.dt,
        temp: current.temp,
        feels_like: current.feels_like,
        min: daily[0].temp.min,
        max: daily[0].temp.max,
        icon: current?.weather?.[0]?.id,
        main: current?.weather?.[0]?.main
      });
      setDaily(daily.slice(1));
      setHourly(hourly);
    })
  }, [])

  const formatHours = () => {
    return hourly.map((hour, index) => {
      const simpleHour = formatSimpleHour(hour.dt)
      const iconCode = hour.weather[0].id;
      const temp = hour.temp;
      return (
        <div key={index} style={{paddingRight: "17px"}}>
          <p>
            {simpleHour}
          </p>
          <i className={`owf owf-${iconCode} owf-lg`}></i>
          <p>
            { getTemp(temp) }°
          </p>
        </div>
      )
    })
  }

  const formatRows = () => {
    return daily.map((day, index) => {
      const weekday = moment(formatDt(day.dt)).format('dddd');
      const iconCode = day.weather[0].id;
      return (
        <tr key={index}>
          <td style={{textAlign: "left"}}>{weekday}</td>
          <td><i className={`owf owf-${iconCode} owf-lg`}></i></td>
          <td style={{width:"65px"}}>{getTemp(day.temp.max)}</td>
          <td style={{color: "#f0f0f0", width:"65px"}}>{getTemp(day.temp.min)}</td>
        </tr>
      )
    })
  }

  const formatSimpleHour = dt => {
    const hour = formatDt(dt).getHours();
    return hour > 12 ? `${hour - 12}pm` : hour === 0 ? "12am" : `${hour}am`;
  }

  const formatDt = dt => {
    let date = new Date();
    const weekday = dt * 1000
    date.setTime(weekday)
    return date
  }

  const getTemp = temp => Math.round(parseInt(temp))

  const { main, temp, min, max } = current;

  return (
    <div className="App">
      <header className="App-header">
        <div style={{fontSize: "2em"}}>New York</div>
        <div>{main}</div>
        <div style={{fontSize: "3em"}}>{getTemp(temp)}°</div>
      </header>
      <main>
        <section className="current">
          <table>
            <tbody>
              <tr>
                <td style={{textAlign: "left"}}>
                  {moment(formatDt(current.dt)).format('dddd')} TODAY
                </td>
                <td style={{textAlign: "center", width:"65px"}}>{getTemp(max)}</td>
                <td style={{textAlign: "center", width:"65px", color: "#f0f0f0"}}>{getTemp(min)}</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="hourly">
          { formatHours() }
        </section>
        <section className="seven-day">
          <table>
            <tbody>
              { formatRows() }
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
