import styled from 'styled-components/native';

import { checkIcon } from '~/resources';

import Box from '../Box';
import Image from '../Image';

export Box from '../Box';
export Text from '../Text';

export const Container = styled(Box).attrs({
  bg: '#FFEFF2',
  flexDirection: 'row',
  alignItems: 'center',
  py: 10,
  px: 30,
})`
  border: 1px solid #ffdbde;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
`;

export const CheckIcon = styled(Image).attrs({
  source: checkIcon,
  size: 11,
  mr: 10,
})``;
