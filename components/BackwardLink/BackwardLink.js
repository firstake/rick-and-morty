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
        `}
        </style>
      </a>
    </Link>
  );
};

export default BackwardLink;
