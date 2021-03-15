import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../utils/apollo-client';

const MyApp = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default withData(MyApp);
