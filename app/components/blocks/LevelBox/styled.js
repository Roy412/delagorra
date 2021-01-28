import styled from 'styled-components/native';

import { Box } from '~/components/ui';

export { Text } from '~/components/ui';

export const Container = styled(Box).attrs((props) => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 18,
  px: 9,
  py: 3,
  ml: 15,
  ...props,
}))``;
