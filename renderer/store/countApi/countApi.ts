// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

interface Count {
  value: number;
}

// Define a service using a base URL and expected endpoints
export const countApi = createApi({
  reducerPath: 'countApi',
  tagTypes: ['Count'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.countapi.xyz',
  }),
  refetchOnReconnect: true,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCount: builder.query<Count, void>({
      query: () => ({
        url: `get/sm-msn-test`,
        method: 'GET',
      }),
      providesTags: ['Count'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCountQuery,
  util: { getRunningOperationPromises },
} = countApi;

// export endpoints for use in SSR
export const { getCount } = countApi.endpoints;
