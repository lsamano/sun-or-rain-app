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
      setCurrent({
        dt: current.dt,
        temp: current.temp,
        feels_like: current.feels_like,
        icon: current?.weather?.[0]?.id,
        main: current?.weather?.[0]?.main
      });
      setDaily(daily);
      setHourly(hourly);
    })
  }, [])

  const formatRows = () => {
    return daily.map((day, index) => {
      const weekday = moment(formatDt(day.dt)).format('dddd');
      const iconCode = day.weather[0].id;
      const main = day.weather.main;
      return (
        <tr key={index}>
          <td style={{textAlign: "left"}}>{weekday}</td>
          <td><i className={`owf owf-${iconCode} owf-lg`}></i></td>
          <td style={{width:"65px"}}>{getTemp(day.temp.day)}</td>
          <td style={{color: "#f0f0f0", width:"65px"}}>{getTemp(day.feels_like.day)}</td>
        </tr>
      )
    })
  }

  const formatDt = dt => {
    let date = new Date();
    const weekday = dt * 1000
    return date.setTime(weekday)
  }

  const getTemp = temp => Math.round(parseInt(temp))

  const { icon, main, temp, feels_like } = current;

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
                <td style={{textAlign: "center", width:"65px"}}>{getTemp(temp)}</td>
                <td style={{textAlign: "center", width:"65px", color: "#f0f0f0"}}>{getTemp(feels_like)}</td>
              </tr>
            </tbody>
          </table>
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
