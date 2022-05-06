import Layout from '../../../components/Layout';
import { wrapper } from '../../../store';
import { useAddPostMutation } from '../../../store/postApi/postApi';
import { useRouter } from 'next/router';

const AddPostsPage = () => {
  const router = useRouter();
  const [addPost, { isLoading: isUpdating }] = useAddPostMutation();

  const submit = (evt) => {
    evt.preventDefault();
    console.log({
      userId: Date.now(),
      id: Date.now(),
      title: evt.target.title.value,
      body: evt.target.content.value,
    });
    addPost({
      userId: Date.now(),
      id: Date.now(),
      title: evt.target.title.value,
      body: evt.target.content.value,
    })
      .unwrap()
      .catch((e) => console.log(e));

    router.push('/posts');
  };
  return (
    <Layout title='Posts Add '>
      <h1>Add Post 📖</h1>
      <form onSubmit={submit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='title'>Title</label>
          <br />
          <input id='title' type='text' required />
        </div>
        <div>
          <label htmlFor='content'>Content</label>
          <br />
          <textarea id='content' required />
        </div>
        <button type='submit'>Send</button>
      </form>
    </Layout>
  );
};

export default AddPostsPage;

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  return {
    props: {},
  };
});
