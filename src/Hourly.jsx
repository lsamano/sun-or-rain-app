import React from 'react';
import PropTypes from 'prop-types';
import { formatDt, getTemp } from './utilities';

const Hourly = ({ hourly, temp }) => {
  const formatHours = () => {
    return hourly.map((hour, index) => {
      const simpleHour = formatSimpleHour(hour.dt);
      const iconCode = hour.weather[0].id;
      const temp = hour.temp;
      return (
        <div key={index} style={{paddingRight: "17px", fontWeight: (index === 0 ? "bold" : "normal")}}>
          <div style={{paddingTop: "10px"}}>
            {index === 0 ? "Now" : simpleHour}
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

  return (
    <section className="hourly">
      { formatHours() }
    </section>
  );
}

Hourly.propTypes = {
  hourly: PropTypes.array,
};

export default Hourly;
