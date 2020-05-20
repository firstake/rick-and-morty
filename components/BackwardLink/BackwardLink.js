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
            box-shadow: 0px 0px 2px 0px rgb(0, 0, 0) inset;
            width: 70px;
            height: 70px;
            object-fit: none;
            background: rgba(0, 0, 0, 0.18);
          }
        `}
        </style>
      </a>
    </Link>
  );
};

export default BackwardLink;
