import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

import styles from '../../pages_styles/characterPageStyles';
import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import withCapitalLetter from '../../util/withCapitalLetter';

import SINGLE_CHARACTER_QUERY from '../../graphql/single-character';

function getCharacter(id) {
  const { loading, error, data } = useQuery(SINGLE_CHARACTER_QUERY, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
}

const Page = () => {
  const { query } = useRouter();
  const { id } = query;
  const { character = {} } = getCharacter(id);
  const {
    name, image, species, status, location = {}, origin = {},
  } = character;

  return (
    <div>
      <Header title={`Character: ${name}`} />
      <div>
        <img src={image} alt={name} />
        <BackwardLink
          pattern="/location/[id]"
          to={`/location/${location.id}`}
        />
        <section>
          <h2>
            <CustomText style="bold">
              {name}
            </CustomText>
          </h2>
          <ul>
            <li>
              <CustomText style="normal">
                {location.name}
              </CustomText>
            </li>
            <li>
              <CustomText style="normal">
                {withCapitalLetter(species)}
              </CustomText>
            </li>
            <li>
              <CustomText style="bold">
                Status:
                <br />
                {status}
              </CustomText>
            </li>
            <li>
              <CustomText style="bold">
                Home planet:
                <br />
                {withCapitalLetter(origin.name)}
              </CustomText>
            </li>
          </ul>
        </section>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default Page;
