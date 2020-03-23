import css from 'styled-jsx/css';

export const global = css.global`
  * {
    font-family: "Roboto";
    font-style: normal;
    color: #fff;
    margin: 0;
    padding: 0;
  }
  body {
    background: linear-gradient(180deg, rgba(55, 185, 22, 0) 0%,
    rgba(55, 185, 22, 0.3) 164.92%), url(/images/bg-galaxy.jpg), #000000;
    height: 100vh;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
`;

export default css`
  header {
    background: #000 url(/images/header-logo.png) no-repeat 50% 50%/contain;
    height: 133px;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }
`;
