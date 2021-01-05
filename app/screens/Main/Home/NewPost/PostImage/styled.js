import styled from 'styled-components/native';

import { IconButton, Image as ImageUI } from '~/components/ui';
import { crossCircleIcon } from '~/resources';
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
  source: crossCircleIcon,
  size: 25,
  hitSlop: hitSlopArea(5),
}))`
  position: absolute;
  right: 5px;
  top: 5px;
`;
