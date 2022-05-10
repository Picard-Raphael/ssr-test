import MainLayout from '../../layouts/main-layout/main-layout';
import { dehydrate, QueryClient, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useUsersGraphql } from '../../api/users/useUsers.hooks';
import { fetchUsersGraphql } from '../../api/users/users.fetch';

const PeoplePage = () => {
  const [enabled, toggleEnabled] = useState(false);
  const { data, isLoading } = useUsersGraphql({
    staleTime: 60_000,
    enabled,
  });
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries();
  };
  const deleteCache = () => {
    queryClient.removeQueries('users');
  };

  const setEnabled = () => {
    toggleEnabled(true);
    setTimeout(() => toggleEnabled(false), 1000);
  };
  const users = data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout title='Users Api'>
      <h1>Users 💊</h1>
      <ul>
        {users.map((users) => (
          <li key={users.name}>{users.name}</li>
        ))}
      </ul>
      <button onClick={() => setEnabled()}>Go take users !</button>
      <button onClick={() => deleteCache()}>Delete Cache !</button>
      <button onClick={() => invalidateCache()}>Invalide Cache !</button>
    </MainLayout>
  );
};

export default PeoplePage;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['users'], () => fetchUsersGraphql());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
