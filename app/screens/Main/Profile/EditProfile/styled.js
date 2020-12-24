import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

import { Button, Image, Box } from '~/components/ui';
import { nextIcon } from '~/resources';

export { Text, Box, Button, IconButton } from '~/components/ui';

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

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
  padding-vertical: 13px;
`;

export const RightArrow = styled(Image).attrs({
  source: nextIcon,
  tintColor: 'veryDarkGray',
})`
  width: 9px;
  aspect-ratio: ${7 / 12};
  opacity: 0.2;
`;

export const Separator = styled(Box).attrs({
  bg: 'grayishBlue',
  ml: 16,
})`
  height: 1px;
`;
