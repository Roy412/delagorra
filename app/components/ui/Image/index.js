import React from 'react';

import { FastImage, Image as ImageUI } from './styled';

const Image = (props) => {
  if (!props.source.uri || props.blurRadius) {
    return <ImageUI {...props} />;
  }

  return <FastImage {...props} />;
};

export default Image;
