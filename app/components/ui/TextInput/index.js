import React, { useEffect, useState } from 'react';
import TextInputMask from 'react-native-text-input-mask';

import * as Styled from './styled';

const TextInput = ({
  input,
  meta,
  disabled,
  placeholder,
  style = {},
  inputStyle,
  inputRef,
  hasRectBorder,
  isPhone,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) {
      input.onFocus();
    } else {
      input.onBlur();
    }
  }, [isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { onChange, ...restInput } = input;

  const hasError = Styled.FieldError.hasError(meta);

  return (
    <Styled.Container style={style} hasError={hasError} isFocused={isFocused}>
      <Styled.InputContainer>
        {isPhone && <Styled.FlagText>🇨🇳 +86</Styled.FlagText>}
        <Styled.Input
          {...restInput}
          ref={inputRef}
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          editable={!disabled}
          isFocused={isFocused}
          hasError={hasError}
          hasRectBorder={hasRectBorder}
          as={isPhone ? TextInputMask : undefined}
        />
      </Styled.InputContainer>

      <Styled.FieldError meta={meta} />
    </Styled.Container>
  );
};

export default TextInput;
