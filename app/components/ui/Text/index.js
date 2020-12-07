import styled from 'styled-components/native';
import { space, color, fontSize, lineHeight, textAlign, flex } from 'styled-system';

const Text = styled.Text`
  ${color}
  ${space}
  ${fontSize}
  ${lineHeight}
  ${textAlign}
  ${flex}
  font-family: ${(props) => (props.fontStyle ? `SFUIDisplay-${props.fontStyle}` : 'SFUIDisplay-Regular')};
`;

export default Text;
