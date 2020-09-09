import React, { useState, useEffect } from 'react';
import { url } from './fetchUrl';
import './App.css';
import moment from 'moment';

function App() {
  const [ current, setCurrent ] = useState({});
  const [ daily, setDaily ] = useState([]);
  const [ hourly, setHourly ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ current, daily, hourly }) => {
      console.log(hourly);
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
      setLoaded(true);
    })
  }, [])

  const formatHours = () => {
    return hourly.map((hour, index) => {
      const simpleHour = formatSimpleHour(hour.dt);
      const iconCode = hour.weather[0].id;
      const temp = hour.temp;
      return (
        <div key={index} style={{paddingRight: "17px"}}>
          <div style={{paddingTop: "10px"}}>
            {simpleHour}
          </div>
          <div style={{color:"lightSkyBlue", fontSize:"0.75em", whiteSpace: "pre-wrap"}}>
            { hour.pop > 0 ? `${Math.round(hour.pop * 100)}%` : ' ' }
          </div>
          <div>
            <i className={`owf owf-${iconCode} owf-lg`} style={{padding: "7px 0 15px", fontSize: "1.5em"}}></i>
          </div>
          <div style={{paddingBottom: "10px", fontSize: "1.2em"}}>
            { getTemp(temp) }°
          </div>
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
          <td style={{textAlign: "left", width: "6em"}}>{weekday}</td>
          <td><i className={`owf owf-${iconCode} owf-lg`} style={{fontSize: "1.5em"}}></i></td>
          <td style={{width:"2.5em", fontSize: "1.2em"}}>{getTemp(day.temp.max)}</td>
          <td style={{color: "#f0f0f0", width:"2.5em", fontSize: "1.2em"}}>{getTemp(day.temp.min)}</td>
        </tr>
      )
    })
  }

  const formatSimpleHour = dt => {
    let hour = formatDt(dt).getHours();
    let meridiem = "AM";
    if (hour > 12) {
      hour -= 12;
      meridiem = "PM";
    } else if (hour === 0) {
      hour = 12;
    }
    return (
      <>{hour}<span style={{fontSize:"0.8em"}}>{meridiem}</span></>
    )
  }

  const formatDt = dt => {
    let date = new Date();
    const weekday = dt * 1000
    date.setTime(weekday)
    return date
  }

  const getTemp = temp => Math.round(parseInt(temp))

  const { main, temp, min, max } = current;

  if (loaded) {
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
                  <td style={{textAlign: "center", width: "2.5em", fontSize: "1.2em"}}>{getTemp(max)}</td>
                  <td style={{textAlign: "center", width: "2.5em", color: "#f0f0f0", fontSize: "1.2em"}}>{getTemp(min)}</td>
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
  } else {
    return null;
  }
}

export default App;
