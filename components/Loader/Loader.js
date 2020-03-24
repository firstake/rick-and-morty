import React from 'react';
import styles from './LoaderStyles';

const Loader = (props) => {
  const { isShown } = props;
  return isShown ? (
    <React.Fragment>
      <div>
        <img src="/images/loader.gif" alt="Loader" />
      </div>
      <style jsx>{styles}</style>
    </React.Fragment>
  ) : null;
};

export default Loader;
