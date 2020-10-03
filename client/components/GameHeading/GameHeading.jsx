import React from 'react';
import './style.css';

const GameHeading = (props) => {
  return (
    <p className="gameName">{props.gameName}</p>
  )
};

export default GameHeading;