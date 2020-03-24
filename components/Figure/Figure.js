import React from 'react';
import styles from './FigureStyles';
import CustomText from '../CustomText/CustomText';

const Figure = (props) => {
  const { location } = props;
  const { type = 'stub', name = '' } = location;
  const typeLink = type.toLowerCase().replace(' ', '-');

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
