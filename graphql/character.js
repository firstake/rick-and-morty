import gql from 'graphql-tag';

const CHARACTER_QUERY = gql`
  query Character($id: ID) {
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

export default CHARACTER_QUERY;
