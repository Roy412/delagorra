import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Field, Form } from 'react-final-form';
import Validate from 'validate.js';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import { OnChange } from 'react-final-form-listeners';

import { Promisify } from '~/utils/promisify';
import PhotoService from '~/services/photo';
import { PostCreators } from '~/store/actions/post';
import { showSimpleError } from '~/utils/alert';

import * as Styled from './styled';

const NewPost = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postEnable, setPostEnable] = useState();
  const [loading, setLoading] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    setPostEnable(!!title && title.length > 2 && (!!content || !!image));
  }, [title, content, image]);

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

  const handlePost = async () => {
    try {
      setLoading(true);
      await Promisify(dispatch, PostCreators.createPostRequest, { title, description: content, postImage: image });
      setLoading(false);
      Toast.show({
        text1: 'Successful published the post!',
        position: 'bottom',
        onHide: handleClose,
        visibilityTime: 1000,
      });
    } catch (e) {
      showSimpleError(e);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: <Styled.CloseButton onPress={handleClose} />,
      headerRight: <Styled.RightButton disabled={!postEnable} text="Post" onPress={handlePost} />,
    });
  }, [navigation, postEnable, title, content, image]);

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
    <Styled.Box flex={1}>
      <Styled.FormContainer>
        <Styled.Box px={18}>
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

          <OnChange name="title">{setTitle}</OnChange>
          <OnChange name="content">{setContent}</OnChange>

          {image && <Styled.PostImage url={image.uri} onDelete={() => setImage()} />}
        </Styled.Box>
      </Styled.FormContainer>

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
