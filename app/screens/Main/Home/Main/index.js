import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { navigators, home } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const [search, setSearch] = useState();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  const handleSearch = () => {};

  const handleUnAuth = () => {
    if (isAuthenticated) {
      return;
    }
    navigation.navigate(navigators.auth);
  };

  return (
    <Styled.Container>
      <Styled.Content onPress={handleUnAuth}>
        <Styled.HeaderBar pointerEvents={isAuthenticated ? 'auto' : 'box-only'}>
          <Styled.LogoIcon />
          <Styled.SearchContainer>
            <Styled.SearchIcon />
            <Styled.SearchInput value={search} onChangeText={setSearch} onSubmitEditing={handleSearch} />
          </Styled.SearchContainer>
          <Styled.CreateButton text="+ Create" onPress={handleCreatePost} />
        </Styled.HeaderBar>
      </Styled.Content>

      <Styled.PostList onUnAuth={handleUnAuth} />
    </Styled.Container>
  );
};

export default Home;
