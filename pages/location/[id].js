import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import LOCATION_QUERY from '../../graphql/location';
import Header from '../../components/Header/Header';
import CharacterItem from '../../components/CharacterItem/CharacterItem';
import Figure from '../../components/Figure/Figure';
import CustomText from '../../components/CustomText/CustomText';
import HistoryArrowLink from '../../components/HistoryArrow/HistoryArrow';

function getSingleLocation(id) {
  const { loading, error, data } = useQuery(LOCATION_QUERY, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data;
}

const Page = () => {
  const { query } = useRouter();
  const { id } = query;
  const { location = {} } = getSingleLocation(id);
  const { residents = [], name = '' } = location;

  return (
    <div>
      <Header title={`${name} Residents`} />
      <div>
        <HistoryArrowLink
          pattern={'/'}
          to={'/'}
        />
        <Figure location={location} />
        <section>
          <h2>
            <CustomText>
              Residents
            </CustomText>
          </h2>
          <ul>
            {
              residents.map(item => <CharacterItem key={item.id} item={item} pageId={id} />)
            }
          </ul>
        </section>
      </div>
      <style jsx>{`
        div > div {
          position: relative;
        }
        h2 {
          text-align: center;
          margin-bottom: 14px;
        }
      `}</style>
    </div>
  );
};

export default Page;