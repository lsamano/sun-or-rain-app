import React from 'react';
import PropTypes from 'prop-types';
import HourCard from './HourCard';

const Hourly = ({ hourly, temp }) => {
  const formatHours = () => {
    return hourly.map((hour, index) => (
      <HourCard
        hour={hour}
        iconCode={hour.weather[0].id}
        key={index}
        index={index} />
    ))
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
