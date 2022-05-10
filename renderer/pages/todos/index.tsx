import MainLayout from '../../layouts/main-layout/main-layout';
import { dehydrate, QueryClient, useQueryClient } from 'react-query';
import styles from './todo.module.css';
import { fetchTodos } from '../../api/todos/todos.fetch';
import { useTodos } from '../../api/todos/useTodos.hooks';
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
    <MainLayout title='Todo Api'>
      <h1 className={styles.todo}>Todos 💊</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button onClick={invalidate}>INVALIIIIIIIDE</button>
    </MainLayout>
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
