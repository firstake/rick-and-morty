import React from 'react';
import { Query } from 'react-apollo';

import Header from '../components/Header';
import Locations from '../components/Locations';

import ALL_LOCATIONS_QUERY from '../graphql/all-locations';

const HomePage = () => (
  <>
    <Header title="Locations" />
    <Query query={ALL_LOCATIONS_QUERY} variables={{ page: 1 }} notifyOnNetworkStatusChange>
      {({
        data, loading, error, fetchMore,
      }) => {
        if (loading && !data) {
          return (
            <Locations
              results={[]}
              islastPage={false}
              onLoadMore={() => {}}
              isFetching={loading}
            />
          );
        }

        if (error) return `Error ${error.message}`;

        const onFetchMore = () => {
          fetchMore({
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
          });
        };

        return (
          <Locations
            results={data.locations.results}
            islastPage={!data.locations.info.next}
            onLoadMore={onFetchMore}
            isFetching={loading}
          />
        );
      }}
    </Query>
  </>
);

export default HomePage;
