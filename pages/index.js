import React, { useEffect, useRef } from 'react';
import { Query } from 'react-apollo';

import throttle from 'lodash.throttle';
import { options, callback } from '../utils/intersectionObserverConfig';

import Header from '../components/Header';
import LocationItem from '../components/LocationItem';
import Loader from '../components/Loader';

import ALL_LOCATIONS_QUERY from '../graphql/all-locations';

const HomePage = () => (
  <React.Fragment>
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
            onLoadMore={() => onFetchMore()}
            isFetching={loading}
          />
        );
      }}
    </Query>
  </React.Fragment>
);

const Locations = (props) => {
  const {
    results, islastPage, onLoadMore, isFetching,
  } = props;
  const loaderRef = useRef(null);

  const throttledLoad = throttle(onLoadMore, 1000, { leading: false, trailing: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      callback((!islastPage && !isFetching), throttledLoad), options,
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  });

  return (
    <React.Fragment>
      <ul>
        {results.map((item) => <LocationItem key={item.id} item={item} />)}
      </ul>
      <div ref={loaderRef}>
        <Loader isShown={!islastPage} />
      </div>
      <style jsx>
        {`
          @media screen and (min-width: 600px) {
            ul {
              margin: 0 auto;
              width: fit-content;
            }
          }
          @media screen and (min-width: 1132px) {
            ul {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              margin: 4px auto;
            }
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default HomePage;
