import React, { useLayoutEffect } from 'react';

import { crossIcon } from '~/resources';

import * as Styled from './styled';

const PrivacyPolicy = ({ navigation }) => {
  const handleClose = () => {
    navigation.goBack();
  };

  // useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerLeft: (
  //         <Styled.IconButton source={crossIcon} size={20} onPress={handleClose} />
  //       ),
  //     })
  // }, [navigation])

  return (
    <Styled.Content>
      <Styled.Container>
        <Styled.Text fontSize={15} textAlign="justify">
          <Styled.Text fontStyle="bold">(a) Data Collected</Styled.Text>
          {'\n'}
          We collect anonymous data from every visitor of the Website to monitor traffic and fix bugs. For example, we
          collect information like web requests, the data sent in response to such requests, the Internet Protocol
          address, the browser type, the browser language, and a timestamp for the request.{'\n'}
          {'\n'}
          We ask you to log in and provide certain personal information (such as your name and email address) in order
          to be able to save your profile and the documents and comments associated with it. In order to enable these or
          any other login based features, we use cookies to store session information for your convenience. You can
          block or delete cookies and still be able to use Contently, although if you do you will then be asked for your
          username and password every time you log in to the Website. In order to take advantage of certain features of
          the Website, you may also choose to provide us with other personal information, such as your picture or
          personal Website, but your decision to utilize these features and provide such data will always be voluntary.
          {'\n'}
          {'\n'}
          You are able to view, change and remove your data associated with your profile. Should you choose to delete
          your account, please contact us at support@contently.com, and we will follow up with such request as soon as
          possible.{'\n'}
          {'\n'}
          Minors and children should not use Contently. By using the Website, you represent that you have the legal
          capacity to enter into a binding agreement.{'\n'}
          {'\n'}
          <Styled.Text fontStyle="bold">(b) Use of the Data</Styled.Text>
          {'\n'}
          We only use your personal information to provide you the Contently services or to communicate with you about
          the services or the Website.{'\n'}
          {'\n'}
          With respect to any documents you may choose to upload to Contently, we take the privacy and confidentiality
          of such documents seriously. We encrypt all documents, and permanently delete any redacted edits you make to
          documents. If you choose to make a document public, we recommend you redact any and all references to people
          and addresses, as we can’t protect public data and we are not responsible for any violation of privacy law you
          may be liable for.{'\n'}
          {'\n'}
          We employ industry standard techniques to protect against unauthorized access of data about you that we store,
          including personal information.
        </Styled.Text>
      </Styled.Container>
    </Styled.Content>
  );
};

export default PrivacyPolicy;
