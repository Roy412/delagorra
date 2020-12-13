import React from 'react';
import ToastUI from 'react-native-toast-message';

import * as Styled from './styled';

const toastConfig = {
  success: ({ text1 }) => (
    <Styled.Container>
      <Styled.CheckIcon />
      <Styled.Text fontStyle="semibold" fontSize={17}>
        {text1}
      </Styled.Text>
    </Styled.Container>
  ),
};

const Toast = (props) => <ToastUI config={toastConfig} ref={(ref) => ToastUI.setRef(ref)} {...props} />;

export default Toast;
