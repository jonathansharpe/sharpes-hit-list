import Essentials from './../../components/essentials.jsx';
import MainTextDiv from '../../components/main-text-div.jsx';
import ImageHeader from './../../components/image-header.jsx';
import Paragraph from './../../components/paragraph.jsx';
import SectionHeader from '../../components/park-review-header.jsx'
import tmobileparkImg from './../../images/T-Mobile-Park.jpg';
import GetReview from '../../components/make-review.jsx';
import {GamesList} from './../../helpers/games-list.jsx';

export default function App(){
	return (
		<Essentials>
		<MainTextDiv>
		<ImageHeader imageLink={tmobileparkImg} headerText={'T-Mobile Park Review'} />
		<GetReview venueName="T-Mobile Park" />
		</MainTextDiv>
		</Essentials>
	)
}
