import React from 'react';
import Modal from '../Modal/Modal.jsx';
import './style.css';

const Selected = (props) => {
  let conditionalModal;
  if (props.showModal) {
    conditionalModal = <Modal
      imagePosition={props.imagePosition}
      carouselLength={props.carouselLength}
      handleScrollButtonClick={props.handleScrollButtonClick}
      handleModalClick={props.handleModalClick}
      imgUrl={props.imgUrl}/>;
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