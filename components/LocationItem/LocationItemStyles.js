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
    min-width: 145px;
    height: 145px;
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
    overflow-y: hidden;
  }
  div > img {
    max-width: 50px;
    background-color: #5f4f4f;
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
