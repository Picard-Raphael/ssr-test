// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Define a service using a base URL and expected endpoints
export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:6060/',
  }),
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPosts: builder.query<{ posts: Post[] }, void>({
      query: () => ({
        url: `/posts`,
        method: 'GET',
      }),
      providesTags: ['Posts'],
    }),
    addPost: builder.mutation<Post, Post>({
      query: (post: Post) => ({
        url: `/addPosts`,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useAddPostMutation,
  util: { getRunningOperationPromises },
} = postApi;

// export endpoints for use in SSR
export const { getPosts, addPost } = postApi.endpoints;
