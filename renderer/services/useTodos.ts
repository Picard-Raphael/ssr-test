import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';

const GET_ALL_TODOS = gql`
  query {
    todos {
      data {
        id
        title
      }
    }
  }
`;

export const fetchTodos = async () => {
  const data = await request(
    'https://graphqlzero.almansi.me/api',
    GET_ALL_TODOS
  );

  return data.todos.data;
};

export const useTodos = () => {
  return useQuery('todos', async () => fetchTodos());
};
