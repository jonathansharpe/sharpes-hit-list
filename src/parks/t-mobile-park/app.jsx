import Essentials from './../../components/essentials.jsx';
import ImageHeader from './../../components/image-header.jsx';
import Paragraph from './../../components/paragraph.jsx';
import SectionHeader from '../../components/park-review-header.jsx'
import homeImg from './../../images/T-Mobile-Park.jpg';
import {GamesList} from './../../helpers/games-list.jsx';

export default function App(){
	return (
		<Essentials>
		<div className='w-10/12 bg-zinc-50 block rounded-lg p-4'>
		<ImageHeader imageLink={homeImg} headerText={'T-Mobile Park Review'} />
		<SectionHeader>Intro</SectionHeader>
		<Paragraph>test test</Paragraph>
		<SectionHeader>Exterior</SectionHeader>
		<SectionHeader>Concourses</SectionHeader>
		<SectionHeader>Field</SectionHeader>
		<SectionHeader>Game Experience</SectionHeader>
		<SectionHeader>Conclusion</SectionHeader>
		</div>
		</Essentials>
	)
}
