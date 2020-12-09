import React, { isValidElement } from 'react';

import * as Styled from './styled';

const variants = {
  auth: {
    bg: 'white',
    title: 'veryDarkGray',
  },
  main: {
    bg: 'pink',
    title: 'veryDarkGray',
  },
};

const Main = ({ variant = 'main', scene, navigation, previous, sideLarge = false, heightHigh = false }) => {
  const { options } = scene.descriptor;
  const vart = variants[variant] || variants.main;

  const handleBackPress = () => {
    navigation.goBack(null);
  };

  const renderBack = () => <Styled.BackButton tintColor={vart.title} onPress={handleBackPress} />;

  const renderLeft = () => {
    if (isValidElement(options.headerLeft)) {
      return <Styled.Left>{options.headerLeft}</Styled.Left>;
    }

    return <Styled.Left>{previous && renderBack()}</Styled.Left>;
  };

  const renderRight = () => {
    if (isValidElement(options.headerRight)) {
      return <Styled.Right>{options.headerRight}</Styled.Right>;
    }

    return <Styled.Right />;
  };

  const renderTitle = () => <Styled.Title color={vart.title}>{options.title}</Styled.Title>;

  return (
    <Styled.Container style={{ backgroundColor: vart.bg }}>
      <Styled.StatusBar barStyle={variant === 'main' ? 'dark-content' : 'light-content'} bg={vart.bg} />

      <Styled.Content>
        {renderLeft()}
        {renderTitle()}
        {renderRight()}
      </Styled.Content>
    </Styled.Container>
  );
};

export default Main;
