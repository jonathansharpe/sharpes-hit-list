'use client';
import React, { useState, useEffect} from 'react';
import Paragraph from './paragraph.jsx';
import SectionHeader from './park-review-header.jsx'

export default function GetReview({venueName}) {

	const [searchResults, setSearchResults] = useState([]);

	const getCurrentVenue = async () => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				curName: venueName
			})
		};
		try {
			const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getVenues", requestOptions);
			const data = await response.json();
			setSearchResults(data[0].review);
		}
		catch (error) {
			console.error(`Request error: ${error}`);
		}
	}

	useEffect(() => {
		getCurrentVenue();
	}, []);
	console.log(`searchResults: ${searchResults}`);

	const jsxElements = [];
	for (let i = 0; i < searchResults.length; i++) {
		if (searchResults[i].type === "SectionHeader") {
			jsxElements.push(<SectionHeader key={i}>{searchResults[i].text}</SectionHeader>);
		}
		else if (searchResults[i].type === "Paragraph") {
			jsxElements.push(<Paragraph key={i}>{searchResults[i].text}</Paragraph>);
		}
		else {
			jsxElements.push(<p key={i}>Unknown Element</p>);
		}
	}
	return (
		<div>
		{jsxElements}
		</div>
	);
}
