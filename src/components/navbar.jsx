'use client';
import Dropdown from './dropdown-table.jsx';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
	const [jsonData, setJsonData] = useState(null);
	const [isMlbOpen, setMlbIsOpen] = useState(false);
	const [isStOpen, setStIsOpen] = useState(false);
	const mlbDropdownRef = useRef();
	const stDropdownRef = useRef();

	// console.log(import.meta.env.VITE_API_BASEURL);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues");
				const data = await response.json();
				setJsonData(data);
				console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			}
		};
		fetchData();

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

		return () => {
			document.removeEventListener('click', handleClickOutside);
		}
	}, [isMlbOpen, isStOpen]);

	if (!jsonData) {
		return null;
	}

	const mlbParks = jsonData.filter(park => !park.springTraining);
	const stParks = jsonData.filter(park => park.springTraining);

	return (
		<nav className='flex font-bold sticky top-0 z-20 mb-4 w-full block bg-zinc-50 rounded-b-lg drop-shadow items-center'>
			<div className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all font-syne text-xl border border-gray-400'><a href='/'>Sharpe's Hit List</a></div>
			<div className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all'><a href='#'>Games</a></div>
			<div ref={mlbDropdownRef}>
				<button className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all' onClick={() => setMlbIsOpen(!isMlbOpen)}>MLB Parks</button>
				<div className={`${isMlbOpen ? 'block' : 'invisible'} `}>
					<Dropdown isOpen={isMlbOpen} setIsOpen={setMlbIsOpen} parks={mlbParks} />
				</div>
			</div>
			<div ref={stDropdownRef}>
				<button className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all' onClick={() => setStIsOpen(!isStOpen)}>Spring Training Parks</button>
				<div className={`${isStOpen ? 'block' : 'invisible'} `}>
					<Dropdown isOpen={isStOpen} setIsOpen={setStIsOpen} parks={stParks} />
				</div>
			</div>
		</nav>
	);
}
