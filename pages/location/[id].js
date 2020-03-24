import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import SINGLE_LOCATION_QUERY from '../../graphql/single-location';

import Header from '../../components/Header';
import CharacterItem from '../../components/CharacterItem';
import Figure from '../../components/Figure';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import Loader from '../../components/Loader';

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
      <style jsx>
        {`
        div > div {
          position: relative;
        }
        h2 {
          text-align: center;
          margin-bottom: 14px;
        }
        @media screen and (min-width: 448px) {
          ul {
            margin: 0 auto;
            width: fit-content;
          }
        }
        @media screen and (min-width: 880px) {
          div > div {
            display: grid;
            grid-template-columns: repeat(2, 414px);
            margin: 8px auto;
            width: fit-content;
          }
        }
      `}
      </style>
    </div>
  );
};

export default Page;
