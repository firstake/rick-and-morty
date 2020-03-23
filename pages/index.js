import React, { Component } from 'react';
import { Query } from 'react-apollo';

import Header from '../components/Header/Header';
import LocationItem from '../components/LocationItem/LocationItem';

import LOCATIONS_QUERY from '../graphql/locations';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Query query={LOCATIONS_QUERY} variables={{ page: 1 }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
  
            const { locations = {} } = data;
            const { results = [] } = locations;
                  
            return (
              <React.Fragment>
                <Header title={'Locations'} />
                <ul>
                  {results.map(item => 
                    <LocationItem key={item.id} item={item} />
                  )}
                </ul>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default Home;
