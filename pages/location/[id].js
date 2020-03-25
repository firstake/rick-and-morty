import React, { Component } from 'react';
import Router, { useRouter } from 'next/router';
import { Query } from 'react-apollo';
import debounce from 'lodash.debounce';

import styles from '../../pages_styles/locationPageStyles';
import Header from '../../components/Header';
import CharacterItem from '../../components/CharacterItem';
import Figure from '../../components/Figure';
import CustomText from '../../components/CustomText';
import BackwardLink from '../../components/BackwardLink';
import Loader from '../../components/Loader';

import SINGLE_LOCATION_QUERY from '../../graphql/single-location';

const LocationPage = () => {
  const { query } = useRouter();
  const { id } = query;

  return (
    <Query query={SINGLE_LOCATION_QUERY} variables={{ id }}>
      {({
        data, loading, error,
      }) => {
        if (loading) return '';
        if (error) return Router.push('/');

        if (data) {
          return (
            <Location
              {...{
                ...data,
                pageId: id,
              }}
            />
          );
        }

        return null;
      }}
    </Query>
  );
};

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pagesTotal: 1,
      residents: this.props.location.residents.slice(0, 20),
    };

    this.onLoadMore = this.onLoadMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const pagesTotal = Math.ceil(this.props.location.residents.length / 20);
    this.setState({
      pagesTotal,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onLoadMore() {
    const nextCurrentPage = this.state.currentPage + 1;
    const nextResidents = this.props.location
      .residents.slice(this.state.currentPage * 20, nextCurrentPage * 20);

    this.setState((prevState) => ({
      currentPage: nextCurrentPage,
      residents: prevState.residents.concat(nextResidents),
    }));
  }

  handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
      && (this.state.currentPage < this.state.pagesTotal)
    ) {
      debounce(this.onLoadMore, 1000)();
    }
  }

  render() {
    const { location, pageId } = this.props;
    const { name } = location;
    const { residents } = this.state;

    return (
      <div>
        <Header title={`${name} Residents`} />
        <div>
          <BackwardLink
            pattern="/"
            to="/"
          />
          <Figure location={location} />
          <section>
            <h2>
              <CustomText>
                Residents
              </CustomText>
            </h2>
            <ul>
              {
                residents.map((item) => <CharacterItem key={item.id} item={item} pageId={pageId} />)
              }
            </ul>
            <Loader isShown={(this.state.currentPage < this.state.pagesTotal)} />
          </section>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default LocationPage;
