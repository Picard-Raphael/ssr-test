import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/header';

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title = 'This is the default title',
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <Header />
    {children}
  </div>
);

export default MainLayout;
