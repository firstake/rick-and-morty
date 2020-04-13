import React from 'react';
import { useRouter } from 'next/router';
import { Query } from 'react-apollo';

import Header from '../../components/Header';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import withCapitalLetter from '../../util/withCapitalLetter';

import SINGLE_CHARACTER_QUERY from '../../graphql/single-character';

const CharacterPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <Query query={SINGLE_CHARACTER_QUERY} variables={{ id }}>
      {({
        data, loading, error,
      }) => {
        if (loading) {
          return (
            <Header title="Loading Character..." />
          );
        }
        if (error) return `Error ${error.message}`;

        return (
          <div>
            <Header title={`Character: ${data.character.name}`} />
            <div>
              <img src={data.character.image} alt={data.character.name} />
              <BackwardLink
                pattern="/location/[id]"
                to={`/location/${data.character.location.id}`}
              />
              <section>
                <h2>
                  <CustomText style="bold">
                    {data.character.name}
                  </CustomText>
                </h2>
                <ul>
                  <li>
                    <CustomText style="normal">
                      {data.character.location.name}
                    </CustomText>
                  </li>
                  <li>
                    <CustomText style="normal">
                      {withCapitalLetter(data.character.species)}
                    </CustomText>
                  </li>
                  <li>
                    <CustomText style="bold">
                      Status:
                      <br />
                      {data.character.status}
                    </CustomText>
                  </li>
                  <li>
                    <CustomText style="bold">
                      Home planet:
                      <br />
                      {withCapitalLetter(data.character.origin.name)}
                    </CustomText>
                  </li>
                </ul>
              </section>
            </div>
            <style jsx>
              {`
              div > div {
                position: relative;
              }
              img {
                width: 100%;
                max-width: 414px;
              }
              h2, li {
                margin-bottom: 6px;
              }
              section {
                padding: 14px;
              }
              @media screen and (min-width: 415px) {
                div > div {
                  width: fit-content;
                  margin: 0 auto;
                }
                img {
                  min-width: 398px;
                  max-width: none;
                }
              }
              @media screen and (min-width: 856px) {
                div > div {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  margin: 8px auto 0 auto;
                }
                section {
                  border: 2px solid #00b0c7;
                }
              }
            `}
            </style>
          </div>
        );
      }}
    </Query>
  );
};

export default CharacterPage;
