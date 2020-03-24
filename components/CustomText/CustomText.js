import React from 'react';
import styles from './CustomTextStyles';

const CustomText = (props) => {
  const { style, children } = props;
  return (
    <React.Fragment>
      <span className={style}>{children}</span>
      <style jsx>{styles}</style>
    </React.Fragment>
  );
};

export default CustomText;
