import React from 'react';
import { View } from 'react-native';
import _ from 'lodash';

import * as Styled from './styled';

const FieldError = ({ meta, style = {} }) => {
  const errorString = () => {
    if (_.isArray(meta.error)) {
      return meta.error[0];
    } else if (meta.error) {
      return meta.error;
    }
    return meta.submitError;
  };

  if (FieldError.hasError(meta)) {
    return (
      <View style={style}>
        <Styled.Text>{errorString()}</Styled.Text>
      </View>
    );
  }

  return null;
};

FieldError.hasError = (meta, withoutTouch = false) =>
  (withoutTouch || meta.touched) && (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit));

export default FieldError;
