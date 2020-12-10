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
  variant,
  onSendPress,
  btnSendText,
  codeSending,
  ...restProps
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

  const handleChangeText = (formatted, extracted) => {
    if (variant === 'phone') {
      onChange(extracted);
    } else {
      onChange(formatted);
    }
  };

  const handleClear = () => {
    onChange('');
  };

  const hasError = Styled.FieldError.hasError(meta);

  return (
    <Styled.Container style={style}>
      <Styled.InputContainer hasError={hasError} isFocused={isFocused} disabled={disabled}>
        {variant === 'phone' && <Styled.FlagText>🇨🇳 +86</Styled.FlagText>}
        <Styled.Input
          {...restInput}
          {...restProps}
          ref={inputRef}
          style={inputStyle}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          editable={!disabled}
          isFocused={isFocused}
          hasError={hasError}
          hasRectBorder={hasRectBorder}
          as={restProps.mask ? TextInputMask : undefined}
        />
        {codeSending && <Styled.ActivityIndicator size="small" color="#0000aa" />}
        {!codeSending && variant === 'phoneCode' && <Styled.SendButton text={btnSendText} onPress={onSendPress} />}
        {!disabled && !!restInput.value && <Styled.ClearButton onPress={handleClear} />}
      </Styled.InputContainer>

      <Styled.FieldError meta={meta} />
    </Styled.Container>
  );
};

export default TextInput;
