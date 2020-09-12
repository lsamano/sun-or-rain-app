import React from 'react';
import PropTypes from 'prop-types';
import { formatDt, getTemp } from '../../utilities';

const HourCard = ({ hour: { dt, temp, pop }, index, iconCode }) => {
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
    <div style={{paddingRight: "17px", fontWeight: (index === 0 ? "bold" : "normal")}}>
      <div style={{paddingTop: "10px"}}>
        {index === 0 ? "Now" : formatSimpleHour(dt)}
      </div>
      <div style={{color:"lightSkyBlue", fontSize:"0.75em", whiteSpace: "pre-wrap"}}>
        { pop > 0 ? `${Math.round(pop * 100)}%` : ' ' }
      </div>
      <div>
        <i className={`owf owf-${iconCode} owf-lg`} style={{padding: "7px 0 15px", fontSize: "1.5em"}}></i>
      </div>
      <div style={{paddingBottom: "10px", fontSize: "1.2em"}}>
        { getTemp(temp) }°
      </div>
    </div>
  );
}

HourCard.propTypes = {
  hour: PropTypes.shape({
    dt: PropTypes.number,
    temp: PropTypes.number,
    pop: PropTypes.number,
  }),
  index: PropTypes.number,
  iconCode: PropTypes.number
};

export default HourCard;
