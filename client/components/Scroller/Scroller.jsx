import React from 'react';
import './style.css';
import ScrollButton from './ScrollButton/ScrollButton.jsx';
import Slider from './Slider/Slider.jsx';

const Scroller = () => {

  return (
    <div id="scrollerContainer">
      <ScrollButton direction='right'/>
      <Slider />
      <ScrollButton direction="left"/>
    </div>
  )

};

export default Scroller;