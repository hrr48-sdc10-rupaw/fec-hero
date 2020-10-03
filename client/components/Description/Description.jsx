import React from 'react';
import './style.css';

const Description = (props) => {
  return (
    <p className='gameDescription'>{props.description}</p>
  )
};

export default Description;