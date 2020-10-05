import React from 'react';
import './style.css';
import ScrollButton from './ScrollButton/ScrollButton.jsx';
import Slider from './Slider/Slider.jsx';
import SliderBackground from './SliderBackground/SliderBackground.jsx';

const Scroller = (props) => {

  return (
    <div id="scrollerContainer">
      <ScrollButton handleScrollButtonClick={props.handleScrollButtonClick} direction='left'/>
      <SliderBackground />
      <ScrollButton handleScrollButtonClick={props.handleScrollButtonClick} direction="right"/>
    </div>
  )

};

export default Scroller;