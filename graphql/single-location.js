import gql from 'graphql-tag';

const SINGLE_LOCATION_QUERY = gql`
  query Location($id: ID!) {
    location(id: $id) {
      name
      type
      residents {
        id
        image
        name
        origin {
          dimension
        }
        species
      }
    }
  }
`;

export default SINGLE_LOCATION_QUERY;
