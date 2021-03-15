import React from 'react';
import { useRouter } from 'next/router';
import { Query } from 'react-apollo';

import Header from '../../components/Header';
import Location from '../../components/Location';
import Custom404 from '../404';

import SINGLE_LOCATION_QUERY from '../../graphql/single-location';

const LocationPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <Query query={SINGLE_LOCATION_QUERY} variables={{ id }} errorPolicy="all">
      {({
        data, loading, error,
      }) => {
        if (loading) {
          return (
            <Header title="Loading Residents..." />
          );
        }

        // eslint-disable-next-line
        if (error) console.error(`Error ${error.message}`);

        if (data && data.location) {
          const { location } = data;
          const { name, residents } = location;

          const locationData = {
            name,
            location,
            residents,
            pageId: id,
          };

          return (
            <Location
              {...locationData}
            />
          );
        }

        return (<Custom404 />);
      }}
    </Query>
  );
};

export default LocationPage;
