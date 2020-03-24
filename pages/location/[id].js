import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import styles from '../../pages_styles/locationPageStyles';
import Header from '../../components/Header';
import CharacterItem from '../../components/CharacterItem';
import Figure from '../../components/Figure';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import Loader from '../../components/Loader';

import SINGLE_LOCATION_QUERY from '../../graphql/single-location';

function getSingleLocation(id) {
  const { loading, error, data } = useQuery(SINGLE_LOCATION_QUERY, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
}

const Page = () => {
  const { query } = useRouter();
  const { id } = query;
  const { location = {} } = getSingleLocation(id);
  const { residents = [], name = '' } = location;

  return (
    <div>
      <Header title={`${name} Residents`} />
      <div>
        <BackwardLink
          pattern="/"
          to="/"
        />
        <Figure location={location} />
        <section>
          <h2>
            <CustomText>
              Residents
            </CustomText>
          </h2>
          <ul>
            {
              residents.map((item) => <CharacterItem key={item.id} item={item} pageId={id} />)
            }
          </ul>
          <Loader />
        </section>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Page;
