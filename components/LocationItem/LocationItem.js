import React, { Component } from 'react';
import Link from 'next/link';

import styles from './LocationItemStyles';
import CustomText from '../CustomText';

class LocationItem extends Component {
  render() {
    const { id, name, type, residents } = this.props.item;
    const typeLink = type.toLowerCase().replace(' ', '-');
    
    return (
      <li>
        <Link href="/location/[id]" as={`/location/${id}`}>
          <a>
            <section>
              <img src={`images/locations/${typeLink}.png`} alt={type}/>
              <div>
                <h2>
                  <CustomText style={'bold'}>
                    {name}
                  </CustomText>
                </h2>
                <p>
                  <CustomText style={'normal'}>
                    {type}
                  </CustomText>
                </p>
                {residents[0].id ?
                  <div>
                    {residents.slice(0,3).map(item =>
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        title={item.name}
                      />
                    )}
                  </div>
                  :
                  null
                }
              </div>
            </section>
          </a>
        </Link>
        <style jsx>{styles}</style>
      </li>
    );
  }
}

export default LocationItem;
