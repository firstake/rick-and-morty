import gql from 'graphql-tag';

const LOCATION_QUERY = gql`
  query Location($id: ID) {
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

export default LOCATION_QUERY;
