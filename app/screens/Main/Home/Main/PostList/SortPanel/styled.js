import styled from 'styled-components/native';

import { ActionPicker as ActionPickerUI, Image } from '~/components/ui';
import { arrowDownIcon } from '~/resources';

export { Text, Box, Loader, Image, AvatarCircle } from '~/components/ui';

export const ActionPicker = styled(ActionPickerUI)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ArrowDownIcon = styled(Image).attrs({
  source: arrowDownIcon,
  tintColor: 'rgba(19,19,19,0.8)',
  ml: 4,
})`
  width: 17px;
  aspect-ratio: ${13 / 6};
  height: ${'undefined'};
`;
