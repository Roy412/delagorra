import { useEffect } from 'react';

export const Promisify = (dispatch, fn, ...args) =>
  new Promise((resolve, reject) => {
    dispatch(fn.apply(null, [...args, resolve, reject]));
  });

// use async operation with automatic abortion on unmount
export const useAsync = (asyncFn, onSuccess) => {
  useEffect(() => {
    let isMounted = true;
    asyncFn().then((data) => {
      if (isMounted) {
        onSuccess(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [asyncFn, onSuccess]);
};
