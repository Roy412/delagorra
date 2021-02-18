import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchHistory as searchHistorySelector } from '~/store/selectors/session';
import { SearchHistoryCreators } from '~/store/actions/searchHistory';

import * as Styled from './styled';

const SearchHistory = ({ onSearch, isVisible }) => {
  const dispatch = useDispatch();
  const searchHistory = useSelector(searchHistorySelector);

  const handleClear = (item) => {
    dispatch(SearchHistoryCreators.searchRemoveSuccess(item));
  };

  const renderItem = ({ item }) => (
    <Styled.Item key={item} onPress={() => onSearch(item)}>
      <Styled.HistoryIcon />
      <Styled.Text ml={10} fontSize={17} flex={1} color="rgba(60, 60, 67, 0.6)">
        {item}
      </Styled.Text>
      <Styled.ClearButton onPress={() => handleClear(item)} />
    </Styled.Item>
  );

  if (!isVisible) {
    return null;
  }

  return <Styled.List data={searchHistory} renderItem={renderItem} keyExtractor={(item) => item} />;
};

export default SearchHistory;
