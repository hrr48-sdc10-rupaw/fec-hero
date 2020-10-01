import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';
import Selected from '../Selected/Selected.jsx';
import Selector from '../Selector/Selector.jsx';

const App = (props) => {

  const [gameInfo, setGameInfo] = useState({gameName: null});
  const [selectedImg, setSelectedImg] = useState(1);

  useEffect((id) => {
    getGameInfo(id);
  })

  function getGameInfo(id=2) {
    if (gameInfo.gameName === null) {
      axios.get(`/api/hero/all_info/${id}`)
        .then(res => {
          console.log('following data received from server: ', res.data)
          setGameInfo(res.data)
        })
        .catch(err => console.log('error fetching data from the server'));
    } else {
      return;
    }
  }



  return (
    <section className="outlined" id="hero">
      <div className="outlined" id="topHeading">Heading</div>
      <div className="outlined" id="selected"><Selected imgUrl="https://hack-reactor-projects.s3-us-west-1.amazonaws.com/fec/1/images/2.jpg" /></div>
      <div className="outlined" id="selector"><Selector imgList={gameInfo.gameMedia} /></div>
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