import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const SevenDay = ({ daily }) => {
  const formatRows = () => {
    return daily.map((day, index) => {
      return <Row key={index} day={day} iconCode={day.weather[0].id} />
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
