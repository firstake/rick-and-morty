import css from 'styled-jsx/css';

export default css`
  div {
    text-align: center;
  }
  img {
    width: 100%;
    max-width: 414px;
    margin: 28px 0 -4px 0;
  }
  @media screen and (min-width: 414px) {
    img {
      clip-path: circle();
      margin: 28px 0 24px 0;
    }
  }
`;
