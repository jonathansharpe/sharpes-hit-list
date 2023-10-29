'use client';
import React, { useState, useEffect } from 'react';

export default function Navbar() {
	const [showDropdown, setShowDropdown] = useState(false);
	const [jsonData, setJsonData] = useState(null);
	const [query, setQuery] = useState("");

	function toggleDropdown() {
		setShowDropdown(!showDropdown);
		// console.log("test");
	}

	useEffect(() => {
		fetch(import.meta.env.VITE_API_BASEURL + "/api/venues/getAllVenues")
			.then(response => response.json())
			.then(data => setJsonData(data))
			.catch(error => console.error('Error fetching data:', error));
	}, []);


	return (
		<div className='flex justify-center'>
		<nav className='z-20 m-4 w-3/4 block gap-4 bg-zinc-50 rounded-lg drop-shadow'>
			<div className='inline-block p-4'><a href='#'>Home Page</a></div>
			<div className='inline-block p-4'><a href='#'>Games</a></div>
			<div className='inline-block relative rounded-md' onClick={toggleDropdown}>
				<input type='text' className='p-4 w-48 text-slate-950 bg-zinc-50' placeholder='Park Reviews' onChange={event => setQuery(event.target.value)}></input>
				<div className={`${showDropdown ? `block` : 'invisible'} absolute z-10 bg-zinc-200 w-auto max-h-48 border border-gray-400 rounded-b-md overflow-scroll`}>
		{jsonData ? (
			<div>
			{
				jsonData.filter(venue => {
					if (query === "") {
						return venue;
					}
					else if (venue.curName.toLowerCase().includes(query.toLowerCase())) {
						return venue;
					}
				}).map((item, index) => (
					<a className='block p-2 hover:bg-sky-600' href='#'>
					{item.curName}
					</a>
				))}
			</div>
		) : (
			<p>Loading data...</p>
		)}
				</div>
			</div>
		</nav>
		</div>
	);
}
