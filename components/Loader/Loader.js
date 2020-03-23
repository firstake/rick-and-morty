import React from 'react';
import styles from './LoaderStyles';

const Loader = () => (
  <React.Fragment>
    <div>
      <img src="/images/loader.gif" alt="Loader" />
    </div>
    <style jsx>{styles}</style>
  </React.Fragment>
)

export default Loader;
