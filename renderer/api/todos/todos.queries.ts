import { gql } from 'graphql-request';

export const GET_ALL_TODOS = gql`
  query {
    todos {
      data {
        id
        title
      }
    }
  }
`;
