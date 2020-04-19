import React from 'react';
import Link from 'next/link';

import styles from './CharacterItemStyles';
import CustomText from '../CustomText';
import withCapitalLetter from '../../utils/withCapitalLetter';

const CharacterItem = (props) => {
  const { item } = props;
  const {
    id, name, image, species, origin,
  } = item;
  const dimension = origin.dimension || 'unknown';

  return (
    <li>
      <Link href="/character/[id]" as={`/character/${id}`}>
        <a>
          <section>
            <img src={image} alt={name} width="145" height="145" />
            <div>
              <h2>
                <CustomText style="bold">
                  {name}
                </CustomText>
              </h2>
              <p>
                <CustomText style="normal">
                  {withCapitalLetter(dimension)}
                </CustomText>
              </p>
              <p>
                <CustomText style="normal">
                  {species}
                </CustomText>
              </p>
            </div>
          </section>
        </a>
      </Link>
      <style jsx>{styles}</style>
    </li>
  );
};

export default CharacterItem;
