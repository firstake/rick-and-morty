import React, { Component } from 'react';
import throttle from 'lodash.throttle';

import Header from '../Header';
import CharacterItem from '../CharacterItem';
import Figure from '../Figure';
import CustomText from '../CustomText';
import BackwardLink from '../BackwardLink';
import Loader from '../Loader';

import { options, callback } from '../../utils/intersectionObserverConfig';

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
    this.throttledLoad = this.throttledLoad.bind(this);

    this.loaderRef = React.createRef();
  }

  componentDidMount() {
    const { residents } = this.props;
    const { currentPage } = this.state;

    const pagesTotal = Math.ceil(residents.length / 20);
    this.setState({
      pagesTotal,
    });

    if (pagesTotal > 1) {
      this.observer = new IntersectionObserver(
        callback((currentPage < pagesTotal), this.throttledLoad()), options,
      );

      this.observer.observe(this.loaderRef.current);
    }
  }

  componentDidUpdate() {
    const { currentPage, pagesTotal } = this.state;
    if (this.observer && currentPage === pagesTotal) this.observer.disconnect();
  }

  componentWillUnmount() {
    if (this.observer) this.observer.disconnect();
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

  throttledLoad() {
    return throttle(this.onLoadMore, 1000, { leading: false, trailing: true });
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
                {residents[0].id ? 'Residents' : 'No residents found...'}
              </CustomText>
            </h2>
            {residents[0].id ? (
              <ul>
                {
                  residents.map((item) => (
                    <CharacterItem
                      key={item.id}
                      item={item}
                      pageId={pageId}
                    />
                  ))
                }
              </ul>
            ) : null}
            <div ref={this.loaderRef}>
              <Loader isShown={currentPage < pagesTotal} />
            </div>
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

export default Location;
