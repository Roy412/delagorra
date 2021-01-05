import { createActions } from 'reduxsauce';

export const { Types: PostTypes, Creators: PostCreators } = createActions(
  {
    createPostRequest: ['payload', 'resolve', 'reject'],

    getPostsRequest: ['payload', 'resolve', 'reject'],
    getPostsSucess: ['payload'],
  },
  { prefix: 'Post/' },
);
