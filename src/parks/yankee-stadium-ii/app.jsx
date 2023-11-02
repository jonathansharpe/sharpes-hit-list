import Essentials from './../../components/essentials.jsx';
import ImageHeader from './../../components/image-header.jsx';
import Paragraph from './../../components/paragraph.jsx';
import SectionHeader from '../../components/park-review-header.jsx'
import headerImg from './../../images/Guaranteed-Rate-Field.jpg';

export default function App(){
	return (
		<Essentials>
		<div className='w-10/12 bg-zinc-50 block rounded-lg p-4'>
		<ImageHeader imageLink={headerImg} headerText={'Coming Soon!'} />
		<SectionHeader>Intro</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Exterior</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Concourses</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Field</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Game Experience</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Conclusion</SectionHeader>
		<Paragraph></Paragraph>
		</div>
		</Essentials>
	)
}
