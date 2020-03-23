import FigureStyles from './FigureStyles';
import CustomText from '../CustomText/CustomText';

const Figure = (props) => {
  const { type = '', name = '' } = props.location;
  const typeLink = type.toLowerCase().replace(' ', '-');

  return (
    <figure>
      <img
        src={`/images/locations/lg/${typeLink}.jpg`}
        alt={type}
      />
      <figcaption>
        <p>
          <CustomText style={'bold'}>{name}</CustomText>
        </p>
        <p>
          <CustomText style={'normal'}>{type}</CustomText>
        </p>
      </figcaption>
      <style jsx>{FigureStyles}</style>
    </figure>
  )
}

export default Figure;
