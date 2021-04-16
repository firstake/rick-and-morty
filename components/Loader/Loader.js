import React from 'react';

import styles from './LoaderStyles';

const Loader = ({ isShown }) => (isShown ? (
  <>
    <div>
      <img src="/images/loader.gif" alt="Loader" />
    </div>
    <style jsx>{styles}</style>
  </>
) : null);

export default Loader;
