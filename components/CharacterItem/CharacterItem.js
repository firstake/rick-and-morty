import React, { Component } from 'react';
import Link from 'next/link';
import CharacterItemStyles from './CharacterItemStyles';
import CustomText from '../CustomText/CustomText';
import withCapitalLetter from '../../util/withCapitalLetter';

class LocationItem extends Component {
  render() {
    const { id, name, image, species, origin } = this.props.item;
    const dimension = origin.dimension || 'unknown';
    
    return (
      <li>
        <Link href="/character/[id]" as={`/character/${id}`}>
          <a>
            <section>
              <img src={image} alt={name}/>
              <div>
                <h2>
                  <CustomText style={'bold'}>
                    {name}
                  </CustomText>
                </h2>
                <p>
                  <CustomText style={'normal'}>
                    {withCapitalLetter(dimension)}
                  </CustomText>
                </p>
                <p>
                  <CustomText style={'normal'}>
                    {species}
                  </CustomText>
                </p>
              </div>
            </section>
          </a>
        </Link>
        <style jsx>{CharacterItemStyles}</style>
      </li>
    );
  }
}

export default LocationItem;
