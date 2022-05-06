import Layout from '../../components/Layout';
import { wrapper } from '../../store';
import {
  getCount,
  getRunningOperationPromises,
  useGetCountQuery,
} from '../../store/countApi/countApi';

const CountPage = () => {
  const { isLoading, error, data } = useGetCountQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('ERROR', error);
    return <div>Error</div>;
  }

  return (
    <Layout title='Count Api'>
      <h1>Count 💊</h1>
      <p>Counter : {data.value}</p>
    </Layout>
  );
};

export default CountPage;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getCount.initiate());
  await Promise.all(getRunningOperationPromises());
  return {
    props: {},
  };
});
