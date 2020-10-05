import React from 'react';
import './style.css';

const ScrollButton = (props) => {
  let arrowCode;
  let classAddition;
  if (props.direction === 'left') {
    arrowCode = `\u25C4`;
  } else if (props.direction === 'right') {
    arrowCode = '\u25BA'
  }
  if (props.usedIn === 'modal') {
    arrowCode = props.text;
    classAddition = 'modalNextButton'
  }
  return (
    <div className={`scrollButton scrollButton${props.direction} ${classAddition}`}
      onClick={() => {
        props.handleScrollButtonClick(props.direction);
      }}
    >{arrowCode}</div>
  )
}

export default ScrollButton;