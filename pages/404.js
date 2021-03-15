import React from 'react';
import Head from 'next/head';

import { global } from '../components/Header/HeaderStyles';
import BackwardLink from '../components/BackwardLink';

const Custom404 = () => (
  <>
    <Head>
      <title>Rick and Morty - Nothing Found</title>
      <link rel="icon" href="/favicon.png" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet" />
    </Head>
    <h1>404 | Nothing found...</h1>
    <div>
      <BackwardLink pattern="/" to="/" />
    </div>
    <style jsx>{global}</style>
    <style jsx>
      {`
      h1 {
        text-align: center;
        margin-top: 40vh;
      }
      div {
        position: relative;
        width: 71px;
        margin: 0 auto;
      }
    `}
    </style>
  </>
);

export default Custom404;
