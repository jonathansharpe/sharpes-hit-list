import React, { useState, useEffect } from 'react';
import Essentials from './../components/essentials.jsx';
import Paragraph from './../components/paragraph.jsx';
import SectionHeader from './../components/park-review-header.jsx';
import MainTextDiv from './../components/main-text-div.jsx';

export default function App(){
	const [gamesData, setGamesData] = useState(null);
	const [teamsData, setTeamsData] = useState(null);
	const [venueData, setVenueData] = useState(null);
	const [expandedDivs, setExpandedDivs] = useState(false);

	useEffect(() => {
		const fetchGameData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/games/getAllGames");
				const data = await response.json();
				setGamesData(data);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			}
		};
		const fetchTeamData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/teams/getAllTeams");
				const data = await response.json();
				setTeamsData(data);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			}
		}
		const fetchVenueData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues");
				const data = await response.json();
				setVenueData(data);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			}
		}
		const handleEscapeKey = (event) => {
			if (event.key === 'Escape') {
				setExpandedDivs({});
			}
		};
		document.addEventListener('keydown', handleEscapeKey);
		
		fetchGameData();
		fetchTeamData();
		fetchVenueData();
		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, []);

	const sortGamesByDate = (games) => {
		return games.sort((a, b) => {
			const dateA = new Date (a.year, a.month - 1, a.day);
			const dateB = new Date (b.year, b.month - 1, b.day);

			return dateA - dateB;
		});
	};

	function makeUrl(game) {
		const formattedMonth = game.month.toString().padStart(2, '0');
		const formattedDay = game.day.toString().padStart(2, '0');
		return `https://www.baseball-reference.com/boxes/${game.homeTeam}/${game.homeTeam}${game.year}${formattedMonth}${formattedDay}0.shtml`;
	}

	if (!gamesData || !teamsData || !venueData) {
		return null;
	}
	
	const handleExpansion = (index) => {
		setExpandedDivs((prevExpandedDivs) => ({
			...prevExpandedDivs,
			[index]: !prevExpandedDivs[index],
		}));
	};

	// console.log(gamesData);
	const numColumns = 3;
	const numRows = Math.ceil(gamesData.length / numColumns);
	const sortedGames = sortGamesByDate(gamesData);
	// console.log(sortedGames);

	return (
		<Essentials>
		<div className={`${ Object.values(expandedDivs).includes(true) ? '' : 'hidden' } fixed left-0 top-0 z-40 w-full h-full inset-0 bg-gray-900 bg-opacity-60`}></div>
		<div className="flex w-10/12 font-rubik">
		<div className="flex-none w-1/5 mb-4 mr-4 ml-4 p-2 bg-zinc-50 rounded rounded-lg">
			this is where the filters will go
		</div>
		<div className={`flex-none grid grid-cols-3 grid-flow-row gap-4 w-4/5 mb-4 mr-4 ml-4 p-2 rounded rounded-lg border`}>
		{sortedGames.map((curGame, index) => {
			if (curGame) {
				const curDate = new Date(curGame.year, curGame.month - 1, curGame.day);
				const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
				const formattedDate = new Intl.DateTimeFormat('en-US', options).format(curDate);
				return (
					<div key={index} className={`${expandedDivs[index] ? 'fixed w-9/12 left-1/2 z-50 -translate-x-1/2 transition-opacity' : 'items-center'} text-sm p-2 bg-zinc-50 m-2 rounded-md ease-in-out`}>
					<div className="relative h-16 overflow-hidden rounded-md w-full bg-center bg-cover">
					<img src={`../images/${curGame.venue}.jpg`} alt={curGame.venue} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
					</div>
					{/* date */}
					<div className="p-1 font-bold text-lg">
					{formattedDate}
					</div>
					{/* road team followed by home team */}
					<div className="grid grid-cols-[5fr,1fr] items-center content-center max-w-md">
					<div className="p-1">
					{teamsData.map((team) => {
						if (team.abbreviation === curGame.roadTeam) {
							return (
								team.fullName
							)
						}
					})}
					</div>
					<div className="p-1 text-right">{curGame.roadTeamRuns}</div>
					<div className="p-1">
					{teamsData.map((team) => {
						if (team.abbreviation === curGame.homeTeam) {
							return (
								team.fullName
							)
						}
					})}
					</div>
					<div className="p-1 text-right">{curGame.homeTeamRuns}</div>
					</div>
					{ curGame.springTraining ?
						<button onClick={() => handleExpansion(index)} type="button" className="p-1 text-center w-full max-w-sm rounded rounded-md bg-indigo-500 hover:bg-indigo-300 transition-all text-white">
						Game Log
						</button>
						:
						<div className="grid grid-cols-2 rounded rounded-md bg-indigo-500 max-w-md">
						<button onClick={() => handleExpansion(index)} type="button" className="p-1 rounded-l-md text-center hover:bg-indigo-300 transition-all text-white">
						Game Log
						</button>
						<a className="p-1 text-center hover:bg-indigo-300 rounded-r-md transition-all text-white" href={makeUrl(curGame)} target="_blank">
						Boxscore
						</a>
						</div>
					}
					</div>
				);
			}
		})}
		</div>
		</div>
		</Essentials>
	)
}
