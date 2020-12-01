import { Alert } from 'react-native';

export const showSimpleAlert = (message, delay) => {
  if (delay) {
    setTimeout(() => {
      Alert.alert('ChitChat', message, [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    }, delay);
    return;
  }
  Alert.alert('ChitChat', message, [
    {
      text: 'OK',
      style: 'cancel',
    },
  ]);
};

export const showSimpleError = (e, delay) => {
  showSimpleAlert(e.message || e, delay);
};

export const showResultAlert = (ref, title, message, delay, success = true) => {
  if (delay) {
    setTimeout(() => {
      ref.current.show({
        success,
        title,
        message,
      });
    }, delay);
    return;
  }
  ref.current.show({
    success,
    title,
    message,
  });
};

export const showResultError = (ref, title, e, delay) => {
  showResultAlert(ref, title, e.message || e, delay, false);
};
