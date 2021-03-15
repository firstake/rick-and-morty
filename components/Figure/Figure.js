import React from 'react';
import styles from './FigureStyles';
import CustomText from '../CustomText/CustomText';

import typeToPicture from '../../utils/typeToPicture';

const Figure = ({ location }) => {
  const { type = '', name = '' } = location;
  const typeLink = typeToPicture(type);

  return (
    <figure>
      <img
        src={`/images/locations/lg/${typeLink}.png`}
        alt={type}
      />
      <figcaption>
        <p>
          <CustomText style="bold">{name}</CustomText>
        </p>
        <p>
          <CustomText style="normal">{type}</CustomText>
        </p>
      </figcaption>
      <style jsx>{styles}</style>
    </figure>
  );
};

export default Figure;
