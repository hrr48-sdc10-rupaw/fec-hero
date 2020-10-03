import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';
import Selected from '../Selected/Selected.jsx';
import Selector from '../Selector/Selector.jsx';
import HeaderImg from '../HeaderImg/HeaderImg.jsx';
import Description from '../Description/Description.jsx';
import SmallInfo from '../SmallInfo/SmallInfo.jsx';
import GameHeading from '../GameHeading/GameHeading.jsx';
import Tag from '../Tag/Tag.jsx';

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
        infoKeys = 'RECENT REVIEWS:#ALL REVIEWS:#RELEASE DATE:#DEVELOPER:#PUBLISHER'.split('#');
      } else {
        infoKeys = 'ALL REVIEWS:#RELEASE DATE:#DEVEOPER:#PUBLISHER'.split('#');
      }
      return infoKeys.map((val, idx) => {
        return <SmallInfo key={idx} infoType='infoKey' infoValue={val} />
      })
    } else {
      return <></>
    }
  };

  const getInfoValues = () => {
    let infoValues;
    if (gameInfo.gameName !== null) {
      if (gameInfo.gameReviews.recentReviews) {
        let rev = gameInfo.gameReviews;
        infoValues = [
          // <div>
          //   <span className="infoValue">{rev.recentReviews}</span>
          //   <span className="lightText">{rev.recentReviewCount}</span>
          // </div>
          `${rev.recentReviews} (${rev.recentReviewCount})`,
          `${rev.allReviews} (${rev.allReviewsCount})`,
          gameInfo.releaseDate,
          gameInfo.developerName,
          gameInfo.publisherName
        ];
      } else {
        let rev = gameInfo.gameReviews;
        infoValues = [
          `${rev.allReviews} (${rev.allReviewCount})`,
          gameInfo.releaseDate,
          gameInfo.developerName,
          gameInfo.publisherName
        ];
      }
      return infoValues.map((val, idx) => {
        return <SmallInfo key={idx} infoType='infoValue' infoValue={val} />
      })
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
      <div className="outlined" id="scroller">Scroller</div>
      <div id="infoSection">
        <div className="outlined" id="headerImg"><HeaderImg imgUrl={getHeaderImgUrl()}/></div>
        <div className="outlined" id="description"><Description description={getGameDescription()} /></div>
        <div className="outlined" id="additionalInfo">
          <div className="outlined" id="infoKeys">{getInfoKeys()}</div>
          <div className="outlined" id="infoValues">{getInfoValues()}</div>
        </div>
        <div className="outlined" id="tag">
          <p className="lightText">Popular user-defined tags for this product</p>
          <div className="tagContainer">
            {getTopTags()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default App;