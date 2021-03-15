import React, { useEffect, useRef } from 'react';

import throttle from 'lodash.throttle';
import { options, callback } from '../../utils/intersectionObserverConfig';

import LocationItem from '../LocationItem';
import Loader from '../Loader';

const Locations = ({
  results, islastPage, onLoadMore, isFetching,
}) => {
  const loaderRef = useRef(null);
  const throttledLoad = throttle(onLoadMore, 1000, { leading: false, trailing: true });

  useEffect(() => {
    const observer = new IntersectionObserver(
      callback((!islastPage && !isFetching), throttledLoad), options,
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  });

  return (
    <>
      <ul>
        {results.map((item) => <LocationItem key={item.id} item={item} />)}
      </ul>
      <div ref={loaderRef}>
        <Loader isShown={!islastPage} />
      </div>
      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
};

export default Locations;
