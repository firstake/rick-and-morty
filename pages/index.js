import React, { Component } from 'react';
import { Query } from 'react-apollo';

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
        <style jsx>{`
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
        `}</style>
      </React.Fragment>
    );
  }
}

export default Home;
