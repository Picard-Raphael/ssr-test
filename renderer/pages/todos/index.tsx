import Layout from '../../components/Layout';
import { dehydrate, QueryClient, useQueryClient } from 'react-query';
import { fetchTodos, useTodos } from '../../services/useTodos';

const TodosPage = () => {
  const { data, isLoading, isFetching } = useTodos();

  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title='Todo Api'>
      <h1>Todos 💊</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={invalidate}>INVALIIIIIIIDE</button>
    </Layout>
  );
};

export default TodosPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['todos'], () => fetchTodos());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
