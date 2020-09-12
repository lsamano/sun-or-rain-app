import React from 'react';
import PropTypes from 'prop-types';
import { getTemp } from './utilities';

const Header = ({ main, temp }) => {
  return (
    <header className="App-header">
      <div style={{fontSize: "2em"}}>New York</div>
      <div>{main}</div>
      <div style={{fontSize: "3em"}}>{getTemp(temp)}°</div>
    </header>
  );
}

Header.propTypes = {
  main: PropTypes.string,
  temp: PropTypes.number,
};

export default Header;
