import Essentials from './../../components/essentials.jsx';
import ImageHeader from './../../components/image-header.jsx';
import Paragraph from './../../components/paragraph.jsx';
import SectionHeader from '../../components/park-review-header.jsx'
import MainTextDiv from '../../components/main-text-div.jsx';
import headerImg from './../../images/Guaranteed-Rate-Field.jpg';

export default function App(){
	return (
		<Essentials>
		<MainTextDiv>
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
		</MainTextDiv>
		</Essentials>
	)
}
