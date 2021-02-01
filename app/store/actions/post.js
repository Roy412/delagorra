import { createActions } from 'reduxsauce';

export const { Types: PostTypes, Creators: PostCreators } = createActions(
  {
    createPostRequest: ['payload', 'resolve', 'reject'],
    createPostSuccess: ['post'],

    getPostsRequest: ['payload', 'resolve', 'reject'],
    getPostsSuccess: ['payload'],

    postUpdateStatusRequest: ['payload', 'resolve', 'reject'],
    postUpdateStatusSuccess: ['payload'],
  },
  { prefix: 'Post/' },
);
