import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import * as Styled from './styled';

const availableSortModes = ['new', 'like', 'old'];

const SortItem = ({ item, onPress }) => (
  <Styled.Item onPress={onPress}>
    <Styled.Text>{item}</Styled.Text>
  </Styled.Item>
);

const SortPanel = ({ sortMode, onSort, ...props }) => {
  const [sortModes, setSortModes] = useState([]);

  useEffect(() => {
    setSortModes(_.filter(availableSortModes, (item) => item !== sortMode));
  }, [sortMode]);

  const renderItem = ({ item }) => <SortItem item={item} onPress={() => onSort(item)} />;

  return (
    <Styled.List
      data={sortModes}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      bounces={false}
      keyboardShouldPersistTaps="always"
      {...props}
    />
  );
};

export default SortPanel;
