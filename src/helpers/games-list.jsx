import React, { useState, useEffect } from 'react';

function GamesList () {
	const [jsonData, setJsonData] = useState(null);

	useEffect(() => {
		fetch(import.meta.env.VITE_API_BASEURL + "/api/games/getAllGames")
			.then(response => response.json())
			.then(data => setJsonData(data))
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	return (
		<div>
		<h1>JSON DATA</h1>
		{jsonData ? (
			<ul>
				{jsonData.map((item, index) => (
					<li key={index}>{item.venue}</li>
				))}
			</ul>
		) : (
			<p>Loading data...</p>
		)}
		</div>
	);
}

export {GamesList};
