import React from 'react';
import './style.css';

const SmallInfo = (props) => {
  // infoType can be infoKey || infoValue || infoDate
  return <p className={`${props.infoType}`}>{props.infoValue}</p>
};

export default SmallInfo;