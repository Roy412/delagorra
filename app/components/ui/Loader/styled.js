import styled from 'styled-components/native';

import { Colors } from '~/utils/theme';

export const OverlayBackground = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${Colors.overlayColor};
`;
