import React, { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';
import { Query } from 'react-apollo';
import debounce from 'lodash.debounce';

import styles from '../../pages_styles/locationPageStyles';
import Header from '../../components/Header';
import CharacterItem from '../../components/CharacterItem';
import Figure from '../../components/Figure';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import Loader from '../../components/Loader';

import SINGLE_LOCATION_QUERY from '../../graphql/single-location';

const LocationPage = () => {
  const { query } = useRouter();
  const { id } = query;

  // Emulate the download is so thankless task...
  const client = useApolloClient();
  let pageCount = 1;

  useEffect(() => () => client.cache.reset(), []);

  return (
    <Query query={SINGLE_LOCATION_QUERY} variables={{ id }}>
      {({
        data, loading, error,
      }) => {
        if (loading) return '';
        if (error) return Router.push('/');

        if (data) {
          const {
            location: { residents },
          } = data;

          const pageResidents = [...residents]
            .slice(0, 20 * (pageCount));

          const pageData = { ...data };
          pageData.location.residents = pageResidents;

          const isNotlastPage = residents.length - pageCount * 20 > 0;

          return (
            <Location
              {...{
                ...pageData,
                isNotlastPage,
                pageId: id,
                onLoadMore: () => {
                  pageCount += 1;
                  client.resetStore();
                },
              }}
            />
          );
        }

        return null;
      }}
    </Query>
  );
};

const Location = (props) => {
  const {
    location, pageId, onLoadMore, isNotlastPage,
  } = props;
  const { residents, name } = location;

  const debouncedLoad = debounce(onLoadMore, 1000);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
      && isNotlastPage
    ) {
      debouncedLoad();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

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
              residents.map((item) => <CharacterItem key={item.id} item={item} pageId={pageId} />)
            }
          </ul>
          <Loader isShown={isNotlastPage} />
        </section>
      </div>
      <style jsx>{styles}</style>
    </div>
  );
};

export default LocationPage;
