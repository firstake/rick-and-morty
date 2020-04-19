import React from 'react';
import Link from 'next/link';

import styles from './LocationItemStyles';
import CustomText from '../CustomText';

import typeToPicture from '../../utils/typeToPicture';

const LocationItem = (props) => {
  const { item } = props;
  const {
    id, name, type, residents,
  } = item;

  const typeLink = typeToPicture(type);

  return (
    <li>
      <Link href="/location/[id]" as={`/location/${id}`}>
        <a>
          <section>
            <img src={`images/locations/${typeLink}.png`} alt={type} width="145" height="145" />
            <div>
              <h2>
                <CustomText style="bold">
                  {name}
                </CustomText>
              </h2>
              <p>
                <CustomText style="normal">
                  {type}
                </CustomText>
              </p>
              {residents[0].id
                ? (
                  <div>
                    {residents.slice(0, 3).map((resident) => (
                      <img
                        key={resident.id}
                        src={resident.image}
                        alt={resident.name}
                        title={resident.name}
                        width="50"
                        height="50"
                      />
                    ))}
                  </div>
                )
                : null}
            </div>
          </section>
        </a>
      </Link>
      <style jsx>{styles}</style>
    </li>
  );
};

export default LocationItem;
