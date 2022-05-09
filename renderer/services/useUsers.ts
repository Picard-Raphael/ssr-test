import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

const GET_ALL_USERS_QUERY = `
  {
    users {
        data {
            name
        }
      }
  }
`;
const GET_ALL_USERS = gql`
  query {
    users {
      data {
        name
      }
    }
  }
`;
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
export const useUsers = () => {
  return useQuery('users', async () => fetchUsers());
};

export const fetchUsersGraphql = async () => {
  const data = await request(
    'https://graphqlzero.almansi.me/api',
    GET_ALL_USERS
  );

  return data.users.data;
};

export const useUsersGraphql = (options) => {
  return useQuery('users', async () => fetchUsersGraphql(), { ...options });
};
