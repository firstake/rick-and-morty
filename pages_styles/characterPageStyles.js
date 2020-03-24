import css from 'styled-jsx/css';

export default css`
  div > div {
    position: relative;
  }
  img {
    width: 100%;
    max-width: 414px;
  }
  h2, li {
    margin-bottom: 6px;
  }
  section {
    padding: 14px;
  }
  @media screen and (min-width: 415px) {
    div > div {
      width: fit-content;
      margin: 0 auto;
    }
    img {
      min-width: 398px;
      max-width: none;
    }
  }
  @media screen and (min-width: 856px) {
    div > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 8px auto 0 auto;
    }
    section {
      border: 2px solid #00b0c7;
    }
  }
`;
