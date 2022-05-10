import { useQuery } from 'react-query';
import { fetchUsers, fetchUsersGraphql } from './users.fetch';

const USERS = 'users';

export const useUsersGraphql = (options) => {
  return useQuery(USERS, async () => fetchUsersGraphql(), { ...options });
};

export const useUsers = () => {
  return useQuery(USERS, async () => fetchUsers());
};
