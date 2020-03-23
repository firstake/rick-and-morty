import css from 'styled-jsx/css';

export default css`
  section {
    margin: 8px;
    box-shadow: 2px 2px 10px 0 rgba(29, 99, 234, 0.48);
    height: 145px;
    display: flex;
    background: #312A2A;
  }
  section > img {
    width: auto;
    height: 100%;
  }
  section > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 12px 16px;
    overflow: hidden;
  }
  h2, p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 10px;
  }
  div > div {
    display: flex;
    overflow-x: auto;
  }
  div > img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }
  @media screen and (min-width: 600px) {
    section {
      width: 540px;
    }
  }
  @media screen and (min-width: 1132px) {
    section {
      margin: 4px;
    }
  }
`;
