import React, { ReactNode } from 'react';
import Link from 'next/link';

const Header: React.FC = () => (
  <header>
    <nav>
      <Link href='/'>
        <a>Home</a>
      </Link>{' '}
      <Link href='/users'>
        <a>Users</a>
      </Link>{' '}
      <Link href='/todos'>
        <a>Todos</a>
      </Link>
    </nav>
  </header>
);

export default Header;
