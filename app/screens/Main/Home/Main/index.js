import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';

import { navigators, home } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { SearchHistoryCreators } from '~/store/actions/searchHistory';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [isSearchMode, setIsSearchMode] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [showSearchResults, setShowSearchResults] = useState();
  const searchList = useRef();
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    navigation.navigate(navigators.mainNav, { screen: home.newPost });
  };

  const handleSearch = (item) => {
    if (item) {
      setSearchKeyword(item);
    }
    setShowSearchResults(true);
    searchList.current.handleRefresh(item);
    dispatch(SearchHistoryCreators.searchAddSuccess(item || searchKeyword));
  };

  const handleUnAuth = () => {
    if (isAuthenticated) {
      return;
    }
    navigation.navigate(navigators.auth);
  };

  const handleSearchPress = () => {
    setIsSearchMode(true);
  };

  const handelCancelSearch = () => {
    setIsSearchMode(false);
    setShowSearchResults(false);
    setSearchKeyword();
    Keyboard.dismiss();
  };

  return (
    <Styled.Container>
      <Styled.Content onPress={handleUnAuth}>
        <Styled.HeaderBar pointerEvents={isAuthenticated ? 'auto' : 'box-only'}>
          {!isSearchMode && <Styled.LogoIcon />}
          <Styled.SearchWrapper>
            <Styled.SearchContainer>
              <Styled.SearchIcon />
              <Styled.SearchInput
                value={searchKeyword}
                onChangeText={setSearchKeyword}
                onSubmitEditing={() => handleSearch()}
                onFocus={handleSearchPress}
                placeholder={!isSearchMode ? 'Search' : 'Please enter keywords'}
                returnKeyType="search"
              />
            </Styled.SearchContainer>
          </Styled.SearchWrapper>
          {!isSearchMode && <Styled.CreateButton text="+ Create" onPress={handleCreatePost} />}
          {isSearchMode && <Styled.CancelButton onPress={handelCancelSearch} />}
        </Styled.HeaderBar>
      </Styled.Content>

      <Styled.SearchHistory isVisible={isSearchMode && !showSearchResults} onSearch={handleSearch} />

      <Styled.PostList onUnAuth={handleUnAuth} type="home" isVisible={!isSearchMode} />
      <Styled.PostList
        ref={searchList}
        onUnAuth={handleUnAuth}
        type="search"
        searchKeyword={searchKeyword}
        isVisible={!!showSearchResults}
      />
    </Styled.Container>
  );
};

export default Home;
