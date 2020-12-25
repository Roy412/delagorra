import React, { useState, useRef, useEffect } from 'react';

import * as Styled from './styled';

const InputModal = ({ title, value: propValue, onClosed, onConfirm, prefix, limit = 20, ...restProps }) => {
  const [value, setValue] = useState(propValue);
  const inputRef = useRef();

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleInputPress = () => {
    inputRef.current.focus();
  };

  const handleConfirm = () => {
    onConfirm(value);
    onClosed();
  };

  return (
    <Styled.Modal position="bottom" autoFocus={false} coverScreen onClosed={onClosed} {...restProps}>
      <Styled.Box borderRadius={8} bg="white" px={16} pt={16} pb={20}>
        <Styled.Box flexDirection="row" alignItems="center">
          <Styled.CancelButton text="Cancel" onPress={onClosed} />
          <Styled.Text flex={1} fontSize={17} textAlign="center">
            {title}
          </Styled.Text>
          <Styled.ConfirmButton text="Confirm" onPress={handleConfirm} disabled={!value} />
        </Styled.Box>
        <Styled.InputWrapper onPress={handleInputPress}>
          <Styled.InputContainer flexDirection="row" alignItems="center">
            {prefix && (
              <Styled.Text fontSize={14} fontStyle="semibold" color="rgba(19,19,19,0.25)" mr={3}>
                {prefix}
              </Styled.Text>
            )}
            <Styled.TextInput
              autoFocus
              ref={inputRef}
              onChangeText={setValue}
              maxLength={limit}
              value={value}
              onSubmitEditing={handleConfirm}
            />
            <Styled.Text ml={3} fontSize={14} fontStyle="semibold" color="rgba(19,19,19,0.25)">
              {value.length}/{limit}
            </Styled.Text>
          </Styled.InputContainer>
        </Styled.InputWrapper>
      </Styled.Box>
    </Styled.Modal>
  );
};

export default InputModal;
