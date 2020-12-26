import React from 'react';
import Link from 'next/link';

const BackwardLink = (props) => {
  const { pattern, to } = props;

  return (
    <Link href={pattern} as={to}>
      <a>
        <img src="/images/arrow.svg" alt="Backwards" />
        <style jsx>
          {`
          a {
            display: block;
            position: absolute;
            top: 9px;
            left: 13px;
          }
          img {
            border-radius: 50%;
            width: 70px;
            height: 70px;
            object-fit: none;
            filter: drop-shadow(2px 4px 6px rgb(0 0 0 / 70%));
          }
        `}
        </style>
      </a>
    </Link>
  );
};

export default BackwardLink;
