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
				// console.log('Fetching from:', "/api/venues/getAllVenues");
				const response = await fetch("/api/venues/getAllVenues", {
					mode: 'cors',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				});
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				// Log response headers
				// console.log('Response headers:', Object.fromEntries(response.headers.entries()));
				
				// Log the raw response text first
				const text = await response.text();
				// console.log('Raw response:', text);
				
				// Try to parse the JSON
				let data;
				try {
					data = JSON.parse(text);
				} catch (parseError) {
					console.error('JSON parse error:', parseError);
					throw new Error('Invalid JSON response from server');
				}
				
				// console.log('Parsed data:', data);
				setJsonData(data);
			} catch (error) {
				console.error(`Error fetching data: ${error}`);
			} finally {
				setLoading(false);
			}
		};

		fetchData(); // Fetch data when component mounts

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
