import React, { useState, useEffect } from 'react';
import Essentials from './../components/essentials.jsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Paragraph from './../components/paragraph.jsx';
import SectionHeader from './../components/park-review-header.jsx';
import MainTextDiv from './../components/main-text-div.jsx';
import PageTitle from './../components/page-title.jsx';
import MultiSelectDropdown from './../components/multi-select-dropdown.jsx';

export default function App(){
	const [ gamesData, setGamesData ] = useState(null);
	const [ teamsData, setTeamsData ] = useState(null);
	const [ venueData, setVenueData ] = useState(null);
	const [ expandedDivs, setExpandedDivs ] = useState(false);
	const [ logData, setLogData ] = useState([]);
	const [ filters, setFilters ] = useState({
		month: [],
		day: [],
		year: [],
		homeTeam: [],
		roadTeam: [],
		homeTeamRuns: [],
		roadTeamRuns: [],
		venue: [],
		springTraining: [],
	});
	const [ defaultFilters, setDefaultFilters ] = useState({
		month: [],
		day: [],
		year: [],
		homeTeam: [],
		roadTeam: [],
		homeTeamRuns: [],
		roadTeamRuns: [],
		venue: [],
		springTraining: [],
	});
	let maxArrayLength = 0;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response2 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/teams/getAllTeams", {
					// mode: 'cors',
					// headers: {
					// 	"Access-Control-Allow-Origin": "https://jsharpe.xyz"
					// }
				});
				const data2 = await response2.json();
				setTeamsData(data2);
				const response3 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues", {
					// mode: 'cors',
					// headers: {
					// 	"Access-Control-Allow-Origin": "https://jsharpe.xyz"
					// }
				});
				const data3 = await response3.json();
				setVenueData(data3);
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

	async function fetchGameData() {
		try {
			// console.log(filters);
			const response1 = await fetch(import.meta.env.VITE_API_BASEURL + "/api/games/getGames", {
				method: "POST",
				// mode: 'cors',
				headers: {
					"Content-Type": "application/json",
					// "Access-Control-Allow-Origin": "https://jsharpe.xyz"
				},
				body: JSON.stringify(filters),
			});
			let data1 = await response1.json();
			data1 = data1.sort((a, b) => {
				const dateA = new Date (a.year, a.month - 1, a.day);
				const dateB = new Date (b.year, b.month - 1, b.day);

				return dateA - dateB;
			})
			if (data1.length > maxArrayLength) {
				maxArrayLength = data1.length;
				data1.forEach((item) => {
					for (let key of Object.keys(defaultFilters)) {
						if (item[key] !== undefined && item[key] !== null) {
							if (!defaultFilters[key].includes(item[key])) {
								defaultFilters[key].push(item[key]);
							}
						}
					}
				})
			}
			// console.log(filters.springTraining);
			// console.log(defaultFilters);
			// console.log(data1);
			setGamesData(data1);
		}
		catch (error) {
			console.error(`Error fetching data: ${error}`);
		}
	}

	useEffect(() => {
		if (filters && Object.keys(filters).length > 0) {
			fetchGameData();
		}
	}, [filters]);
	
	useEffect(() => {
		const fetchLogs = async () => {
			try {
				if (gamesData) {
					const logPromises = gamesData.map(async (game) => {
						const logFileName = makeLogFileName(game);
						const logResponse = await fetch(logFileName);
						const logContent = await logResponse.text();
						return { [game._id]: logContent };
					});
					const logs = await Promise.all(logPromises)
					setLogData(Object.assign({}, ...logs));
					console.log(logData);
				}
			} catch (error) {
				console.error(`Error fetching logs; ${error}`);
			}
		};

		fetchLogs();
	}, [gamesData]);

	function makeLogFileName(game) {
		const formattedMonth = game.month.toString().padStart(2, '0');
		const formattedDay = game.day.toString().padStart(2, '0');
		const lowercaseRoad = game.roadTeam.toLowerCase();
		const lowercaseHome = game.homeTeam.toLowerCase();
		return `../game-logs/${game.year}-${formattedMonth}-${formattedDay}-${lowercaseRoad}-vs-${lowercaseHome}.md`
	}

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
	
	function handleExpansion(index) {
		setExpandedDivs((prevExpandedDivs) => ({
			...prevExpandedDivs,
			[index]: !prevExpandedDivs[index],
		}));
	}

	function resetFilters() {
		setFilters((prevFilters) => {
			const newFilters = { ...prevFilters };

			for (const field in newFilters) {
				if (Object.hasOwnProperty.call(newFilters, field)) {
					newFilters[field] = [];
				}
			}
			return newFilters;
		});
	}

	const components = {
		p: ({ children }) => <Paragraph>{children}</Paragraph>,
	}

	const handleSelectionChange = (fieldName, selectedValues) => {
		const filterString = JSON.stringify(filters[fieldName]);
		const selectedValuesString = JSON.stringify(selectedValues);

		if (selectedValuesString !== filterString) {
			setFilters((prevFilters) => {
				return {...prevFilters, [fieldName]: selectedValues};
			})
		}
		else {
			return;
		}
	};

	return (
		<>
		<PageTitle title={"Games"} />
		<Essentials>
		<div className="relative flex max-w-screen-xl mx-auto interDisplayMedium">
			<div className="w-1/5 border border-2 p-2 m-4 bg-zinc-50 rounded-lg drop-shadow-lg h-fit">
				<div className="border-2 rounded-md">
					<div>
						<label className="block cursor-pointer">
							<input
								type="radio"
								name="springTraining"
								value="allGames"
								className="peer hidden"
								checked={filters.springTraining.length == 0}
								onChange={() => handleSelectionChange('springTraining', [])}
							/>
							<div className="peer-checked:bg-blue-200 transition-all hover:bg-blue-100 p-2 rounded-md">Include All Games</div>
						</label>
					</div>
					<div>
						<label className="block cursor-pointer">
							<input
								type="radio"
								name="springTraining"
								value="true"
								className="peer hidden"
								checked={filters.springTraining.includes(true)}
								onChange={() => handleSelectionChange('springTraining', [true])}
							/>
							<div className="peer-checked:bg-blue-200 transition-all hover:bg-blue-100 p-2 rounded-md">Spring Training Only</div>
						</label>
					</div>
					<div>
						<label className="block cursor-pointer">
							<input
								type="radio"
								name="springTraining"
								value="false"
								className="peer hidden"
								checked={filters.springTraining.includes(false)}
								onChange={() => handleSelectionChange('springTraining', [false])}
							/>
							<div className="peer-checked:bg-blue-200 transition-all hover:bg-blue-100 rounded-md p-2">Regular Season Only</div>
						</label>
					</div>
				</div>
				<div className="grid grid-cols-1 border-2 rounded-md">
				{defaultFilters.year.length !== null && (
					<MultiSelectDropdown
						fieldName="year"
						options={defaultFilters.year}
						selectedValues={filters.year}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.month.length !== null && (
					<MultiSelectDropdown
						fieldName="month"
						options={defaultFilters.month}
						selectedValues={filters.month}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.day.length !== null && (
					<MultiSelectDropdown
						fieldName="day"
						options={defaultFilters.day}
						selectedValues={filters.day}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.homeTeam.length !== null && teamsData !== null && (
					<MultiSelectDropdown
						fieldName="homeTeam"
						options={defaultFilters.homeTeam}
						selectedValues={filters.homeTeam}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.roadTeam.length !== null && teamsData !== null && (
					<MultiSelectDropdown
						fieldName="roadTeam"
						options={defaultFilters.roadTeam}
						selectedValues={filters.roadTeam}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.homeTeamRuns.length !== null && (
					<MultiSelectDropdown
						fieldName="homeTeamRuns"
						options={defaultFilters.homeTeamRuns}
						selectedValues={filters.homeTeamRuns}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.roadTeamRuns.length !== null && (
					<MultiSelectDropdown
						fieldName="roadTeamRuns"
						options={defaultFilters.roadTeamRuns}
						selectedValues={filters.roadTeamRuns}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{defaultFilters.venue.length !== null && (
					<MultiSelectDropdown
						fieldName="venue"
						options={defaultFilters.venue}
						selectedValues={filters.venue}
						onSelectionChange={handleSelectionChange}
						teamsArr={teamsData}
					/>
				)}
				{/* this dropdown is for the years */}
				</div>
				<div className="border-2 rounded-md">
					<button
						className="text-left p-2 hover:bg-blue-100 transition-all rounded-md w-full"
						onClick={resetFilters}
					>Clear Filters</button>
				</div>
			</div>
			<div className="w-4/5 m-4">
				<div className="flex-none grid min-[1280px]:grid-cols-4 min-[768px]:grid-cols-2 max-[320px]:grid-cols-1 rounded-lg p-2">
					<div id="backdrop" className={`${Object.values(expandedDivs).includes(true) ? '' : 'hidden'} bg-gray-900 bg-opacity-60 fixed left-0 top-0 w-screen h-screen backdrop-blur z-20`}></div>
		{gamesData.map((curGame, index) => {
			if (curGame) {
				const curDate = new Date(curGame.year, curGame.month - 1, curGame.day);
				const options = {
					weekday: 'short',
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				};
				const formattedDate = new Intl.DateTimeFormat('en-US', options).format(curDate);
				return (
					<>
					<div className={`${expandedDivs[index] ? "flex flex-col scale-125 mx-auto inset-0 m-32 fixed w-8/12 max-w-screen-md z-30" : "scale-100 z-0 relative m-2"} text-sm p-2 bg-zinc-50 rounded-lg transition-all ease-out duration-150 drop-shadow-lg`}>
					<div className={`${expandedDivs[index] ? 'h-72' : 'h-20' } relative overflow-hidden rounded-md w-full bg-center bg-cover`}>
					<img src={`/images/${curGame.venue}.jpg`} alt={curGame.venue} className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
					</div>
					<div className="p-1 font-bold text-lg mx-auto">{formattedDate}</div>
					<div className="grid grid-cols-[5fr,1fr] mx-auto max-w-md w-full mb-1">
					<div className="p-1 border rounded-tl-md">
					{teamsData.map((team) => {
						if (team.abbreviation === curGame.roadTeam) {
							if (curGame.roadTeam === "CLE" && curGame.year < 2022) {
								return (
									"Cleveland Indians"
								)
							}
							else if (curGame.roadTeam === "TBA" && curGame.year < 2008) {
								return (
									"Tampa Bay Devil Rays"
								)
							}
							else {
								return (
									team.fullName
								)
							}
						}
					})}
					</div>
					<div className="p-1 border rounded-tr-md flex justify-center items-center">
					{curGame.roadTeamRuns}
					</div>
					<div className="p-1 border rounded-bl-md">
					{teamsData.map((team) => {
						if (team.abbreviation === curGame.homeTeam) {
							return (
								team.fullName
							)
						}
					})}
					</div>
					<div className="p-1 border rounded-br-md flex justify-center items-center">
					{curGame.homeTeamRuns}
					</div>
					</div>
					<div className="flex justify-center">
					{ curGame.springTraining ?
						<button
						onClick={() => handleExpansion(index)}
						type="button"
						className="p-1 text-center w-full max-w-sm rounded rounded-md hover:bg-blue-100 transition-all border"
						>
						{
							expandedDivs[index] ?
							"Click to Exit" :
							"Game Log"
						}
						</button>
						:
						<div className="flex-1 grid grid-cols-2 rounded rounded-md max-w-md border">
						<button
						onClick={() => handleExpansion(index)}
						type="button"
						className="p-1 rounded-l-md hover:bg-blue-100 transition-all flex justify-center items-center"
						>
						{
							expandedDivs[index] ?
							"Click to Exit" :
							"Game Log"
						}
						</button>
						<a className="p-1 text-center hover:bg-blue-100 rounded-r-md transition-all flex justify-center items-center" href={makeUrl(curGame)} target="_blank">
						Boxscore
						</a>
						</div>
					}	
					</div>
					<div className={`${expandedDivs[index] ? '' : 'hidden'} text-left overflow-scroll flex-1 p-2`}>
					<hr />
					<ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
					{logData[curGame._id]}
					</ReactMarkdown>
					</div>
					</div>
					</>
				);
			} 
			else {
				return (
					<div>No games match query</div>
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
