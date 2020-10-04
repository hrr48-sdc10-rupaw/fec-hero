import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';
import Selected from '../Selected/Selected.jsx';
import Selector from '../Selector/Selector.jsx';
import HeaderImg from '../HeaderImg/HeaderImg.jsx';
import Description from '../Description/Description.jsx';
import GameHeading from '../GameHeading/GameHeading.jsx';
import Tag from '../Tag/Tag.jsx';
import Scroller from '../Scroller/Scroller.jsx';

const App = (props) => {

  const [gameInfo, setGameInfo] = useState({gameName: null});
  const [selectedImg, setSelectedImg] = useState(1);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [backgroundImgUrl, setBackgroundImgUrl] = useState('');

  useEffect((id) => {
    getGameInfo(id);
  });

  const imageClickHandler = (imgUrl) => {
    setSelectedImgUrl(imgUrl);
  }

  function getGameInfo(id=2) {
    if (gameInfo.gameName === null) {
      axios.get(`/api/hero/all_info/${id}`)
        .then(res => {
          console.log('following data received from server: ', res.data)
          setGameInfo(res.data)
          setSelectedImgUrl(res.data.gameMedia[1].mediaUrl)
          let backgroundImgData = res.data.gameMedia.filter(val => val.mediaType === 2);
          // console.log(backgroundImgData[0].mediaUrl)
          setBackgroundImgUrl(backgroundImgData[0].mediaUrl);
          // setting the background image
          let body = document.getElementById('body');
          body.style.backgroundImage = `url(${backgroundImgData[0].mediaUrl})`
        })
        .catch(err => console.log('error fetching data from the server'));
    } else {
      return;
    }
  }

  const getHeaderImgUrl = () => {
    if (gameInfo.gameName !== null) {
      return gameInfo.gameMedia[0].mediaUrl;
    } else {
      return '';
    }
  };

  const getGameDescription = () => {
    if (gameInfo.gameName !== null) {
      return gameInfo.gameDescription;
    } else {
      return '';
    }
  }

  // below two functions are for getting the info data
  const getInfoKeys = () => {
    let infoKeys;
    if (gameInfo.gameName !== null) {
      if (gameInfo.gameReviews.recentReviews) {
        infoKeys = [
          <div key="0" className="infoReviewContainer">
            <div className="infoKey">RECENT REVIEWS: </div>
            <div className="infoKey">ALL REVIEWS: </div>
          </div>,
          <div key="1" className="infoKey infoDateContainer">RELEASE DATE: </div>,
          <div key="2" className="infoKey infoDevPubContainer">
            <div className="infoKey">DEVELOPER: </div>
            <div className="infoKey">PUBLISHER: </div>
          </div>
        ]
      } else {
        infoKeys = [
          <div key="0" className="infoKey infoReviewContainer">ALL REVIEWS: </div>,
          <div key="1" className="infoKey infoDateContainer">RELEASE DATE: </div>,
          <div key="2" className="infoKey infoDevPubContainer">
            <div className="infoKey">DEVELOPER: </div>
            <div className="infoKey">PUBLISHER: </div>
          </div>
        ]
      }
      return infoKeys
    } else {
      return <></>
    }
  };

  const getInfoValues = () => {
    let infoValues;
    if (gameInfo.gameName !== null) {
      if (gameInfo.gameReviews.recentReviews) {
        let rev = gameInfo.gameReviews;
        console.log(rev)
        infoValues = [
          <div key="0" className="infoReviewContainer">
            <div className="infoReview">
              <span className="infoValue">{rev.recentReviews}</span>
              <span className="lightText">{` (${rev.recentReviewCount})`}</span>
            </div>
            <div className="infoReview">
              <span className="infoValue">{rev.allReviews}</span>
              <span className="lightText">{` (${rev.allReviewsCount})`}</span>
            </div>
          </div>,
          <div key="1" className="infoDate infoDateContainer">{gameInfo.releaseDate}</div>,
          <div key="2" className="infoDevPubContainer">
            <div className="infoValue">{gameInfo.developerName}</div>
            <div className="infoValue">{gameInfo.publisherName}</div>
          </div>
        ];
      } else {
        let rev = gameInfo.gameReviews;
        infoValues = [
          <div key="0">
            <span className="infoValue">{rev.allReview}</span>
            <span className="lightText">{rev.allReviewCount}</span>
          </div>,
          <div key="1" className="infoDate">{gameInfo.releaseDate}</div>,
          <div key="2" className="infoDevPubContainer">
            <div className="infoValue">{gameInfo.developerName}</div>
            <div className="infoValue">{gameInfo.publisherName}</div>
          </div>
        ];
      }
      return infoValues;
    } else {
      return <></>
    }
  }

  const getTopTags = () => {
    let tags;
    let tagList;
    if (gameInfo.gameName !== null) {
      tags = gameInfo.gameTags.slice(0, 5);
      tagList = tags.map((val, idx) => <Tag tag={val} key={idx} />);
      tagList.push(<Tag tag='+' key='6' />);
      return tagList;
    } else {
      return <></>
    }
  }

  return (
    <section className="outlined" id="hero">
      <div className="outlined" id="topHeading"><GameHeading gameName={gameInfo.gameName === null ? '' : gameInfo.gameName} /></div>
      <div className="outlined" id="selected"><Selected imgUrl={selectedImgUrl} /></div>
      <div className="outlined" id="selector"><Selector imgClickHandler={imageClickHandler} imgList={gameInfo.gameMedia} /></div>
      <div className="outlined" id="scroller"><Scroller /></div>
      <div id="infoSection">
        <div className="outlined" id="headerImg"><HeaderImg imgUrl={getHeaderImgUrl()}/></div>
        <div className="outlined" id="description"><Description description={getGameDescription()} /></div>
        <div className="outlined" id="additionalInfo">
          <div className="outlined" id="infoKeys">{getInfoKeys()}</div>
          <div className="outlined" id="infoValues">{getInfoValues()}</div>
        </div>
        <div className="outlined" id="tag">
          <p className="lightText">Popular user-defined tags for this product:</p>
          <div className="tagContainer">
            {getTopTags()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default App;