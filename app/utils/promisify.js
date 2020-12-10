export const Promisify = (dispatch, fn, ...args) =>
  new Promise((resolve, reject) => {
    dispatch(fn.apply(null, [...args, resolve, reject]));
  });
