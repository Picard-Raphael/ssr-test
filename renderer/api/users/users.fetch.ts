import { GET_ALL_USERS_QUERY, GET_ALL_USERS } from './users.queries';
import { request } from 'graphql-request';

export const fetchUsers = async () => {
  const response = await fetch('https://graphqlzero.almansi.me/api', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ALL_USERS_QUERY,
    }),
  });
  const result = await response.json();
  return result.data.users.data;
};

export const fetchUsersGraphql = async () => {
  const data = await request(
    'https://graphqlzero.almansi.me/api',
    GET_ALL_USERS
  );

  return data.users.data;
};
