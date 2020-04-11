import React, { Component } from 'react';
import Router, { useRouter } from 'next/router';
import { Query } from 'react-apollo';
import throttle from 'lodash.throttle';

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
        if (error) Router.push('/');

        if (data) {
          const { location } = data;
          const { name, residents } = location;

          const locationData = {
            name,
            location,
            residents,
            pageId: id,
          };
          return (
            <Location
              {...locationData}
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

    const { residents } = this.props;
    this.state = {
      currentPage: 1,
      pagesTotal: 1,
      residents: residents.slice(0, 20),
    };

    this.onLoadMore = this.onLoadMore.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const { residents } = this.props;
    const pagesTotal = Math.ceil(residents.length / 20);
    this.setState({
      pagesTotal,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onLoadMore() {
    const { currentPage } = this.state;
    const { residents } = this.props;

    const nextCurrentPage = currentPage + 1;
    const nextResidents = residents.slice(currentPage * 20, nextCurrentPage * 20);

    this.setState((prevState) => ({
      currentPage: nextCurrentPage,
      residents: prevState.residents.concat(nextResidents),
    }));
  }

  handleScroll() {
    const { currentPage, pagesTotal } = this.state;
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
      && (currentPage < pagesTotal)
    ) {
      throttle(this.onLoadMore, 1000, { leading: false, trailing: true })();
    }
  }

  render() {
    const { name, location, pageId } = this.props;
    const { residents, currentPage, pagesTotal } = this.state;

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
            <Loader isShown={currentPage < pagesTotal} />
          </section>
        </div>
        <style jsx>
          {`
          div > div {
            position: relative;
          }
          h2 {
            text-align: center;
            margin-bottom: 14px;
          }
          @media screen and (min-width: 448px) {
            ul {
              margin: 0 auto;
              width: fit-content;
            }
          }
          @media screen and (min-width: 880px) {
            div > div {
              display: grid;
              grid-template-columns: repeat(2, 414px);
              margin: 8px auto;
              width: fit-content;
            }
          }
        `}
        </style>
      </div>
    );
  }
}

export default LocationPage;
