import React from 'react';
import styles from './CustomTextStyles';

const CustomText = (props) => (
  <React.Fragment>
    <span className={props.style}>{props.children}</span>
    <style jsx>{styles}</style>
  </React.Fragment>
)

export default CustomText;
