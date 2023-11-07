import React, { useState, useEffect } from 'react';

import PageTitle from './../../components/page-title.jsx';
import Essentials from './../../components/essentials.jsx';
import MainTextDiv from '../../components/main-text-div.jsx';
import ImageHeader from './../../components/image-header.jsx';
import GetReview from '../../components/make-review.jsx';

export default function App(){
	const currentPark = "T-Mobile Park"; // << changing this will change the review shown
	const [imgSrc, setImgSrc] = useState('');

	useEffect(() => {
		const importImage = async () => {
			try {
				const module = await import(`./../../images/${currentPark}.jpg`);
				setImgSrc(module.default);
			}
			catch (error) {
				console.error(`Image import failed: ${error}`);
			}
		};

		importImage();
	}, [currentPark]);

	return (
		<Essentials>
		<PageTitle title={currentPark} />
		<MainTextDiv>
		<ImageHeader imageLink={imgSrc} headerText={`${currentPark} Review`} />
		<GetReview venueName={currentPark} />
		</MainTextDiv>
		</Essentials>
	)
}
