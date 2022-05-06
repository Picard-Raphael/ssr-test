import { useState } from 'react';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../store';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from '../store/counter/counterSlice';

const IndexPage = () => {
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  return (
    <Layout title='Home | Next.js + TypeScript + Electron Example'>
      <h1>Hello Next.js 👋</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <br />
      <div style={{ marginTop: '10px' }}>
        <input
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
          type='number'
          style={{ marginBottom: '10px' }}
        />
        <button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment
        </button>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};
