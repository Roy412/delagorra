import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth, profile } from '~/navigation/routeNames';

import * as Styled from './styled';

const ProfileSettings = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.LeftButton text="Close" onPress={handleClose} />,
    });
  }, [navigation]);

  const handleSignOut = () => {
    navigation.reset({ index: 0, routes: [{ name: navigators.auth, params: { screen: auth.signIn } }] });
    dispatch(AuthCreators.logOutRequest());
  };

  const handleItemPress = (route) => {
    if (route === 'Clear cache') {
      Alert.alert(
        'Warning',
        'Do you want to clear the cache?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'OK', onPress: handleClearCache },
        ],
        { cancelable: false },
      );
    } else {
      navigation.navigate(navigators.mainNav, { screen: route });
    }
  };

  const handleClearCache = () => {
    Toast.show({ text1: 'Successful cleared cache!', position: 'top' });
  };

  const renderItem = ({ item }) => (
    <Styled.Item onPress={() => handleItemPress(item.route || item.label)}>
      <Styled.Text flex={1}>{item.label}</Styled.Text>
      <Styled.RightArrow />
    </Styled.Item>
  );

  const renderSeparator = () => <Styled.Separator />;

  return (
    <Styled.Container>
      <Styled.List
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item.label}
      />
      <Styled.Button my={50} mx={30} text="Sign Out" onPress={handleSignOut} />
    </Styled.Container>
  );
};

const listData = [
  {
    label: 'Clear cache',
  },
  {
    label: 'Check version of the app',
    route: profile.checkVersion,
  },
  {
    label: 'About Us',
    route: profile.about,
  },
];

export default ProfileSettings;
