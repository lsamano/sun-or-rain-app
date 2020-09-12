import React from 'react';
import PropTypes from 'prop-types';
import { formatDt, getTemp } from '../../utilities';

const Summary = ({ hourly, daily, description, min }) => {
  const getSummary = () => {
    const futureDescription = hourly[7].weather[0].description;
    const capitalized = futureDescription.charAt(0).toUpperCase() + futureDescription.slice(1);
    const hours = formatDt(hourly[7].dt).getHours();
    const word = hours > 12 ? "tonight" : "tomorrow";

    return ` ${capitalized} ${word} with a low of ${getTemp(min)}°.`;
  }

  return (
    <section className="hourly summary">
      Today: {description.charAt(0).toUpperCase() + description.slice(1)}.
      The high will be {getTemp(daily?.[0].temp.max)}°.
      { getSummary() }
    </section>
  );
}

Summary.propTypes = {
  hourly: PropTypes.array,
  daily: PropTypes.array,
  description: PropTypes.string,
  min: PropTypes.number
};

export default Summary;
