import { AppProps } from 'next/app';
import { wrapper } from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
