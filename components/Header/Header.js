import React from 'react';
import Head from 'next/head';

import styles, { global } from './HeaderStyles';

const Header = (props) => {
  const { title } = props;

  return (
    <React.Fragment>
      <Head>
        <title>{`Rick and Morty - ${title}`}</title>
        <link rel="icon" href="/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
      </Head>
      <header>
        <h1 className="visually-hidden">{title}</h1>
      </header>
      <style jsx>{global}</style>
      <style jsx>{styles}</style>
    </React.Fragment>
  );
};

export default Header;
