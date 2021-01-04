import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import ButtonUI from '../Button';

export const Container = styled(SafeAreaView)`
  flex-direction: row;
`;

export const Button = styled(ButtonUI).attrs({
  textStyle: {
    color: 'white',
  },
  ml: 30,
  py: 10,
})``;
