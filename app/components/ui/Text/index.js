import styled from 'styled-components/native';
import { space, color, fontSize, lineHeight, textAlign } from 'styled-system';

export const Text = styled.Text`
  ${color}
  ${space}
  ${fontSize}
  ${lineHeight}x
  ${textAlign}
  font-family: ${(props) => `SFUIDisplay-${props.fontStyle}`};
`;
