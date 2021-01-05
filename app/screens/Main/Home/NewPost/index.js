import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';
import ImagePicker from 'react-native-image-crop-picker';

import PhotoService from '~/services/photo';

import * as Styled from './styled';

const NewPost = ({ navigation }) => {
  const dispatch = useDispatch();
  const [postEnable, setPostEnable] = useState();
  const [loading, setLoading] = useState();
  const [image, setImage] = useState();

  const getInitialValues = () => ({
    title: '',
    content: '',
  });

  const validate = (values) => {
    const constraints = {
      title: {
        presence: { message: '^Required', allowEmpty: false },
        length: { minimum: 3, maximum: 50, tooShort: '^Too short' },
      },
      content: {
        length: { maximum: 40 },
      },
    };

    return Validate(values, constraints);
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handlePost = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.CloseButton onPress={handleClose} />,
      headerRight: <Styled.RightButton disabled={!postEnable} text="Post" onPress={handlePost} />,
    });
  }, [navigation, postEnable]);

  const handlePicturePress = (option) => {
    const func = option === 'Take Photo...' ? ImagePicker.openCamera : ImagePicker.openPicker;
    func({
      width: 500,
      height: 500,
    })
      .then((value) => {
        setImage(PhotoService.file2Attachment(value));
      })
      .catch(() => {});
  };

  const renderForm = ({ values }) => (
    <Styled.Box pt={20} flex={1} bg="#f4f4f4">
      <Styled.Box flex={1} px={18}>
        <Field
          name="title"
          component={Styled.TitleInput}
          placeholder="Enter a title (3 to 50 characters)"
          maxLength={150}
          multiline
        />

        <Field
          name="content"
          component={Styled.ContentInput}
          placeholder="Write out your post"
          maxLength={40}
          multiline
        />

        {image && <Styled.PostImage source={image.uri} onDelete={() => setImage()} />}
      </Styled.Box>

      <Styled.Box flexDirection="row" alignItems="center" justifyContent="space-between" bg="white" px={16} py={10}>
        <Styled.ActionPicker
          options={['Take Photo...', 'Choose from Library...']}
          onPressItem={handlePicturePress}
          disabled={!!image}>
          <Styled.PictureImage />
        </Styled.ActionPicker>
        <Styled.Text fontStyle="semibold" color="pink">
          {values.content ? values.content.length : 0}/40
        </Styled.Text>
      </Styled.Box>
    </Styled.Box>
  );

  return (
    <Styled.Container>
      <Form initialValues={getInitialValues()} validate={validate} render={renderForm} onSubmit={() => ''} />
      <KeyboardSpacer topSpacing={-getBottomSpace()} />
      <Styled.Loader loading={loading} />
    </Styled.Container>
  );
};

export default NewPost;
