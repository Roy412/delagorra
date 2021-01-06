import React, { useState } from 'react';

import { FastImage, Image as ImageUI } from './styled';

const Image = ({ scaleable, width, ...props }) => {
  const [calcImgHeight, setCalcImgHeight] = useState(0);

  if (!props.source.uri || props.blurRadius) {
    return <ImageUI {...props} />;
  }

  const handleLoadImage = (evt) => {
    if (scaleable) {
      setCalcImgHeight((evt.nativeEvent.height / evt.nativeEvent.width) * width);
    }
  };

  return (
    <FastImage
      scaleable={scaleable}
      calcImgWidth={width}
      calcImgHeight={calcImgHeight}
      onLoad={handleLoadImage}
      {...props}
    />
  );
};

export default Image;
