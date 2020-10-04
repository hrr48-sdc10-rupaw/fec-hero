import React from 'react';
import Modal from '../Modal/Modal.jsx';
import './style.css';

const Selected = (props) => {
  let conditionalModal;
  if (props.showModal) {
    conditionalModal = <Modal handleModalClick={props.handleModalClick} imgUrl={props.imgUrl}/>;
  } else {
    conditionalModal = <></>;
  }

  return (
    <>
      {conditionalModal}
      <img src={props.imgUrl} onClick={props.handleSelectedClick}/>
    </>
  );
}

export default Selected;