import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Switch } from 'react-native';
import Toast from 'react-native-toast-message';

import { AuthCreators } from '~/store/actions/auth';
import { navigators, auth } from '~/navigation/routeNames';
import { user as userSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const ProfileNotifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const handleSave = () => {
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.RightButton text="Save" onPress={handleSave} />,
    });
  }, [navigation]);

  const handleItemPress = (screen) => {
    if (screen === 'Clear cache') {
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
      navigation.navigate(navigators.mainNav, { screen });
    }
  };

  const handleClearCache = () => {
    Toast.show({ text1: 'Successful cleared cache!', position: 'top' });
  };

  const renderItem = ({ item }) => (
    <Styled.Item onPress={() => handleItemPress(item.route || item.label)}>
      <Styled.Text flex={1}>{item.label}</Styled.Text>
      <Switch value={user.notification[item.id]} />
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
    </Styled.Container>
  );
};

const listData = [
  { id: 'notifications', label: 'Notifications' },
  { id: 'hotPosts', label: 'Hot posts' },
  { id: 'replies', label: 'Replies' },
  { id: 'likes', label: 'Likes' },
  { id: 'shares', label: 'Shares' },
];

export default ProfileNotifications;
