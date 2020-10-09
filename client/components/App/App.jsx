import React, {useEffect, useState, useRef} from 'react';
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
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedImgUrl, setSelectedImgUrl] = useState('');
  const [backgroundImgUrl, setBackgroundImgUrl] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [carouselLength, setcarouselLength] = useState(0);
  const [carouselImages, setcarouselImages] = useState([]);
  let timerIdRef = useRef();

  useEffect(() => {
    getGameInfo();
  }, []);

  useEffect(() => {
    let timerId = setInterval(() => handleScrollButtonClick('right'), 3000);
    // console.log('following timer id set: ' , timerId);
    timerIdRef.current = timerId
    return (() => {
      // console.log('following timer is removed: ', timerId)
      clearInterval(timerIdRef.current);
    });
  })

  const imageClickHandler = (imgUrl) => {
    setSelectedImgUrl(imgUrl);
  }

  function getGameInfo() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    if (id === null) {
      id = 2;
    }
    if (gameInfo.gameName === null) {
      axios.get(`/api/hero/all_info/${id}`)
        .then(res => {
          setGameInfo(prevState => res.data)
          let backgroundImgData = res.data.gameMedia.filter(val => val.mediaType === 2);
          // setting the background image
          let body = document.querySelector('body');
          body.style.backgroundImage = `url(${backgroundImgData[0].mediaUrl})`
          body.style.backgroundPosition = `center top`;
          body.style.backgroundRepeat = `no-repeat`;
          // setting images for carousel
          let images = res.data.gameMedia.filter(val => val.mediaType === 0 ).slice(1);
          console.log(images);
          setcarouselLength(images.length);
          setcarouselImages(images);
          // setSelectedImgUrl(carouselImages[0].mediaUrl)
          setSelectedImgUrl(prevState => {
            return res.data.gameMedia[1].mediaUrl
          });
          setBackgroundImgUrl(backgroundImgData[0].mediaUrl);
        })
        .catch(err => console.log('error fetching data from the server: ', err));
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

  // this function checks if a click is encountered outside modal.
  // if yes, set the state isModal to false, so that modal stops
  // showing
  const handleModalClick = (id) => {
    if (id === 'modal') {
      setIsModal(!isModal);
    }
  }

  // this function sets the state such that modal is displayed
  const handleSelectedClick = () => {
    let modalStatus = isModal;
    setIsModal(!modalStatus)
    clearInterval(timerIdRef.current);

  }

  const handleScrollButtonClick = (direction) => {
    // debugger;
    // console.log('running the button to scroll')
    if (direction === 'right' || direction === 'imageClick') {
      if (selectedImg < carouselLength - 1) {
        setSelectedImgUrl(carouselImages[selectedImg+1].mediaUrl);
        setSelectedImg(selectedImg + 1);
      }
      else {
        setSelectedImgUrl(carouselImages[0].mediaUrl);
        setSelectedImg(0);
      }
    } else if (direction === 'left') {
      if (selectedImg > 0) {
        setSelectedImgUrl(carouselImages[selectedImg - 1].mediaUrl);
        setSelectedImg(selectedImg - 1);
      } else {
        setSelectedImgUrl(carouselImages[carouselLength - 1].mediaUrl);
        setSelectedImg(carouselLength - 1);
      }
    }
  }

  return (
    <section className="outlined" id="hero">
      <div className="outlined" id="topHeading"><GameHeading
        gameName={gameInfo.gameName === null ? '' : gameInfo.gameName} /></div>
      <div className="outlined" id="selected"><Selected
        imagePosition={selectedImg + 1}
        carouselLength={carouselLength}
        handleScrollButtonClick={handleScrollButtonClick}
        handleSelectedClick={handleSelectedClick}
        handleModalClick={handleModalClick}
        showModal={isModal}
        imgUrl={selectedImgUrl} /></div>
      <div className="outlined" id="selector"><Selector
        highlightedImage={selectedImg + 1}
        imgClickHandler={imageClickHandler}
        imgList={gameInfo.gameMedia} /></div>
      <div className="outlined" id="scroller"><Scroller
        handleScrollButtonClick={handleScrollButtonClick}/></div>
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