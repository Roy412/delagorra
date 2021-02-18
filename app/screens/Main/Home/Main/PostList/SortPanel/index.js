import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import * as Styled from './styled';

const SortPanel = ({ sortMode, onSort }) => {
  const [sortModes, setSortModes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(availableSortModes[0]);

  useEffect(() => {
    setSortModes(_.filter(availableSortModes, (item) => item.value !== sortMode));
    setSelectedOption(_.find(availableSortModes, (item) => item.value === sortMode));
  }, [sortMode]);

  return (
    <Styled.ActionPicker options={sortModes} onPressItem={(option) => onSort(option.value)}>
      <Styled.Text flex={1} fontSize={17} color="veryDarkGray">
        Search results
      </Styled.Text>
      <Styled.Text fontSize={14} color="rgba(19,19,19,0.7)">
        {selectedOption.label}
      </Styled.Text>
      <Styled.ArrowDownIcon />
    </Styled.ActionPicker>
  );
};

const availableSortModes = [
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
];

export default SortPanel;
