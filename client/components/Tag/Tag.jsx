import React from 'react';
import './style.css';

const Tag = (props) => {
  return (
    <div className="tagButton">{props.tag}</div>
  )
}

export default Tag;