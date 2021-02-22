import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

import { navigators, home } from '~/navigation/routeNames';
import { isAuthenticated as isAuthenticatedSelector } from '~/store/selectors/session';
import { SearchHistoryCreators } from '~/store/actions/searchHistory';
import { PostCreators } from '~/store/actions/post';

import * as Styled from './styled';

const Home = ({ navigation }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [isSearchMode, setIsSearchMode] = useState();
  const [searchKeyword, setSearchKeyword] = useState();
  const [showSearchResults, setShowSearchResults] = useState();
  const [loading, setLoading] = useState();
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

  const handleShare = async (item) => {
    let imagePath = null;
    const shareOptions = { message: item.title };

    try {
      setLoading(true);
      if (item.image) {
        const resp = await RNFetchBlob.config({ fileCache: true }).fetch('GET', item.image);
        imagePath = resp.path();
        let base64Data = await resp.readFile('base64');
        base64Data = 'data:image/png;base64,' + base64Data;
        shareOptions.url = base64Data;
      }
      setLoading(false);
      await Share.open(shareOptions);

      if (imagePath) {
        RNFetchBlob.fs.unlink(imagePath);
      }

      dispatch(PostCreators.postUpdateStatusRequest({ postId: item._id, status: { share: true } }));
    } catch (err) {
      setLoading(false);
    }
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

      <Styled.PostList onUnAuth={handleUnAuth} type="home" isVisible={!isSearchMode} onShare={handleShare} />
      <Styled.PostList
        ref={searchList}
        onUnAuth={handleUnAuth}
        type="search"
        searchKeyword={searchKeyword}
        isVisible={!!showSearchResults}
        onShare={handleShare}
      />

      <Styled.Loader loading={loading} />
    </Styled.Container>
  );
};

export default Home;
