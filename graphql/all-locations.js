import gql from 'graphql-tag';

const ALL_LOCATIONS_QUERY = gql`
  query Locations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      results {
        id
        name
        type
        residents {
          id
          name
          image
        }
      }
    }
  }
`;

export default ALL_LOCATIONS_QUERY;
