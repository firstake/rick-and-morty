import React from 'react';

import styles from './CustomTextStyles';

const CustomText = ({ style, children }) => (
  <>
    <span className={style}>{children}</span>
    <style jsx>{styles}</style>
  </>
);

export default CustomText;
