import gql from 'graphql-tag';

const SINGLE_CHARACTER_QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      image
      name
      location {
        id
        name
      }
      species
      status
      origin {
        name
      }
    }
  }
`;

export default SINGLE_CHARACTER_QUERY;
