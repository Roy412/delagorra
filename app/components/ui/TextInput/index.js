import React, { useEffect, useState } from 'react';

import * as Styled from './styled';

const TextInput = ({ input, meta, disabled, placeholder, style = {}, inputStyle, inputRef, hasRectBorder }) => {
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
      />

      <Styled.FieldError meta={meta} />
    </Styled.Container>
  );
};

export default TextInput;
