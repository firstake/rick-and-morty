import css from 'styled-jsx/css';

export default css`
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
`;
