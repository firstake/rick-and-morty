import React from 'react';
import Link from 'next/link';

import styles from './LocationItemStyles';
import CustomText from '../CustomText';

import typeToPicture from '../../utils/typeToPicture';

const LocationItem = ({ item }) => {
  const {
    id, name, type, residents,
  } = item;
  const typeLink = typeToPicture(type);

  return (
    <li>
      <Link href="/location/[id]" as={`/location/${id}`}>
        <a>
          <section>
            <img src={`images/locations/${typeLink}.png`} alt={type} />
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
