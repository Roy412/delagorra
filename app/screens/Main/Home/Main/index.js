import React, { useState } from 'react';

import { navigators, home } from '~/navigation/routeNames';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const [search, setSearch] = useState();

  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  const handleSearch = () => {};

  return (
    <Styled.Content>
      <Styled.Box flexDirection="row" alignItems="center" py={12} px={16} bg="white">
        <Styled.LogoIcon />
        <Styled.SearchContainer>
          <Styled.SearchIcon />
          <Styled.SearchInput value={search} onChangeText={setSearch} onSubmitEditing={handleSearch} />
        </Styled.SearchContainer>
        <Styled.CreateButton text="+ Create" onPress={handleCreatePost} />
      </Styled.Box>
      <Styled.PostList />
    </Styled.Content>
  );
};

export default Home;
