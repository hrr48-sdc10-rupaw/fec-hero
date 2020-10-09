import React from 'react';

const SelectorSingleImage = (props) => {

  return (
    <img onClick={() => {
      props.imgClickHandler(props.imgUrl)
    }} style={{margin: 2, height: 65, width: 116}} className={`selectorSingleImg ${props.isHighlighted}`} src={props.imgUrl}></img>
  )
}

export default SelectorSingleImage;