import React from 'react';
import PropTypes from 'prop-types';
import { formatDt, getTemp } from '../../utilities';

const Row = ({ day: { dt, temp: {min, max} }, iconCode }) => {
  const weekday = formatDt(dt, true);
  return (
    <tr>
      <td style={{textAlign: "left", width: "6em"}}>{weekday}</td>
      <td><i className={`owf owf-${iconCode} owf-lg`} style={{fontSize: "1.5em"}}></i></td>
      <td style={{width:"2.5em", fontSize: "1.2em"}}>{getTemp(max)}</td>
      <td style={{color: "#f0f0f0", width:"2.5em", fontSize: "1.2em"}}>{getTemp(min)}</td>
    </tr>
  );
}

Row.propTypes = {
  day: PropTypes.shape({
    temp: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  }),
  iconCode: PropTypes.number
};

export default Row;
