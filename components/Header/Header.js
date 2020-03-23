import React from 'react';
import Head from 'next/head';

import HeaderStyles, { global } from './HeaderStyles';

const Header = (props) => (
  <React.Fragment>
    <Head>
      <title>{`Rick and Morty - ${props.title}`}</title>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
    </Head>
    <header>
      <h1 className="visually-hidden">{props.title}</h1>
    </header>
    <style jsx>{global}</style>
    <style jsx>{HeaderStyles}</style>
  </React.Fragment>
);

export default Header;
