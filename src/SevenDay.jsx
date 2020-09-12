import React from 'react';
import PropTypes from 'prop-types';
import { formatDt, getTemp } from './utilities';
import moment from 'moment';

const SevenDay = ({ daily }) => {
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

  return (
    <section className="seven-day">
      <table>
        <tbody>
          { formatRows() }
        </tbody>
      </table>
    </section>
  );
}

SevenDay.propTypes = {
  daily: PropTypes.array
};

export default SevenDay;
