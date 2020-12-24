import React from 'react';

import * as Styled from './styled';

const AccountSecurity = () => {
  const renderItem = ({ item }) => (
    <Styled.Item>
      <Styled.Text fontSize={17} flex={1}>
        {item}
      </Styled.Text>
      {item === 'Phone Number' && <Styled.Text fontSize={17}>Linked</Styled.Text>}
      {item !== 'Phone Number' && <Styled.LinkButton />}
    </Styled.Item>
  );

  const renderSeparator = () => <Styled.Separator />;

  return (
    <Styled.Container>
      <Styled.List
        data={listData}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        keyExtractor={(item) => item}
      />
    </Styled.Container>
  );
};

const listData = ['Phone Number', 'WeChat', 'QQ', 'Apple ID'];

export default AccountSecurity;
