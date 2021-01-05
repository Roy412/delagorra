import styled from 'styled-components/native';

import { IconButton, Image as ImageUI } from '~/components/ui';
import { crossIcon } from '~/resources';
import { hitSlopArea } from '~/utils/utils';

export const Container = styled.View``;

export const Image = styled(ImageUI).attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const DeleteButton = styled(IconButton).attrs((props) => ({
  source: crossIcon,
  tintColor: 'white',
  size: 15,
  hitSlop: hitSlopArea(5),
}))`
  background-color: black;
  border-radius: 15px;
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 7px;
`;
