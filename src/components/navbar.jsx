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
				const response = await fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues");
				const data = await response.json();
				setJsonData(data);
				// console.log(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			} finally {
				setLoading(false);
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

		return () => document.removeEventListener('click', handleClickOutside)
	}, [ isMlbOpen, isStOpen ]);

	const mlbParks = jsonData?.filter(park => !park.springTraining);
	const stParks = jsonData?.filter(park => park.springTraining);

	return (
		<nav className='font-manrope relative sticky flex font-bold top-0 z-10 mb-4 w-full bg-zinc-50 rounded-b-lg drop-shadow items-center'>
			<a className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all font-syne text-xl border border-gray-400' href='/'>Sharpe's Hit List</a>
			<a className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all' href='/games/index.html'>Games</a>
			<div ref={mlbDropdownRef}>
				<button
					className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all'
					onClick={() => setMlbIsOpen(!isMlbOpen)}
				>MLB Parks</button>
				<div className={`${isMlbOpen ? 'block' : 'invisible'} `}>
					{ loading ?
						<div></div>
						:
						<Dropdown isOpen={isMlbOpen} setIsOpen={setMlbIsOpen} parks={mlbParks} />
					}
				</div>
			</div>
			<div ref={stDropdownRef}>
				<button
					className='inline-block p-4 rounded-md hover:bg-zinc-200 transition-all'
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
