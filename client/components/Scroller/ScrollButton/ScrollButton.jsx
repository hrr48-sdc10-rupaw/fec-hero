import React from 'react';
import './style.css';

const ScrollButton = (props) => {
  let arrowCode;
  if (props.direction === 'left') {
    arrowCode = `\u25BA`;
  } else if (props.direction === 'right') {
    arrowCode = '\u25C4'
  }
  return (
    <div className="scrollButton">{arrowCode}</div>
  )
}

export default ScrollButton;