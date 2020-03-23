import React from 'react';
import CustomTextStyles from './CustomTextStyles';

const CustomText = (props) => (
  <React.Fragment>
    <span className={props.style}>{props.children}</span>
    <style jsx>{CustomTextStyles}</style>
  </React.Fragment>
)

export default CustomText;
