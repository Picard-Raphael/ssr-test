import { gql } from 'graphql-request';

export const GET_ALL_USERS_QUERY = `
  {
    users {
        data {
            name
        }
      }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    users {
      data {
        name
      }
    }
  }
`;
