import { useEffect } from 'react';
import { useQuery } from 'react-apollo';

import ALL_LOCATIONS_QUERY from '../graphql/all-locations';

export const usePrefetchHomePage = () => {
  const { client } = useQuery(ALL_LOCATIONS_QUERY);

  useEffect(() => {
    client.query({
      query: ALL_LOCATIONS_QUERY,
      variables: { page: 1 }
    })
  }, []);
}
