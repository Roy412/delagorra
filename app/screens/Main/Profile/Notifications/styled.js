import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Button, Box } from '~/components/ui';

export { Text, Box, Loader, Button } from '~/components/ui';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const RightButton = styled(Button).attrs({
  variant: 'text',
  textProps: { color: 'white', fontStyle: 'regular', fontSize: 17 },
  pr: 15,
})`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { backgroundColor: 'white', marginTop: 5 },
})`
  flex: 1;
`;

export const Item = styled(Box)`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  height: 47px;
`;

export const Separator = styled(Box).attrs({
  bg: 'grayishBlue',
  ml: 16,
})`
  height: 1px;
`;
