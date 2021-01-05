import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { navigators, home } from '~/navigation/routeNames';
import { posts as postsSelector } from '~/store/selectors/post';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector);

  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  return (
    <Styled.Content>
      <Styled.Box flexDirection="row" alignItems="center">
        <Styled.Button text="+ Create" onPress={handleCreatePost} />
      </Styled.Box>
      <Styled.PostList posts={posts} />
    </Styled.Content>
  );
};

export default Home;
