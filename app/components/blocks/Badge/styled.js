import styled from 'styled-components/native';

import { Box } from '~/components/ui';

export { Text } from '~/components/ui';

export const Container = styled(Box).attrs((props) => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  px: 6,
  bg: 'pink',
  ...props,
}))`
  min-width: 20px;
  height: 20px;
`;
