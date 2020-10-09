import React from 'react';
import SelectorSingleImage from '../SelectorSingleImage/SelectorSingleImage.jsx';
import './style.css';

const Selector = (props) => {
  // console.log(props)
  // console.log('received following props: ', props);
  let imageArray;
  if (props.imgList === undefined) {
    imageArray = <></>
  } else {
    // console.log('selector got the following info: ', imageArray);
    imageArray = props.imgList.slice(1).map((val, idx) => {
      if (val.mediaType === 0) {
        return <SelectorSingleImage
        isHighlighted={props.highlightedImage === idx + 1 ? 'isHighlighted' : ''}
        imgClickHandler={props.imgClickHandler}
        key={idx} imgUrl={val.mediaUrl} />
      }
    })
  }

  return (
    <>
      {imageArray}
    </>
  );
};

export default Selector;