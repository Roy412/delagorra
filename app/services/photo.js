import { lookup } from 'react-native-mime-types';

import PickingService from './picking';

const file2Attachment = (response, fieldName = 'image') => {
  const name = response.filename || response.path.split('/').pop();
  const type = response.mime || lookup(name);

  return {
    name,
    type,
    fieldName,
    uri: PickingService.platform({
      ios: response.path.replace('file://', ''),
      android: response.path,
    }),
  };
};

export default {
  file2Attachment,
};
