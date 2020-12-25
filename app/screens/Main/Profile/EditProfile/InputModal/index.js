import React, { useState, useRef } from 'react';

import * as Styled from './styled';

const InputModal = ({ title, value: propValue, onClosed, onConfirm, prefix, limit = 20, ...restProps }) => {
  const [value, setValue] = useState(propValue);
  const inputRef = useRef();

  const handleInputPress = () => {
    inputRef.current.focus();
  };

  return (
    <Styled.Modal position="bottom" autoFocus={false} coverScreen onClosed={onClosed} {...restProps}>
      <Styled.Box borderRadius={8} bg="white" px={16} pt={16} pb={30}>
        <Styled.Box flexDirection="row" alignItems="center">
          <Styled.CancelButton text="Cancel" onPress={onClosed} />
          <Styled.Text flex={1} fontSize={17} textAlign="center" fontStyle="semibold">
            {title}
          </Styled.Text>
          <Styled.ConfirmButton text="Confirm" onPress={() => onConfirm(value)} />
        </Styled.Box>
        <Styled.InputWrapper onPress={handleInputPress}>
          <Styled.Box flexDirection="row" alignItems="center">
            {prefix && (
              <Styled.Text fontSize={14} fontStyle="semibold" color="rgba(19,19,19,0.25)">
                {prefix}
              </Styled.Text>
            )}
            <Styled.TextInput autoFocus ref={inputRef} onChange={setValue} maxLength={limit} />
            <Styled.Text fontSize={14} fontStyle="semibold" color="rgba(19,19,19,0.25)">
              {value.length}/{limit}
            </Styled.Text>
          </Styled.Box>
        </Styled.InputWrapper>
      </Styled.Box>
    </Styled.Modal>
  );
};

export default InputModal;
