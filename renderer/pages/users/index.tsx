import Layout from '../../components/Layout';
import { dehydrate, QueryClient, useQueryClient } from 'react-query';
import { fetchUsersGraphql, useUsersGraphql } from '../../services/useUsers';

const PeoplePage = () => {
  const { data, isLoading, isFetching } = useUsersGraphql();

  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title='Users Api'>
      <h1>Users 💊</h1>
      <ul>
        {data.map((users) => (
          <li key={users.name}>{users.name}</li>
        ))}
      </ul>
      <button onClick={invalidate}>INVALIIIIIIIDE</button>
    </Layout>
  );
};

export default PeoplePage;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['todos'], () => fetchUsersGraphql());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
