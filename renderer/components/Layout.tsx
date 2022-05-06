import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'>
          <a>Home</a>
        </Link>{' '}
        <Link href='/count'>
          <a>Count</a>
        </Link>{' '}
        <Link href='/posts'>
          <a>Posts</a>
        </Link>{' '}
        <Link href='/posts/add'>
          <a>Add Post</a>
        </Link>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
