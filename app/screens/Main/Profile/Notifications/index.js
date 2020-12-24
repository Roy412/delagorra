import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-native';
import Toast from 'react-native-toast-message';

import { user as userSelector } from '~/store/selectors/session';
import { showSimpleError } from '~/utils/alert';
import { Promisify } from '~/utils/promisify';
import { ProfileCreators } from '~/store/actions/profile';

import * as Styled from './styled';

const ProfileNotifications = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const user = useSelector(userSelector);
  const [notificationData, setNotificationData] = useState(user.notification);

  const handleSave = async () => {
    try {
      setLoading(true);
      await Promisify(dispatch, ProfileCreators.profileUpdateRequest, { notification: notificationData });
      setLoading(false);
      Toast.show({ text1: 'Successful updated notifications!', position: 'bottom' });
    } catch (e) {
      showSimpleError(e);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: <Styled.RightButton text="Save" onPress={handleSave} />,
    });
  }, [navigation, notificationData]);

  const handleValueChange = (id) => (value) => {
    setNotificationData({ ...notificationData, [id]: value });
  };

  const renderItem = ({ item }) => (
    <Styled.Item>
      <Styled.Text fontSize={17} flex={1}>
        {item.label}
      </Styled.Text>
      <Switch value={notificationData[item.id]} onValueChange={handleValueChange(item.id)} />
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
      <Styled.Loader loading={loading} />
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
