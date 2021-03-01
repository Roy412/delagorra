import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import * as Styled from './styled';

const SortPanel = ({ sortMode, onSort, title, count, type = 'post', style }) => {
  const [sortModes, setSortModes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(availableSortModes[type][0]);

  useEffect(() => {
    setSortModes(_.filter(availableSortModes[type], (item) => item.value !== sortMode));
    setSelectedOption(_.find(availableSortModes[type], (item) => item.value === sortMode));
  }, [sortMode]);

  return (
    <Styled.ActionPicker options={sortModes} onPressItem={(option) => onSort(option.value)} style={style}>
      <Styled.Text flex={1} fontSize={17} color="veryDarkGray">
        {title}
        {count > 0 && ` (${count})`}
      </Styled.Text>
      <Styled.Text fontSize={14} color="rgba(19,19,19,0.7)">
        {selectedOption.label}
      </Styled.Text>
      <Styled.ArrowDownIcon />
    </Styled.ActionPicker>
  );
};

const availableSortModes = {
  post: [
    {
      value: 'new',
      label: 'Newest ',
    },
    {
      value: 'like',
      label: 'Most liked ',
    },
    {
      value: 'old',
      label: 'Oldest ',
    },
  ],
  comment: [
    {
      value: 'new',
      label: 'Newest comments ',
    },
    {
      value: 'like',
      label: 'Most liked comments ',
    },
    {
      value: 'old',
      label: 'Oldest comments ',
    },
  ],
};

export default SortPanel;
