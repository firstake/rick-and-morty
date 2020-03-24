import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import delay from 'lodash.delay';

import styles from '../pages_styles/indexPageStyles';
import Header from '../components/Header';
import LocationItem from '../components/LocationItem';
import Loader from '../components/Loader';

import ALL_LOCATIONS_QUERY from '../graphql/all-locations';

const HomePage = () => (
  <Query query={ALL_LOCATIONS_QUERY} variables={{ page: 1 }}>
    {({
      data, loading, error, fetchMore,
    }) => {
      if (loading) return '';
      if (error) return `Error ${error.message}`;

      return (
        data && (
          <Locations
            results={data.locations.results || []}
            islastPage={!data.locations.info.next}
            onLoadMore={() => fetchMore({
              variables: {
                page: data.locations.info.next,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  locations: {
                    ...fetchMoreResult.locations,
                    info: fetchMoreResult.locations.info,
                    results: [
                      ...prev.locations.results,
                      ...fetchMoreResult.locations.results,
                    ],
                  },
                };
              },
            })}
          />
        )
      );
    }}
  </Query>
);

const Locations = (props) => {
  const { results, islastPage, onLoadMore } = props;

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
      && !islastPage
    ) {
      delay(onLoadMore, 2000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <React.Fragment>
      <Header title="Locations" />
      <ul>
        {results.map((item) => <LocationItem key={item.id} item={item} />)}
      </ul>
      <Loader isShown={!islastPage} />
      <style jsx>{styles}</style>
    </React.Fragment>
  );
};

export default HomePage;
