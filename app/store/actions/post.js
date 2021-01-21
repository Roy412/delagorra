import { createActions } from 'reduxsauce';

export const { Types: PostTypes, Creators: PostCreators } = createActions(
  {
    createPostRequest: ['payload', 'resolve', 'reject'],

    getPostsRequest: ['payload', 'resolve', 'reject'],
    getPostsSuccess: ['payload'],

    postLikeRequest: ['payload', 'resolve', 'reject'],
    postLikeSuccess: ['payload'],

    postActionLoadingSuccess: ['loading'],
  },
  { prefix: 'Post/' },
);
