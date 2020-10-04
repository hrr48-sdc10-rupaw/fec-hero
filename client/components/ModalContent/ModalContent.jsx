import React from 'react';
import './style.css';

const ModalContent = (props) => {
  return (
    <div id="modalContent">
      <img id="modalImg" src={props.imgUrl} alt="modal image"></img>
    </div>
  )
};

export default ModalContent;