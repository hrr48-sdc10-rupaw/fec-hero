import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import ModalContent from '../ModalContent/ModalContent.jsx';

const Modal = props => {

  const modalRoot = document.getElementById('heroModalRoot');

  return (
    ReactDOM.createPortal(
      <div id="modal" onClick={(e) => {
        props.handleModalClick(e.target.id);
      }}>
        <ModalContent
          imagePosition={props.imagePosition}
          carouselLength={props.carouselLength}
          handleScrollButtonClick={props.handleScrollButtonClick}
          imgUrl={props.imgUrl}/>
      </div>
      , modalRoot
    )
  )
}

export default Modal;