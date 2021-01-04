import React from 'react';
import ImageView from 'react-native-image-viewing';

import * as Styled from './styled';

const Footer = ({ onSave }) => (
  <Styled.Container>
    <Styled.Button variant="text" text="Save picture" onPress={onSave} />
  </Styled.Container>
);

const ImageViewer = (props) => (
  <ImageView FooterComponent={(params) => <Footer onSave={props.onSave} {...params} />} {...props} />
);

export default ImageViewer;
