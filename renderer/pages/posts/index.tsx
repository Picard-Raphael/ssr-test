import Layout from '../../components/Layout';
import { wrapper } from '../../store';

import {
  getPosts,
  getRunningOperationPromises,
  useGetPostsQuery,
} from '../../store/postApi/postApi';

const PostsPage = () => {
  const { isLoading, error, data } = useGetPostsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('ERROR', error);
    return <div>Error ⚠️</div>;
  }

  return (
    <Layout title='Posts'>
      <h1>Posts 📖</h1>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {data.posts.map((post) => (
          <div
            key={post.id.toString()}
            style={{
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
              width: '40%',
            }}
          >
            <h2 style={{ color: 'red', textTransform: 'uppercase' }}>
              {post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PostsPage;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getPosts.initiate());
  await Promise.all(getRunningOperationPromises());
  return {
    props: {},
  };
});
