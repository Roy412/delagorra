import styled from 'styled-components/native';

import { profileImage } from '~/resources';

import Image from '../Image';

export const ProfileImage = styled(Image).attrs((props) => ({
  source: props.source || profileImage,
  size: props.size,
  borderRadius: props.size / 2,
}))``;
