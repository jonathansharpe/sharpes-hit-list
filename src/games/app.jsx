import React, { useState, useEffect } from 'react';
import Essentials from './../components/essentials.jsx';
import Paragraph from './../components/paragraph.jsx';
import SectionHeader from './../components/park-review-header.jsx';
import MainTextDiv from './../components/main-text-div.jsx';

export default function App(){
	const [ gamesData, setGamesData ] = useState(null);
	const [ teamsData, setTeamsData ] = useState(null);
	const [ venueData, setVenueData ] = useState(null);
	const [ expandedDivs, setExpandedDivs ] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response1 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/games/getAllGames");
				const data1 = await response1.json();
				setGamesData(data1);
				const response2 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/teams/getAllTeams");
				const data2 = await response2.json();
				setTeamsData(data2);
				const response3 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues");
				const data3 = await response3.json();
				setVenueData(data3);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			}
		};
		// used to close the game modal
		/**
		 * @param {any} event is the event from the event listener. if
		 * the event key is the Escape key, then it sets the
		 * expandedDivs array to be empty
		 */
		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				setExpandedDivs({});
			}
		};
		document.addEventListener('keydown', handleEscapeKey);
		
		fetchData();
		return () => document.removeEventListener('keydown', handleEscapeKey);
	}, []);

	/**
	 * @param {any} games is the array of games that is passed through
	 * to be sorted
	 * @returns {} returns the sorted array
	 */
	const sortGamesByDate = (games) => {
		return games.sort((a, b) => {
			const dateA = new Date (a.year, a.month - 1, a.day);
			const dateB = new Date (b.year, b.month - 1, b.day);

			return dateA - dateB;
		});
	};

	/**
	 * @param {any} game is the current game passed through
	 * @returns {} returns the URL to be put into the href part of the
	 * a tag
	 */
	function makeUrl(game) {
		const formattedMonth = game.month.toString().padStart(2, '0');
		const formattedDay = game.day.toString().padStart(2, '0');
		return `https://www.baseball-reference.com/boxes/${game.homeTeam}/${game.homeTeam}${game.year}${formattedMonth}${formattedDay}0.shtml`;
	}

	// this checks if any of the promises have finished yet
	if (!gamesData || !teamsData || !venueData) { return null; }
	
	function handleExpansion (index) {
		setExpandedDivs((prevExpandedDivs) => ({
			...prevExpandedDivs,
			[index]: !prevExpandedDivs[index],
		}));
	}

	// console.log(gamesData);
	const numColumns = 3;
	const sortedGames = sortGamesByDate(gamesData);
	// console.log(sortedGames);
	//

	return (
		<>
		<Essentials>
		<div className="relative flex max-w-screen-lg mx-auto">
			<div className="w-1/5 border border-2 border-sky-500 p-2 m-4 bg-zinc-50">
				filter section
			</div>
			<div className="w-4/5 border border-2 border-sky-500 m-4">
				games section
				<div className="flex-none items-center grid grid-cols-4 rounded-lg p-2">
					<div id="backdrop" className="hidden bg-gray-900 bg-opacity-60 fixed left-0 top-0 w-screen h-screen backdrop-blur"></div>
					{sortedGames.map((curGame, index) => {
						if (curGame) {
							const curDate = new Date(curGame.year, curGame.month - 1, curGame.day);
							const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
							const formattedDate = new Intl.DateTimeFormat('en-US', options).format(curDate);
							return (
								<>
								<div className={`${expandedDivs[index]} ? "bg-zinc-50 mx-auto inset-0 fixed m-4 max-w-screen-md rounded-lg p-2" : "scale-100"`}>card test</div>
								<button onClick={() => handleExpansion(index)} className="p-1 text-center w-full max-w-sm rounded rounded-md bg-indigo-500 hover:bg-indigo-300 transition-all text-white">test</button>
								</>
							);
						}
					})
					}
				</div>
			</div>
		</div>
		</Essentials>
		</>
	)
}
