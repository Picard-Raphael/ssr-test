import { request } from 'graphql-request';
import { GET_ALL_TODOS } from './todos.queries';

export const fetchTodos = async () => {
  const data = await request(
    'https://graphqlzero.almansi.me/api',
    GET_ALL_TODOS
  );

  return data.todos.data;
};
