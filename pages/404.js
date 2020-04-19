import { global } from '../components/Header/HeaderStyles';
import BackwardLink from '../components/BackwardLink';

const Custom404 = () => (
  <React.Fragment>
    <h1>404 | Nothing found...</h1>
    <div>
      <BackwardLink pattern="/" to="/" />
    </div>
    <style jsx>{global}</style>
    <style jsx>{`
      h1 {
        text-align: center;
        margin-top: 40vh;
      }
      div {
        position: relative;
        width: 71px;
        margin: 0 auto;
      }
    `}</style>
  </React.Fragment>
);

export default Custom404;
