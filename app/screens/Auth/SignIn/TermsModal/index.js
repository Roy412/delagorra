import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform, View } from 'react-native';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';
import Modal from 'react-native-modal';

import * as Client from '~/utils/client';
import { showSimpleError } from '~/utils/alert';
import { Colors } from '~/utils/theme';
import { auth } from '~/navigation/routeNames';

import * as Styled from './styled';

const TermsModal = (props) => {
  const navigation = useNavigation();
  const handlePrivacyClick = () => {
    navigation.navigate(auth.privacyPolicy);
  };

  const handleAgree = () => {

  };

  const handleDisAgree = () => {};

  return (
    <Modal {...props}>
      <Styled.Box flex={1} borderRadius={8}>
        <Styled.Text fontStyle="semibold">请阅读并同意以下条款</Styled.Text>
        <Styled.LinkButton text="《桃用户协议》" onPress={handlePrivacyClick} />
        <Styled.Button text="《樱桃隐私政策》" onPress={handlePrivacyClick} />
        <Styled.Button mt={15} onPress={handleAgree} text="同意并不同意" />
        <Styled.Button text="不同意" variant="transparent" textProps={{ color: 'pureBlue' }} onPress={handleDisAgree} />
      </Styled.Box>
    </Modal>
  );
};

export default TermsModal;
