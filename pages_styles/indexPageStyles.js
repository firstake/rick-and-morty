import css from 'styled-jsx/css';

export default css`
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
`;
