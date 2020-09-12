import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatDt, getTemp } from './utilities';

const TodayRow = ({ dt, max, min }) => {
  return (
    <section className="current">
      <table>
        <tbody>
          <tr>
            <td style={{textAlign: "left"}}>
              {moment(formatDt(dt)).format('dddd')} TODAY
            </td>
            <td style={{textAlign: "center", width: "2.5em", fontSize: "1.2em"}}>{getTemp(max)}</td>
            <td style={{textAlign: "center", width: "2.5em", color: "#f0f0f0", fontSize: "1.2em"}}>{getTemp(min)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

TodayRow.propTypes = {
  dt: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
};

export default TodayRow;
