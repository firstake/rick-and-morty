import React, { Component } from 'react';
import { Query } from 'react-apollo';

import styles from '../pages_styles/indexPageStyles';
import Header from '../components/Header';
import LocationItem from '../components/LocationItem';

import ALL_LOCATIONS_QUERY from '../graphql/all-locations';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Query query={ALL_LOCATIONS_QUERY} variables={{ page: 1 }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;

            const { locations = {} } = data;
            const { results = [] } = locations;

            return (
              <React.Fragment>
                <Header title="Locations" />
                <ul>
                  {results.map((item) => <LocationItem key={item.id} item={item} />)}
                </ul>
              </React.Fragment>
            );
          }}
        </Query>
        <style jsx>{styles}</style>
      </React.Fragment>
    );
  }
}

export default Home;
