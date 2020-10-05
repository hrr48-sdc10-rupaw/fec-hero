import React from 'react';
import './style.css';

const HeaderImg = (props) => {
  return (
    <img className="headerImg" src={props.imgUrl} alt="header image" />
  )
};

export default HeaderImg;