'use client';
import Dropdown from './dropdown-table.jsx';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
	const [ jsonData, setJsonData ] = useState(null);
	const [ isMlbOpen, setMlbIsOpen ] = useState(false);
	const [ isStOpen, setStIsOpen ] = useState(false);
	const [ loading, setLoading ] = useState(true);
	const mlbDropdownRef = useRef();
	const stDropdownRef = useRef();

	// console.log(import.meta.env.VITE_API_BASEURL);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues", {
					// mode: 'cors',
					// headers: {
					// 	"Access-Control-Allow-Origin": "https://jsharpe.xyz"
					// }
				});
				const data = await response.json();
				setJsonData(data);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			} finally {
				setLoading(false);
			}
		};
		if (isMlbOpen == true || isStOpen == true) {
			fetchData();
		}

		const handleClickOutside = (event) => {
			if (
				(mlbDropdownRef.current && isMlbOpen && !mlbDropdownRef.current.contains(event.target)) ||
				(stDropdownRef.current && isStOpen && !stDropdownRef.current.contains(event.target))
			) {
				setMlbIsOpen(false);
				setStIsOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside)
	}, [ isMlbOpen, isStOpen ]);

	const mlbParks = jsonData?.filter(park => !park.springTraining);
	const stParks = jsonData?.filter(park => park.springTraining);

	return (
		<nav className='font-manrope sticky flex top-0 font-bold bg-zinc-50 rounded-b-lg drop-shadow-lg items-center z-10'>
			<a className='p-4 rounded-md hover:bg-blue-100 transition-all font-syne text-xl border border-gray-400' href='/'>Sharpe's Hit List</a>
			<a className='p-4 rounded-md hover:bg-blue-100 transition-all' href='/games/index.html'>Games</a>
			<div ref={mlbDropdownRef}>
				<button
					className='p-4 rounded-md hover:bg-blue-100 transition-all relative z-30'
					onClick={() => setMlbIsOpen(!isMlbOpen)}
				>MLB Parks</button>
				<div className={`${isMlbOpen ? 'block' : 'invisible'}`}>
					{ loading ?
						<div></div>
						:
						<Dropdown isOpen={isMlbOpen} setIsOpen={setMlbIsOpen} parks={mlbParks} />
					}
				</div>
			</div>
			<div ref={stDropdownRef}>
				<button
					className='p-4 rounded-md hover:bg-blue-100 transition-all'
					onClick={() => setStIsOpen(!isStOpen)}
				>Spring Training Parks</button>
				<div className={`${isStOpen ? 'block' : 'invisible'} `}>
					{ loading ?
						<div></div>
						:
						<Dropdown isOpen={isStOpen} setIsOpen={setStIsOpen} parks={stParks} />
					}
				</div>
			</div>
		</nav>
	);
}
