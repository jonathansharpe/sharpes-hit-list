import Essentials from './../../components/essentials.jsx';
import ImageHeader from './../../components/image-header.jsx';
import Paragraph from './../../components/paragraph.jsx';
import SectionHeader from '../../components/park-review-header.jsx'
import targetFieldImg from './../../images/Target Field.jpg';

export default function App(){
	return (
		<Essentials>
		<div className='w-10/12 bg-zinc-50 block rounded-lg p-4'>
		<ImageHeader imageLink={targetFieldImg} headerText={'Target Field Review'} />
		<SectionHeader>Intro</SectionHeader>
		<Paragraph>Target Field was the 4th park I went to, and it wasn't really near the top of my list to be honest. I didn't think poorly of it, but seeing it on TV for many years, it never really jumped out at me as a place I <i>needed</i> to visit, compared to places like Wrigley Field, and Fenway Park. However, I was extremely surprised and enjoyed my experience here quite a lot.</Paragraph>
		<SectionHeader>Exterior</SectionHeader>
		<Paragraph>So Target Field is probably the only modern stadium that was actually built with quite significant restraints from the city grid. While plenty of modern stadiums today have returned to the city, the Twins really had to just fit Target Field in right in this spot. They even moved a highway underneath the park! However, they were coming from the Hubert H. Humphrey Metrodome, which was probably one of the worst parks when it was still in use by the Twins. While most park gates are numbered or named off location, like the "Left Field Gate" or "Gate 3", the Twins named the Target Field gates from their retired numbers, which is a neat way to honor their greats. We entered the gate nearest to right field, which is at street level. The playing field is actually below street level, which is a neat view when coming in. I don't think we walked around much outside the park, but it looks very nice.</Paragraph>
		<SectionHeader>Concourses</SectionHeader>
		<Paragraph>Being an extremely recent park, there were some notable differences from T-Mobile Park. The concourses were <i>extremely</i> wide, wider than any of the three parks I'd seen before. But I was very impressed so far. I remember there being a small model of the ballpark concept near an escalator we took upward. There was also a neat bar area down the left field line. Since it's pretty enclosed, I was able to take a picture from the upper deck in center field, which yielded a nice panoramic view.</Paragraph>
		<SectionHeader>Field</SectionHeader>
		<Paragraph>The field is fairly standard, but one notable exception is that there is an overhang in right field. If a ball is hit over there, it could be right in line to be caught by the right fielder, before landing in the seats. Off the top of my head, only the Polo Grounds in New York, and Tiger Stadium in Detroit had overhangs in the outfield.</Paragraph>
		<SectionHeader>Game Experience</SectionHeader>
		<Paragraph></Paragraph>
		<SectionHeader>Conclusion</SectionHeader>
		<Paragraph></Paragraph>
		</div>
		</Essentials>
	)
}
