import { useQuery } from 'react-query';
import { request, gql } from 'graphql-request';
import { fetchTodos } from './todos.fetch';

const TODOS = 'todos';

export const useTodos = () => {
  return useQuery(TODOS, async () => fetchTodos());
};
