import React, { isValidElement } from 'react';

import * as Styled from './styled';

const variants = {
  auth: {
    bg: 'white',
    title: 'veryDarkGray',
    statusBar: 'dark-content',
  },
  main: {
    bg: 'pink',
    title: 'white',
    statusBar: 'light-content',
  },
  post: {
    bg: 'rgba(249, 249, 249, 0.94)',
    title: 'black',
    statusBar: 'dark-content',
  },
};

const Main = ({ variant = 'main', scene, navigation, canGoBack = true }) => {
  const { options } = scene.descriptor;
  const vart = variants[variant] || variants.main;

  const handleBackPress = () => {
    navigation.goBack(null);
  };

  const renderBack = () => <Styled.BackButton tintColor={vart.title} onPress={handleBackPress} />;

  const renderLeft = () => {
    if (isValidElement(options.headerLeft) || options.headerLeft === false) {
      return <Styled.Left>{options.headerLeft}</Styled.Left>;
    }

    return <Styled.Left>{canGoBack && navigation.canGoBack() && renderBack()}</Styled.Left>;
  };

  const renderRight = () => {
    if (isValidElement(options.headerRight)) {
      return <Styled.Right>{options.headerRight}</Styled.Right>;
    }

    return <Styled.Right />;
  };

  const renderTitle = () => <Styled.Title color={vart.title}>{options.title}</Styled.Title>;

  return (
    <Styled.Container bg={vart.bg}>
      <Styled.StatusBar barStyle={vart.statusBar} bg={vart.bg} />

      <Styled.Content>
        {renderLeft()}
        {renderTitle()}
        {renderRight()}
      </Styled.Content>
    </Styled.Container>
  );
};

export default Main;
