import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';
import _ from 'lodash';

import chinaJson from '~/resources/countries/china';
import { userWithoutNoti as userSelector } from '~/store/selectors/session';
import { ProfileCreators } from '~/store/actions/profile';
import { navigators, auth } from '~/navigation/routeNames';

import * as Styled from './styled';
import InputModal from './InputModal';

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(useSelector(userSelector));
  const [inputModalType, setInputModalType] = useState();
  const [inputModalId, setInputModalId] = useState();

  const handleClose = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.RightButton text="Save" onPress={handleClose} />,
    });
  }, [navigation]);

  const handleItemPress = (screen) => {
    if (screen.label === 'Display name' || screen.label === 'Bio') {
      setInputModalId(screen.id);
      setInputModalType(screen.label);
    }
  };

  const handleClearCache = () => {
    Toast.show({ text1: 'Successful cleared cache!', position: 'top' });
  };

  const handleGenderOpen = () => {
    if (!user.gender) {
      setUser({ ...user, gender: 'Male' });
    }
  };

  const renderItem = ({ item }) => {
    if (item.label === 'Gender') {
      return (
        <RNPickerSelect
          onValueChange={(value) => setUser({ ...user, gender: value })}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          onOpen={handleGenderOpen}
          placeholder={{}}
          touchableWrapperProps={{ activeOpacity: undefined }}>
          <Styled.Item as={Styled.Box}>
            <Styled.Text fontSize={17} flex={1}>
              {item.label}
            </Styled.Text>
            <Styled.Text fontSize={17} color="rgba(60, 60, 67, 0.6)" mr={7}>
              {user.gender}
            </Styled.Text>
            <Styled.RightArrow />
          </Styled.Item>
        </RNPickerSelect>
      );
    }
    return (
      <Styled.Item onPress={() => handleItemPress(item)}>
        <Styled.Text fontSize={17} flex={1}>
          {item.label}
        </Styled.Text>

        <Styled.Text mr={10} fontSize={17} color="rgba(60, 60, 67, 0.6)">
          {user[item.id]}
        </Styled.Text>
        <Styled.RightArrow />
      </Styled.Item>
    );
  };

  const renderSeparator = () => <Styled.Separator />;

  const handleConfirmInputModal = (value) => {
    setUser({ ...user, [inputModalId]: value });
  };

  const handleCloseInputModal = () => {
    setInputModalId();
    setInputModalType();
  };

  return (
    <Styled.Container>
      <Styled.List
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.id}
      />
      <InputModal
        value={user[inputModalId] || ''}
        onClosed={handleCloseInputModal}
        isOpen={!!inputModalType}
        title={inputModalType}
        onConfirm={handleConfirmInputModal}
        prefix={inputModalType === 'Display name' && '@'}
      />
    </Styled.Container>
  );
};

const listData = [
  { id: 'displayName', label: 'Display name' },
  { id: 'bio', label: 'Bio' },
  { id: 'gender', label: 'Gender' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'location', label: 'Location' },
];

export default EditProfile;
