import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import { format } from 'date-fns';
import Toast from 'react-native-toast-message';
import _ from 'lodash';

import { userWithoutNoti as userSelector } from '~/store/selectors/session';
import jsonChina from '~/resources/countries/china';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';
import { ProfileCreators } from '~/store/actions/profile';

import * as Styled from './styled';
import InputModal from './InputModal';

const Item = ({ label, description, ...props }) => (
  <Styled.Item {...props}>
    <Styled.Text fontSize={17} flex={1}>
      {label}
    </Styled.Text>
    <Styled.Text fontSize={17} color="rgba(60, 60, 67, 0.6)" mr={7}>
      {description}
    </Styled.Text>
    <Styled.RightArrow />
  </Styled.Item>
);

const EditProfile = ({ navigation }) => {
  const [user, setUser] = useState(useSelector(userSelector));
  const [inputModalType, setInputModalType] = useState();
  const [inputModalId, setInputModalId] = useState();
  const [showDatePicker, setShowDatePicker] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      setLoading(true);
      await Promisify(
        dispatch,
        ProfileCreators.profileUpdateRequest,
        _.pick(user, ['displayName', 'bio', 'gender', 'city', 'birthday']),
      );
      setLoading(false);
      Toast.show({ text1: 'Successful updated the profile!', position: 'bottom' });
    } catch (e) {
      showSimpleError(e);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.RightButton text="Save" onPress={handleSave} />,
    });
  }, [navigation, JSON.stringify(user)]);

  const handleItemPress = (screen) => {
    if (screen.label === 'Display name' || screen.label === 'Bio') {
      setInputModalId(screen.id);
      setInputModalType(screen.label);
    } else if (screen.label === 'Birthday') {
      setShowDatePicker(true);
    }
  };

  const handleGenderOpen = () => {
    if (!user.gender) {
      setUser({ ...user, gender: 'Male' });
    }
  };

  const renderItem = ({ item }) => {
    let description = user[item.id];

    if (item.label === 'Gender') {
      return (
        <RNPickerSelect
          onValueChange={(value) => setUser({ ...user, [item.id]: value })}
          items={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
          ]}
          onOpen={handleGenderOpen}
          placeholder={{}}
          touchableWrapperProps={{ activeOpacity: undefined }}>
          <Item as={Styled.Box} label={item.label} description={description} />
        </RNPickerSelect>
      );
    } else if (item.label === 'Location') {
      if (description) {
        description = `${description}, ${user.country}`;
      } else {
        description = user.country;
      }
      return (
        <RNPickerSelect
          onValueChange={(value) => setUser({ ...user, [item.id]: value })}
          items={jsonChina.map((value) => ({ label: value.province_name_en, value: value.province_name_en }))}
          placeholder={{}}
          touchableWrapperProps={{ activeOpacity: undefined }}>
          <Item as={Styled.Box} label={item.label} description={description} />
        </RNPickerSelect>
      );
    } else if (item.label === 'Birthday' && description) {
      description = format(description, 'MM.dd.yyyy');
    }

    return <Item onPress={() => handleItemPress(item)} label={item.label} description={description} />;
  };

  const renderSeparator = () => <Styled.Separator />;

  const handleConfirmInputModal = (value) => {
    setUser({ ...user, [inputModalId]: value });
  };

  const handleCloseInputModal = () => {
    setInputModalId();
    setInputModalType();
  };

  const handleConfirmBirthday = (value) => {
    setShowDatePicker(false);
    setUser({ ...user, birthday: value });
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
      <DateTimePickerModal
        isVisible={showDatePicker}
        date={user.birthday}
        onConfirm={handleConfirmBirthday}
        onCancel={() => setShowDatePicker(false)}
      />
      <Styled.Loader loading={loading} />
    </Styled.Container>
  );
};

const listData = [
  { id: 'displayName', label: 'Display name' },
  { id: 'bio', label: 'Bio' },
  { id: 'gender', label: 'Gender' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'city', label: 'Location' },
];

export default EditProfile;
