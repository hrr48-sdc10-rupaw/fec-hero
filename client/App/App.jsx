import React from 'react';
import './style.css';

const App = (props) => {
  return (
    <section className="outlined" id="hero">
      <div className="outlined" id="topHeading">Heading</div>
      <div className="outlined" id="selected">Selected Image</div>
      <div className="outlined" id="selector">Selector</div>
      <div className="outlined" id="scroller">Scroller</div>
      <div id="infoSection">
        <div className="outlined" id="headerImg">Header Image</div>
        <div className="outlined" id="description">Game Description</div>
        <div className="outlined" id="reviews">Reviews</div>
        <div className="outlined" id="date">Date</div>
        <div className="outlined" id="dev">Developer Info</div>
        <div className="outlined" id="pub">Publisher Info</div>
        <div className="outlined" id="tag">Game Tags</div>
      </div>
    </section>

  )
}

export default App;