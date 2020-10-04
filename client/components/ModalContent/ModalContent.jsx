import React from 'react';
import ScrollButton from '../Scroller/ScrollButton/ScrollButton.jsx';
import './style.css';

const ModalContent = (props) => {
  return (
    <div id="modalContent">
      <p>Download full-size version</p>
      <img id="modalImg" src={props.imgUrl} alt="modal image" onClick={() => {
        props.handleScrollButtonClick('imageClick');
      }}></img>
      <div id="modalFooter">
        <ScrollButton usedIn='modal' text="Prev" handleScrollButtonClick={props.handleScrollButtonClick}
        direction="left" />
        <p>{props.imagePosition} of {props.carouselLength} screenshots</p>
        <ScrollButton usedIn='modal' text="Next" handleScrollButtonClick={props.handleScrollButtonClick}
        direction="right" />
      </div>
    </div>
  )
};

export default ModalContent;