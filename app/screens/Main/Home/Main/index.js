import React from 'react';

import { navigators, home } from '~/navigation/routeNames';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  return (
    <Styled.Content>
      <Styled.Box flexDirection="row" alignItems="center">
        <Styled.Button text="+ Create" onPress={handleCreatePost} />
      </Styled.Box>
      <Styled.PostList />
    </Styled.Content>
  );
};

export default Home;
