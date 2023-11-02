import Paragraph from './../../components/paragraph.js';
import ImageHeader from './../../components/image-header.js';
import mainImg from '../../public/images/T-Mobile-Park.jpg';
import PrimaryDiv from '../../components/primary-div.js';

export default function Page() {
	return (
		<PrimaryDiv>
				<div class='w-10/12 bg-zinc-50 block rounded-lg p-4'>
					<ImageHeader imageLink={mainImg.src} headerText={'T-Mobile Park'} />
						<h1 class='text-3xl font-bold my-4'>Intro</h1>
						<h1 class='text-3xl font-bold my-4'>Exterior</h1>
						<h1 class='text-3xl font-bold my-4'>Concourses</h1>
						<h1 class='text-3xl font-bold my-4'>Field</h1>
						<h1 class='text-3xl font-bold my-4'>Game Experience</h1>
						<h1 class='text-3xl font-bold my-4'>Conclusion</h1>
				</div>
		</PrimaryDiv>
	)
}
